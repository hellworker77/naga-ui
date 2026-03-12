import {forwardRef, HTMLAttributes} from "react";
import {useTooltip} from "../_tooltipContext";
import {composeRefs, flip, offset, shift, useFloatingPosition} from "@naga-ui/utils";

export const TooltipContent = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>>
((props, forwardedRef) => {
    const {open, triggerRef, contentRef} = useTooltip()

    const style = useFloatingPosition({
        open,
        anchorRef: triggerRef,
        floatingRef: contentRef,

        side: "top",

        middleware: [
            offset(6),
            flip(),
            shift()
        ]
    })

    if (!open) return null;

    return (
        <div {...props}
             ref={composeRefs(forwardedRef, contentRef)}
             role="tooltip"

             data-state={open}

             style={{
                 position: "fixed",

                 padding: "6px 8px",
                 fontSize: 12,

                 background: "black",
                 color: "white",

                 borderRadius: 4,

                 ...style,
                 ...props.style
             }}
        />
    )
})

TooltipContent.displayName = "TooltipContent"