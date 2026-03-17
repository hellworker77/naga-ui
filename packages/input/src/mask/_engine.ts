import {parseMask} from "./_parser";
import {formatMask} from "./_formatter";

export function createMaskEngine(mask: string) {
    const tokens = parseMask(mask)

    function process(value: string) {
        const raw =
            value.replace(/[^a-zA-Z0-9]/g, "")

        return formatMask(raw, tokens)
    }

    return {process}
}