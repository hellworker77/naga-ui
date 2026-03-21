import { BufferState, MaskToken, Slot } from "./_types"

export function createBuffer(tokens: MaskToken[]): BufferState {
    return {
        slots: tokens.map(t => ({
            token: t,
            char: t.type === "literal" ? t.char : null
        })),
        cursor: 0
    }
}

export function cloneEmpty(tokens: MaskToken[]) {
    return createBuffer(tokens)
}

export function nextEditable(slots: Slot[], i: number) {
    while (i < slots.length) {
        if (slots[i].token.type !== "literal") return i
        i++
    }
    return slots.length
}

export function insert(state: BufferState, text: string) {
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

export function clearRange(state: BufferState, start: number, end: number) {
    for (let i = start; i < end; i++) {
        if (state.slots[i].token.type !== "literal") {
            state.slots[i].char = null
        }
    }
    state.cursor = start
}

function testChar(char: string, token: MaskToken) {
    if (token.type === "digit") return /\d/.test(char)
    if (token.type === "letter") return /[a-z]/i.test(char)
    if (token.type === "alphanumeric") return /[a-z0-9]/i.test(char)
    return false
}