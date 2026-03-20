import {parseMask} from "./_parser";
import {formatMask} from "./_formatter";
import {MaskTokens} from "./_tokens";

export type Mask =
    ((value: string) => string)
    | {
    mask: string,
    placeholder?: string,
    lazy?: boolean
}
    | string

export type DynamicMask = {
    masks: string[],
    dispatch(v: string): string
}

type MaskEngine = {
    process(v: string): string,
}

export function createMaskEngine(config: Mask | DynamicMask): MaskEngine {

    if (typeof config === "function") {
        return {
            process: config,
        }
    }

    if (isDynamicMask(config)) {
        return {
            process(v: string) {
                const raw =
                    extractRaw(v);

                const mask
                    = (config as DynamicMask).dispatch(raw)

                const tokens =
                    parseMask(mask)

                return formatMask(raw, tokens)
            }
        }
    }

    if (typeof config === "string") {
        config = {mask: config};
    }

    const {
        mask,
        placeholder = "_",
        lazy = true,
    } = config

    const tokens = parseMask(mask)

    return  {
        process(v: string) {
            const raw =
                extractRaw(v);

            if (!raw) return ""

            const formatted =
                formatMask(raw, tokens)

            const withPlaceholder = applyPlaceholder(
                formatted,
                tokens,
                placeholder,
                lazy
            )

            return trimTrailingLiterals(withPlaceholder)
        }
    }
}

function applyPlaceholder(
    formatted: string,
    tokens: MaskTokens,
    placeholder: string,
    lazy: boolean
) {
    let result = "";
    let fi = 0;

    for (const token of tokens) {

        const char = formatted[fi];

        if (token.type === "literal") {
            result += token.char
            if (char === token.char)
                fi++
            continue;
        }

        if (char) {
            result += char;
            fi++
        } else {
            if (!lazy)
                result += placeholder
        }
    }

    return result;
}

function isDynamicMask(config: Mask | DynamicMask): config is DynamicMask {
    return typeof config === "object" && config !== null && "masks" in config;
}

function trimTrailingLiterals(
    value: string
) {
    return value.replace(/[^\da-zA-Z]+$/, "")
}

export function extractRaw(value: string) {
    return value.replace(/[^a-zA-Z0-9]/g, "")
}