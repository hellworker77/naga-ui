import {forwardRef, HTMLAttributes} from "react";
import {useDialog} from "../_dialogContext";

export const DialogOverlay = forwardRef<
HTMLDivElement,
HTMLAttributes<HTMLDivElement>>((props, ref) => {
    const {open} = useDialog()

    if (!open) return null;

    return (
        <div {...props}
            ref={ref}

            data-state={open}

            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.4)"
            }} />
    )
})

DialogOverlay.displayName = "DialogOverlay"