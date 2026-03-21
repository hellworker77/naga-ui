import { MaskToken } from "./_types"

const TOKENS = new Map<string, MaskToken>([
    ["9", { type: "digit" }],
    ["a", { type: "letter" }],
    ["*", { type: "alphanumeric" }],
])

export function parseMask(mask: string): MaskToken[] {
    return [...mask].map(
        c => TOKENS.get(c) ?? { type: "literal", char: c }
    )
}