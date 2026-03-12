import {forwardRef, HTMLAttributes, useRef} from "react";
import {useTooltip} from "../_tooltipContext";
import {composeRefs} from "@naga-ui/utils";
import {useTooltipProvider} from "../TooltipProvider";

export const TooltipTrigger = forwardRef<
    HTMLElement,
    HTMLAttributes<HTMLElement>>
((props, ref) => {
    const {open, setOpen, triggerRef} = useTooltip()

    const {
        delayDuration,
        skipDelayDuration,
        isInstantRef,
        openTimerRef
    } = useTooltipProvider()


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

    function closeTooltip() {
        openTimerRef.current && clearTimeout(openTimerRef.current)
        setOpen(false)

        window.setTimeout(() => {
            isInstantRef.current = false
        }, skipDelayDuration)
    }

    return (
        <span {...props}
              ref={composeRefs(ref, triggerRef)}

              onMouseEnter={openTooltip}
              onMouseLeave={closeTooltip}

              onFocus={openTooltip}
              onBlur={closeTooltip}

              data-state={open ? "open" : "closed"}
        />
    )
})

TooltipTrigger.displayName = "TooltipTrigger"