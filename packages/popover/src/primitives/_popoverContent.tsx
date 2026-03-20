import {forwardRef, HTMLAttributes, useEffect} from "react";
import {usePopover} from "../_popoverContext";
import {composeRefs, flip, offset, shift, useFloatingPosition, useOutsideClick} from "@naga-ui/core";

export const PopoverContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>>
((props, ref) => {

    const {
        open,
        setOpen,
        triggerRef,
        contentRef
    } = usePopover()

    useOutsideClick(
        contentRef,
        () => setOpen(false),
        triggerRef
    )

    const style = useFloatingPosition({
        open,
        anchorRef: triggerRef,
        floatingRef: contentRef,

        side: "bottom-start",

        middleware: [
            offset(6),
            flip(),
            shift()
        ]
    })

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape")
                setOpen(false)
        }

        document.addEventListener("keydown", onKey)

        return () =>
            document.removeEventListener("keydown", onKey)
    }, [])

    if (!open) return null

    return (
        <div {...props}

             ref={composeRefs(ref, contentRef)}

             role="dialog"

             data-state={open}

             style={{
                 position: "fixed",
                 background: "white",
                 borderRadius: 6,
                 border: "1px solid #ddd",
                 padding: 12,
                 boxShadow: "0 10px 30px rgba(0,0,0,0.15)",

                 ...style,
                 ...props.style
             }} />
    )
})

PopoverContent.displayName = "PopoverContent"