import {CheckboxRoot} from "./primitives/_checkboxRoot";
import {CheckboxIndicator} from "./primitives/_checkboxIndicator";

export const Checkbox = Object.assign(
    CheckboxRoot, {
        Root: CheckboxRoot,
        Indicator: CheckboxIndicator,
    }
)