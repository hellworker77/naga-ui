import {EngineProcessor, EngineProcessorResult} from "../../types/engineProcessor";
import {DeleteForwardOperation} from "../../types";

export
class DeleteForwardProcessor implements EngineProcessor {
    process(
        prevCaret: number,
        prevRaw: string,
        inputOperation: DeleteForwardOperation,
        maxRawLength: number): EngineProcessorResult {
        let nextRaw = ""

        if (prevCaret < prevRaw.length) {
            nextRaw =
                prevRaw.slice(0, prevCaret - 1)+
                prevRaw.slice(prevCaret);

        }

        return {caret: prevCaret, value: nextRaw}
    }
}