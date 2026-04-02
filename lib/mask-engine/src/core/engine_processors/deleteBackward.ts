import {EngineProcessor, EngineProcessorResult} from "../../types/engineProcessor";
import {DeleteBackwardOperation} from "../../types";

export
class DeleteBackwardProcessor implements EngineProcessor {
    process(
        prevCaret: number,
        prevRaw: string,
        inputOperation: DeleteBackwardOperation,
        maxRawLength: number): EngineProcessorResult {
        let nextRaw = ""
        let nextCaret = -1;

        if (prevCaret > 0) {
            nextRaw =
                prevRaw.slice(0, prevCaret - 1)+
                prevRaw.slice(prevCaret);

            nextCaret = prevCaret - 1;
        }

        return {caret: nextCaret, value: nextRaw}
    }
}