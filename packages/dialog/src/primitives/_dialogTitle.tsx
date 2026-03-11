import {forwardRef, HTMLAttributes} from "react";
import {useDialog} from "../_dialogContext";

export const DialogTitle = forwardRef<
    HTMLHeadingElement,
    HTMLAttributes<HTMLHeadingElement>
>((props, forwardedRef) => {
    const {titleId} = useDialog()

    return (
        <h2 {...props}
            ref={forwardedRef}
            id={titleId}
        />
    )
})

DialogTitle.displayName = "DialogTitle"