import {Mapper} from "./abstract";
import {InputOperation} from "../../types";

export
class DefaultMapper extends Mapper {
    override map(e: InputEvent): null | InputOperation {

        switch (e.inputType) {
            case "insertText":
                return {type: "insert", text: e.data ?? ""}

            case "deleteContentBackward":
                return { type: "deleteBackward"}

            case "deleteContentForward":
                return { type: "deleteForward"}

            case "insertFromPaste":
                return {type: "insert", text: e.data ?? ""}

            default:
                return null;
        }
    }
}