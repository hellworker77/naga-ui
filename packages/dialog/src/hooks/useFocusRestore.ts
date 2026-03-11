import {RefObject, useEffect} from "react";

export function useFocusRestore(
    triggerRef: RefObject<HTMLElement | null>,
    open: boolean
) {
    useEffect(() => {
        if (!open && triggerRef.current) {
            triggerRef.current.focus();
        }
    }, [open]);
}