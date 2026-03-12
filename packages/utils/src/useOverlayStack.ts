import {useEffect, useRef} from "react";
import {isTopOverlay, Overlay, pushOverlay, removeOverlay} from "./overlayStack";

export function useOverlayStack(open: boolean): () => boolean {
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

    return () => {
        if (!overlayRef.current)
            return false

        return isTopOverlay(overlayRef.current)
    };
}