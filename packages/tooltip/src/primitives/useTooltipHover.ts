import {useTooltip} from "../_tooltipContext";
import {useSafePolygon} from "@naga-ui/core";
import {useTooltipProvider} from "../TooltipProvider";

export function useTooltipHover() {
    const {setOpen, triggerRef, contentRef} = useTooltip()

    const {isMovingTowardsTooltip} = useSafePolygon(8)

    const {
        skipDelayDuration,
        isInstantRef,
        openTimerRef
    } = useTooltipProvider()

    function closeTooltip() {
        if (openTimerRef.current)
            clearTimeout(openTimerRef.current)

        setOpen(false)

        window.setTimeout(() => {
            isInstantRef.current = false
        }, skipDelayDuration)
    }

    function handleLeave() {
        if (!triggerRef.current || !contentRef.current) {
            closeTooltip()
            return
        }

        const moving =
            isMovingTowardsTooltip(
                triggerRef.current.getBoundingClientRect(),
                contentRef.current.getBoundingClientRect()
            )

        if (!moving) {
            closeTooltip()
        }
    }

    return {handleLeave}
}