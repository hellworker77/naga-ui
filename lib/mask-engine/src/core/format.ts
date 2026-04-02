import {MaskToken} from "../types/maskToken";
import {VALIDATION_RULES} from "./tokens";

export
function format(
    raw: string,
    tokens: MaskToken[]
): string {
    let result = ""
    let ri = 0;

    for (const token of tokens) {
        const char = raw[ri]

        if (!char) break;

        const validate = VALIDATION_RULES.get(token.type)

        if (validate) {
            if(validate(char)) {
                result += char
            }
            ri++

        } else if (token.type === "literal") {
            result += token.char

            if (char === token.char) ri++
        }

    }

    return result
}
