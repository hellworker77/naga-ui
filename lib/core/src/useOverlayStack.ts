import {useEffect, useRef} from "react";
import {isTopOverlay, Overlay, pushOverlay, removeOverlay} from "./overlayStack";

/**
 * @deprecated Use new OverlayEngine
 */
export function useOverlayStack(open: boolean) {
    const overlayRef = useRef<Overlay | null>(null);

    useEffect(() => {
        if (!open) return;

        overlayRef.current = pushOverlay()

        return () => {
           if (overlayRef.current) {
               removeOverlay(overlayRef.current);
           }
        }

    }, [open]);

    function isTop() {
        if (!overlayRef.current)
            return false;

        return isTopOverlay(overlayRef.current);
    }

    function getZIndex() {
        return overlayRef.current?.zIndex ?? 0;
    }

    return {
        isTop,
        getZIndex
    }
}

/*

stack
focus management
dismiss system
pointer blocking
scroll locking
z-index ordering

*/