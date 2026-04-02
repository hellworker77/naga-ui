import {InputOperation} from "./inputOperation";
import {MaskState} from "./engine";

export
type MaskController = {
    handleInput(op: InputOperation, input: HTMLInputElement): MaskState
}