import {InputOperation} from "./inputOperation";

export
type EngineProcessorResult = {
    caret: number;
    value: string;
}

export
interface EngineProcessor {
    process(
        prevCaret: number,
        prevRaw: string,
        inputOperation: InputOperation,
        maxRawLength: number
    ): EngineProcessorResult
}