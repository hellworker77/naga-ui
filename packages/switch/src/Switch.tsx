import {SwitchRoot} from "./primitives/_switchRoot";
import {SwitchThumb} from "./primitives/_switchThumb";

export const Switch = Object.assign(
    SwitchRoot,
    {
        Root: SwitchRoot,
        Thumb: SwitchThumb,
    }
)