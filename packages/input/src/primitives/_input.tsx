import {
    forwardRef,
    InputHTMLAttributes,
    useImperativeHandle,
    useRef
} from "react"
import {useInputMask} from "../useInputMask";

export interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    mask?: string | {
        masks: string[],
        dispatch(v: string): string
    }
}

export const Input = forwardRef<HTMLInputElement, Props>(
    (props, ref) => {
        const {
            mask,
            required,
            onChange,
            ...rest
        } = props

        const innerRef = useRef<HTMLInputElement>(null)

        const {
            value,
            ...handlers
        } = useInputMask(mask)

        useImperativeHandle(ref, () => innerRef.current!)

        return (
            <input
                {...rest}
                {...handlers}
                ref={innerRef}
                value={value}
                required={required}

                onChange={(e) => {
                    handlers.onChange(e)
                    onChange?.(e)

                    if (required) {
                        const valid = !!e.currentTarget.value

                        e.currentTarget.setCustomValidity(
                            valid ? "" : "Invalid value"
                        )
                    }
                }}

                onInvalid={(e) => {
                    if (required && !e.currentTarget.value) {
                        e.currentTarget.setCustomValidity("Invalid value")
                    }
                }}
            />
        )
    }
)