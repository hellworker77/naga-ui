import {MaskToken} from "../types/maskToken";
import {TOKENS} from "./tokens";

export
function parse(mask: unknown): MaskToken[] {
    if (!isString(mask))
        throw new TypeError(`Expected mask to be a string, got ${typeof mask}`);

    return [...mask]
        .map(c => TOKENS.get(c) ?? {type: "literal", char: c})
}

function isString(v: unknown): v is string {
    return typeof v === "string" || v instanceof String
}