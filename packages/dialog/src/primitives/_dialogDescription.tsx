import {forwardRef, HTMLAttributes} from "react";
import {useDialog} from "../_dialogContext";

export const DialogDescription = forwardRef<
    HTMLParagraphElement,
    HTMLAttributes<HTMLParagraphElement>
>((props, forwardedRef) => {
    const { descriptionId } = useDialog()

    return (
        <p
            {...props}
            ref={forwardedRef}
            id={descriptionId}
        />
    )
})

DialogDescription.displayName = "DialogDescription"