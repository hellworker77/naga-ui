import {useEffect, useRef} from "react";
import {isTopOverlay, pushOverlay, removeOverlay} from "./overlayStack";

export function useOverlayStack(open: boolean): () => boolean {
    const overlayRef = useRef<any>(null);

    useEffect(() => {
        if (!open) return;

        overlayRef.current = pushOverlay()

        return () => {
            removeOverlay(overlayRef.current);
        }

    }, [open]);

    return () => isTopOverlay(overlayRef.current);
}