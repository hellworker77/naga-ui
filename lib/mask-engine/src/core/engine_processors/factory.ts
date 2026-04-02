import {InputOperation} from "../../types";
import {EngineProcessor} from "../../types/engineProcessor";
import {InsertProcessor} from "./insert";
import {ReplaceProcessor} from "./replace";
import {DeleteBackwardProcessor} from "./deleteBackward";
import {DeleteForwardProcessor} from "./deleteForward";

export
class EngineProcessorFactory {
    static create_processor(type: InputOperation["type"]): EngineProcessor {
        switch (type) {
            case "insert":
                return new InsertProcessor();

            case "deleteBackward":
                return new DeleteBackwardProcessor();

            case "deleteForward":
                return new DeleteForwardProcessor();

            case "replace":
                return new ReplaceProcessor();

            default:
                throw new Error("Unknown type '" + type + "'");
        }
    }
}