import {forwardRef, HTMLAttributes} from "react";
import {useCheckbox} from "../_checkboxContext";

export const CheckboxIndicator = forwardRef<
    HTMLSpanElement,
    HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
    const {
        checked,
        disabled
    } = useCheckbox();

    const {style, ...rest} = props;

    if (checked === false) return null;

    return (
        <span
            {...rest}
            ref={ref}

            data-state={
                checked === "indeterminate"
                    ? "indeterminate"
                    : "checked"
            }

            data-disabled={
                disabled? "" : undefined
            }

            style={{
                pointerEvents: "none",
                userSelect: "none",
                ...style
            }}
        />
    )
})

CheckboxIndicator.displayName = "CheckboxIndicator";