import {forwardRef, InputHTMLAttributes} from "react";
import {useInputMask} from "../mask/useInputMask";

export interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    mask?: string;
}

export const Input = forwardRef<
    HTMLInputElement,
    Props
>((props, ref) => {
    const {
        mask,
        ...rest
    } = props

    const maskHandlersProps =
        useInputMask(mask)

    return (
        <input
            {...rest}
            {...maskHandlersProps}
            ref={ref}
        />
    )
})