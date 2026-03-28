import {EngineProcessor, EngineProcessorResult} from "../../types/engineProcessor";
import {InputOperation, ReplaceOperation} from "../../types";
import {extractRaw} from "../utils";

export
class ReplaceProcessor implements EngineProcessor  {
    process(prevCaret: number,
            prevRaw: string,
            operation: ReplaceOperation,
            maxRawLength: number): EngineProcessorResult {
        const nextRaw = extractRaw(operation.text)
        const diff = nextRaw.length - prevRaw.length;

        return {caret: Math.max(0, prevCaret + diff), value: nextRaw}
    }
}