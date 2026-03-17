import {MaskTokens, TOKENS} from "./_tokens";

export function parseMask(mask: string): MaskTokens {
    const tokens: MaskTokens = []

    for (const c of mask) {
        const token = TOKENS.get(c)

        if (token)
            tokens.push(token)
        else
            tokens.push({
                type: "literal",
                char: c
            })
    }

    return tokens
}