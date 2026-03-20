import {forwardRef, InputHTMLAttributes} from "react";
import {useInputMask} from "../mask/useInputMask";
import {DynamicMask, Mask} from "../mask/_engine";

export interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    mask?: Mask | DynamicMask;
}

export const Input = forwardRef<
    HTMLInputElement,
    Props
>((props, ref) => {
    const {
        mask,
        required,
        ...rest
    } = props

    const {
        value,
        raw,
        validation,
        ...handlers
    } = useInputMask(mask)

    return (
        <input
            {...rest}
            {...handlers}
            ref={ref}

            value={value}

            required={required}

            data-invalid={
                required && !validation.valid
                    ? ""
                    : undefined
            }

            onChange={(e) => {
                handlers.onChange?.(e)

                if (required) {
                    const valid =
                        validation.valid

                    e.currentTarget.setCustomValidity(
                        valid ? "" : "Invalid value"
                    )
                }
            }}

            onInvalid={(e) => {
                if (required && !validation.valid) {
                    e.currentTarget.setCustomValidity("Invalid value")
                }
            }}
        />
    )
})