import {RefObject, useEffect} from "react";

export function useFocusGuards(
    ref: RefObject<HTMLElement | null>,
    active: boolean,
) {
    useEffect(() => {
        if (!active || !ref.current)
            return;

        const node = ref.current;

        const focusable =
            node.querySelectorAll<HTMLElement>(
                `a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])`
            )

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        function onKey(e: KeyboardEvent) {
            if (e.key !== "Tab")
                return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus()
                }
            }else {
                if (document.activeElement === last){
                    e.preventDefault();
                    first?.focus()
                }
            }
        }

        node.addEventListener("keydown", onKey)

        return () => {
            node.removeEventListener("keydown", onKey)
        }
    }, [active]);
}