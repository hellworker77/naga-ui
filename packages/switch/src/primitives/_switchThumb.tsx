import {forwardRef, HTMLAttributes} from "react";
import {useSwitch} from "../_switchContext";

export const SwitchThumb = forwardRef<
    HTMLSpanElement,
    HTMLAttributes<HTMLSpanElement>
>((props, ref) => {
    const {checked, disabled} =
        useSwitch()

    const {style, ...rest} = props

    return (
        <span
            {...rest}
            ref={ref}

            data-state={
                checked
                    ? "checked"
                    : "unchecked"
            }

            data-disabled={
                disabled ? "" : undefined
            }

            style={{
                pointerEvents: "none",
                userSelect: "none",
                ...style
            }} />
    )
})

SwitchThumb.displayName = "SwitchThumb"