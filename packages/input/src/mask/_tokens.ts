export type MaskToken =
    | { type: "digit" }
    | { type: "letter" }
    | { type: "alphanumeric" }
    | { type: "literal"; char: string }

export type MaskTokens = MaskToken[];

export const TOKENS: Map<string, MaskToken> = new Map([
    ["a", {type: "letter"}],
    ["9", {type: "digit"}],
    ["*", {type: "alphanumeric"}]
])