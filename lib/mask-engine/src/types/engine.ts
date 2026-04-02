import {InputOperation} from "./inputOperation";

export
type MaskState = {
    raw: string;
    value: string;
    caret: number;
}

export
type MaskEngine = {
    getState(): MaskState
    setCaretFromFormatted(pos: number): void
    apply(op: InputOperation): MaskState;
}