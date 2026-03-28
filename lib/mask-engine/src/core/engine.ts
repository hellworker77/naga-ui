import {Mask} from "../types/mask";
import {parse} from "./parse";
import {format} from "./format";
import {extractRaw, isInputChar} from "./utils";
import {InputOperation} from "../types/inputOperation";
import {MaskEngine} from "../types/engine";
import {EngineProcessorFactory} from "./engine_processors/factory";


export
function createEngine(mask: Mask): MaskEngine {
    let raw = ""
    let caretRaw = 0

    const tokens = parse(mask);

    const maxRawLength = tokens.filter(t => t.type !== "literal").length

    function formatRaw(r: string) {
        return format(r, tokens);
    }

    function mapCaret(formatted: string, rawIndex: number) {
        if (rawIndex === 0) return 0;

        let count = 0;

        for (let i = 0; i < formatted.length; i++) {
            if (isInputChar(formatted[i])) {
                count++;
            }

            if (count === rawIndex) {
                let j = i + 1;

                while (
                    j < formatted.length &&
                    !isInputChar(formatted[j])
                    ) {
                    j++;
                }
                return j;
            }
        }
        return formatted.length
    }

    function getRawIndex(formatted: string, caret: number) {
        let count = 0;

        for (let i = 0; i < caret; i++) {
            if (isInputChar(formatted[i])) {
                count++;
            }
        }

        return count;
    }

    return {
        getState() {
            const value = formatRaw(raw)
            const caret = mapCaret(value, caretRaw)

            return {raw, value, caret}
        },

        setCaretFromFormatted(pos: number) {
            const formatted = formatRaw(raw)
            caretRaw = getRawIndex(formatted, pos);
        },

        apply(op: InputOperation) {
            const processor = EngineProcessorFactory.create_processor(op.type);

            const {
                caret: nextCaret,
                value: nextRaw
            } = processor.process(caretRaw, raw, op, maxRawLength);

            raw = nextRaw;
            caretRaw = nextCaret;

            return this.getState()
        }
    }
}