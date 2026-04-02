import {InputOperation} from "../../types/inputOperation";

export
abstract class Mapper {
    public abstract map(e: InputEvent): null | InputOperation;
}