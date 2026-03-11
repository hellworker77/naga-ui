import {forwardRef, HTMLAttributes} from "react";
import {useDialog} from "../_dialogContext";

export const DialogClose = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
    const { setOpen } = useDialog()

    return (

        <button
            {...props}
            ref={ref}
            onClick={() => setOpen(false)}
        />
    )
})

DialogClose.displayName = "DialogClose"