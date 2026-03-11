import {RefObject, useEffect} from "react";

export function useFocusTrap(
    ref: RefObject<HTMLElement| null>,
    active: boolean,
) {

    useEffect(() => {
        if (!active || !ref.current) return;

        const el = ref.current;

        const focusable = el.querySelectorAll<HTMLElement>('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])')

        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        function onKey(e: KeyboardEvent) {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            }else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        el.addEventListener("keydown", onKey);

        first?.focus()

        return () => el.removeEventListener("keydown", onKey);
    }, [active]);
}