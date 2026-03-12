import {RefObject, useEffect} from "react";

export function useDismissableLayer({open, ref, onDismiss, isTop}: {
    open: boolean,
    ref: RefObject<HTMLElement | null>,
    onDismiss(): void,
    isTop(): boolean
}) {
    useEffect(() => {
        if(!open) return;

        function onKey(e: KeyboardEvent) {
            if(e.key === "Escape" && isTop()) {
                onDismiss()
            }
        }

        function onPointerDown(e: PointerEvent) {
            if (!ref.current)
                return;

            if (ref.current.contains(e.target as Node))
                return;

            if (isTop()) {
                onDismiss()
            }
        }

        document.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointerDown);

        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointerDown);
        }

    }, [open]);
}