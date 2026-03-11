import {forwardRef, HTMLAttributes, useEffect} from "react";
import {useDialog} from "../_dialogContext";
import {useFocusTrap} from "../hooks/useFocusTrap";
import {composeRefs} from "@naga-ui/utils";

export const DialogContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>>((props, forwardedRef) => {
    const {
        open,
        setOpen,
        contentRef,
        triggerRef
    } = useDialog()

    useFocusTrap(contentRef, open)

    useEffect(() => {

        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        document.addEventListener("keydown", onKey)

        return () =>
            document.removeEventListener("keydown", onKey)

    }, [])

    return (
        <div
            ref={composeRefs(forwardedRef, contentRef)}

            role="dialog"
            aria-modal="true"

            data-state="open"

            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                borderRadius: 8,
                padding: 24
            }}/>
    )
})