import {forwardRef, HTMLAttributes, useEffect} from "react";
import {useDialog} from "../_dialogContext";
import {useFocusTrap} from "../hooks/useFocusTrap";
import {composeRefs, useOutsideClick} from "@naga-ui/utils";
import {useBodyScrollLock} from "../hooks/useBodyScrollLock";
import {useFocusRestore} from "../hooks/useFocusRestore";

export const DialogContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>>((props, forwardedRef) => {
    const {
        open,
        setOpen,

        contentRef,
        triggerRef,

        titleId,
        descriptionId
    } = useDialog()

    useFocusTrap(contentRef, open)
    useBodyScrollLock(open)
    useFocusRestore(triggerRef, open)

    useOutsideClick(
        contentRef,
        () => setOpen(false),
        triggerRef)

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

    if (!open) return null;

    return (
        <div
            ref={composeRefs(forwardedRef, contentRef)}

            role="dialog"
            aria-modal="true"

            aria-labelledby={titleId}
            aria-describedby={descriptionId}

            data-state="open"

            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "white",
                borderRadius: 8,
                padding: 24,
                maxWidth: 500,
                width: "100%"
            }} />
    )
})

DialogContent.displayName = "DialogContent"