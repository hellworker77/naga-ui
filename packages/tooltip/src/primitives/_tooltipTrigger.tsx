import {forwardRef, HTMLAttributes} from "react";
import {useTooltip} from "../_tooltipContext";
import {composeRefs} from "@naga-ui/utils";
import {useTooltipProvider} from "../TooltipProvider";
import {useTooltipHover} from "./useTooltipHover";

export const TooltipTrigger = forwardRef<
    HTMLElement,
    HTMLAttributes<HTMLElement>>
((props, ref) => {
    const {open, setOpen, triggerRef} = useTooltip()
    const {
        delayDuration,
        isInstantRef,
        openTimerRef
    } = useTooltipProvider()

    const {handleLeave} = useTooltipHover()

    function openTooltip() {
        const delay =
            isInstantRef.current
                ? 0
                : delayDuration;

        openTimerRef.current = window.setTimeout(() => {
            setOpen(true)
            isInstantRef.current = true
        }, delay)
    }

    return (
        <span {...props}
              ref={composeRefs(ref, triggerRef)}

              onMouseEnter={openTooltip}
              onMouseLeave={handleLeave}

              onFocus={openTooltip}
              onBlur={handleLeave}

              data-state={open ? "open" : "closed"}
        />
    )
})

TooltipTrigger.displayName = "TooltipTrigger"