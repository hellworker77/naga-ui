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

type MaskConfig = {
    mask: string
    prefixLength?: number
}

type DynamicMask = {
    masks: string[]
    dispatch(raw: string): string
}

export type Mask = string | MaskConfig | DynamicMask

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

// ================= PREFIX =================

function autoDetectPrefix(tokens: MaskToken[]) {
    let i = 0

    while (i < tokens.length) {
        const t = tokens[i]

        if (t.type !== "literal") break

        i++
    }

    // убрать trailing formatting
    while (i > 0) {
        const t = tokens[i - 1]

        if (
            t.type === "literal" &&
            (t.char === " " || t.char === "(" || t.char === "-")
        ) {
            i--
        } else {
            break
        }
    }

    return i
}

// ================= FORMAT =================

function toValue(
    slots: Slot[],
    prefixEnd: number
) {
    let lastFilledIndex = -1

    for (let i = 0; i < slots.length; i++) {
        const s = slots[i]

        if (s.token.type !== "literal" && s.char) {
            lastFilledIndex = i
        }
    }

    // ничего не введено → вернуть prefix
    if (lastFilledIndex === -1) {
        let result = ""

        for (let i = 0; i < prefixEnd; i++) {
            result += (slots[i].token as any).char
        }

        return result
    }

    let result = ""

    for (let i = 0; i <= lastFilledIndex; i++) {
        const s = slots[i]

        if (s.token.type === "literal") {
            result += s.token.char
        } else if (s.char) {
            result += s.char
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

    let currentMask: string
    let prefixLength: number | undefined

    if (typeof mask === "string") {
        currentMask = mask
    } else if ("mask" in mask) {
        currentMask = mask.mask
        prefixLength = mask.prefixLength
    } else {
        currentMask = mask.masks[0]
    }

    let tokens = parseMask(currentMask)
    let prefixEnd = prefixLength ?? autoDetectPrefix(tokens)
    let state = createBuffer(tokens)

    function remaskIfNeeded(raw: string) {
        if (typeof mask === "string" || "mask" in mask) return

        const nextMask = mask.dispatch(raw)

        if (nextMask === currentMask) return

        currentMask = nextMask
        tokens = parseMask(currentMask)
        prefixEnd = autoDetectPrefix(tokens)

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

            remaskIfNeeded(raw)

            return {
                value: toValue(state.slots, prefixEnd),
                raw,
                complete: isComplete(state.slots),
                caret: state.cursor
            }
        }
    }
}