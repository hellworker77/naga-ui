import {InsertOperation} from "../../types";
import {EngineProcessor, EngineProcessorResult} from "../../types/engineProcessor";
import {extractRaw} from "../utils";

export
class InsertProcessor implements EngineProcessor {

    process(
        prevCaret: number,
        prevRaw: string,
        operation: InsertOperation,
        maxRawLength: number
    ): EngineProcessorResult {
        let nextRaw: string = ""
        let nextCaret: number = -1;

        const text = extractRaw(operation.text);

        const next =
            prevRaw.slice(0, prevCaret) +
            text +
            prevRaw.slice(prevCaret);

        nextRaw = next.slice(0, maxRawLength);

        nextCaret = prevCaret + Math.min(prevCaret + text.length, nextRaw.length);

        return {caret: nextCaret, value: nextRaw}
    }
}