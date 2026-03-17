import {MaskTokens} from "./_tokens"

export function formatMask(
    raw: string,
    tokens: MaskTokens
): string {
    let result = ""
    let ri = 0

    for (const token of tokens) {

        const char = raw[ri]

        if (!char)
            break

        if (token.type === "digit") {

            if (/\d/.test(char)) {
                result += char
                ri++
            } else {
                ri++
            }

        }

        else if (token.type === "letter") {

            if (/[a-zA-Z]/.test(char)) {
                result += char
                ri++
            } else {
                ri++
            }

        }

        else if (token.type === "alphanumeric") {

            if (/[a-zA-Z0-9]/.test(char)) {
                result += char
                ri++
            } else {
                ri++
            }

        }

        else {

            result += token.char

            if (char === token.char)
                ri++

        }

    }

    return result
}