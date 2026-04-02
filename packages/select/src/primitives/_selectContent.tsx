import {forwardRef, HTMLAttributes, useLayoutEffect, useRef} from "react";
import {useSelect} from "../_selectContext";
import {createPortal} from "react-dom";
import {
    composeRefs, flip, offset, shift,
    useFloatingPosition,
    useListNavigation,
    useOutsideClick,
    useTypehead
} from "@naga-ui/core";

export const SelectContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>((props, forwardedRef) => {
    const {
        open,
        setOpen,
        triggerRef,
        options,
        highlighted,
        setHighlighted,
    } = useSelect()

    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!open || !contentRef.current) return;
        contentRef.current.focus({preventScroll: true})
    }, [open]);

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
            offset(4),
            flip(),
            shift()
        ]
    })

    const onKeyDown = useListNavigation(options.length, highlighted, setHighlighted)

    const texts = options.map(o => ({
        text: o.ref.current?.textContent ?? ""
    }))

    const onType = useTypehead(texts, highlighted, setHighlighted);

    if (!open) return null

    return createPortal(
        <div {...props}
             data-state={open? "open" : "closed"}
             tabIndex={-1}
             ref={composeRefs(contentRef, forwardedRef)}
             role="listbox"

             onKeyDown={(e) => {
                 onKeyDown(e)
                 onType(e.key)
             }}

             style={{
                 position: "fixed",
                 width: triggerRef.current?.offsetWidth,

                 background: "white",
                 border: "1px solid #ccc",
                 borderRadius: 6,

                 boxShadow: "0 4px 12px rgba(0,0,0,0.08)",

                 maxHeight: 240,
                 overflowY: "auto",

                 ...style,
                 ...props.style
             }}>
            {props.children}
        </div>,
        document.body
    )
})

SelectContent.displayName = "SelectContent"