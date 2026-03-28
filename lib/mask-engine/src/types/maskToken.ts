export
type MaskTokenType =
    | "digit"
    | "letter"
    | "alphanumeric"
    | "literal"

export
type MaskToken =
    | { type: "digit" }
    | { type: "letter" }
    | { type: "alphanumeric" }
    | { type: "literal", char: string }