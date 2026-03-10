import {RefObject, useEffect} from "react";

export function useOutsideClick(
    ref: RefObject<HTMLElement | null>,
    handler: () => void,
    ignore?: RefObject<HTMLElement | null>
) {

    useEffect(() => {

        function listener(event: PointerEvent) {

            const el = ref.current
            if (!el) return

            const path = event.composedPath()

            if (path.includes(el)) return

            if (ignore?.current && path.includes(ignore.current)) return

            handler()
        }

        document.addEventListener("pointerdown", listener)

        return () => {
            document.removeEventListener("pointerdown", listener)
        }

    }, [ref, ignore, handler])

}