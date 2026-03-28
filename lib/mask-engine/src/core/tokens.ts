import {MaskToken} from "../types/maskToken";

export
const TOKENS = new Map<string, MaskToken>([
    ["a", {type: "letter"}],
    ["9", {type: "digit"}],
    ["*", {type: "alphanumeric"}]
])

export
const VALIDATION_RULES = new Map<MaskToken["type"], (c: string) => boolean>([
    ["digit", (c: string) => /\d/.test(c)],
    ["letter", (c: string) => /[a-zA-Z]/.test(c)],
    ["alphanumeric", (c: string) => /[a-zA-Z0-9]/.test(c)]
])