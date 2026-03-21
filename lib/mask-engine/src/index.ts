// ================= TYPES =================

type MaskToken =
    | { type: "digit"; optional?: boolean }
    | { type: "letter"; optional?: boolean }
    | { type: "alphanumeric"; optional?: boolean }
    | { type: "literal"; char: string }

type Slot = {
    token: MaskToken
    char: string | null
}

type BufferState = {
    slots: Slot[]
    cursor: number
}

type DynamicMask = {
    masks: string[]
    dispatch(raw: string): string
}

export type Mask = string | DynamicMask

export type MaskEngineResult = {
    value: string
    raw: string
    complete: boolean
    caret: number
}

// ================= TOKENS =================

const TOKENS = new Map<string, MaskToken>([
    ["9", { type: "digit" }],
    ["a", { type: "letter" }],
    ["*", { type: "alphanumeric" }],
])

// ================= PARSE =================

function parseMask(mask: string): MaskToken[] {
    if (typeof mask !== "string") {
        throw new Error("Mask must be string")
    }

    return [...mask].map(
        c => TOKENS.get(c) ?? { type: "literal", char: c }
    )
}

// ================= BUFFER =================

function createBuffer(tokens: MaskToken[]): BufferState {
    return {
        slots: tokens.map(t => ({
            token: t,
            char: t.type === "literal" ? t.char : null
        })),
        cursor: 0
    }
}

function cloneEmpty(tokens: MaskToken[]) {
    return createBuffer(tokens)
}

// ================= VALIDATION =================

function testChar(char: string, token: MaskToken) {
    if (token.type === "digit") return /\d/.test(char)
    if (token.type === "letter") return /[a-z]/i.test(char)
    if (token.type === "alphanumeric") return /[a-z0-9]/i.test(char)
    return false
}

// ================= NAVIGATION =================

function nextEditable(slots: Slot[], i: number) {
    while (i < slots.length) {
        if (slots[i].token.type !== "literal") return i
        i++
    }
    return slots.length
}

// ================= CORE OPS =================

function insert(state: BufferState, text: string) {
    let i = state.cursor

    for (const char of text) {
        i = nextEditable(state.slots, i)
        if (i >= state.slots.length) break

        const slot = state.slots[i]

        if (!testChar(char, slot.token)) continue

        slot.char = char
        i++
    }

    state.cursor = i
}

function clearRange(state: BufferState, start: number, end: number) {
    for (let i = start; i < end; i++) {
        if (state.slots[i].token.type !== "literal") {
            state.slots[i].char = null
        }
    }
    state.cursor = start
}

// ================= FORMAT =================

function toValue(slots: Slot[]) {
    let result = ""

    for (const s of slots) {
        if (s.token.type === "literal") {
            result += s.token.char
        } else if (s.char) {
            result += s.char
        } else {
            break
        }
    }

    return result
}

function toRaw(slots: Slot[]) {
    return slots
        .filter(s => s.token.type !== "literal" && s.char)
        .map(s => s.char!)
        .join("")
}

// ================= COMPLETE =================

function isComplete(slots: Slot[]) {
    for (const s of slots) {
        if (
            s.token.type !== "literal" &&
            !s.token.optional &&
            !s.char
        ) {
            return false
        }
    }
    return true
}

// ================= DIFF =================

function diff(prev: string, next: string) {
    let start = 0

    while (
        start < prev.length &&
        start < next.length &&
        prev[start] === next[start]
        ) {
        start++
    }

    let endPrev = prev.length
    let endNext = next.length

    while (
        endPrev > start &&
        endNext > start &&
        prev[endPrev - 1] === next[endNext - 1]
        ) {
        endPrev--
        endNext--
    }

    return {
        start,
        removed: prev.slice(start, endPrev),
        inserted: next.slice(start, endNext)
    }
}

// ================= ENGINE =================

export function createMaskEngine(mask: Mask) {

    let currentMask = typeof mask === "string"
        ? mask
        : mask.masks[0]

    let tokens = parseMask(currentMask)
    let state = createBuffer(tokens)

    function remaskIfNeeded(raw: string) {
        if (typeof mask === "string") return

        const nextMask = mask.dispatch(raw)

        if (nextMask === currentMask) return

        currentMask = nextMask
        tokens = parseMask(currentMask)

        // 🔴 ВАЖНО: перенос состояния
        const newState = cloneEmpty(tokens)

        insert(newState, raw)

        state = newState
    }

    return {
        process(nextValue: string, prevValue: string): MaskEngineResult {

            const d = diff(prevValue, nextValue)

            let slotIndex = d.start

            if (d.removed.length) {
                clearRange(state, slotIndex, slotIndex + d.removed.length)
            }

            state.cursor = slotIndex

            if (d.inserted) {
                insert(state, d.inserted)
            }

            const raw = toRaw(state.slots)

            // 🔴 dynamic mask
            remaskIfNeeded(raw)

            return {
                value: toValue(state.slots),
                raw,
                complete: isComplete(state.slots),
                caret: state.cursor
            }
        }
    }
}