import { MaskToken, Slot } from "./_types"

export function autoDetectPrefix(tokens: MaskToken[]) {
    let i = 0

    while (i < tokens.length) {
        if (tokens[i].type !== "literal") break
        i++
    }

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

export function toValue(slots: Slot[], prefixEnd: number) {
    let last = -1

    for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        if (s.token.type !== "literal" && s.char) {
            last = i
        }
    }

    if (last === -1) {
        let result = ""
        for (let i = 0; i < prefixEnd; i++) {
            result += (slots[i].token as any).char
        }
        return result
    }

    let result = ""

    for (let i = 0; i <= last; i++) {
        const s = slots[i]

        if (s.token.type === "literal") result += s.token.char
        else if (s.char) result += s.char
    }

    return result
}

export function toRaw(slots: Slot[]) {
    return slots
        .filter(s => s.token.type !== "literal" && s.char)
        .map(s => s.char!)
        .join("")
}