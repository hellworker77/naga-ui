import {forwardRef, InputHTMLAttributes} from "react"
import {useMask} from "@naga-ui/react-mask";
import {Mask} from "@naga-ui/mask-engine";
import {composeRefs} from "@naga-ui/core";

export interface Props
    extends InputHTMLAttributes<HTMLInputElement> {
    mask?: Mask
}

export const Input = forwardRef<
    HTMLInputElement,
    Props
>((props, forwardedRef) => {

    const {
        mask,
        required,
        ...rest
    } = props

    const {
        value,
        ref,
        ...handlers
    } = useMask(mask)


    return (
        <input {...rest}
               {...handlers}

               value={value}

               required={required}

               ref={composeRefs(forwardedRef, ref)} />
    )
})