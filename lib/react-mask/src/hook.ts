import {useEffect, useRef, useState} from "react";
import {createEngine, DefaultMapper, Mask, MaskController} from "@naga-ui/mask-engine";

export
function useMask(mask?: Mask) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const engineRef = useRef(
        mask ? createEngine(mask) : null
    )

    const controllerRef = useRef(
        engineRef.current
            ? new MaskController(engineRef.current, DefaultMapper)
            : null
    )

    const [value, setValue] = useState("")

    useEffect(() => {
        function handleBeforeInput(e: InputEvent) {
            const input = inputRef.current
            const controller = controllerRef.current;
            if (!input || !controller) return

            const state = controller.dispatch(e, input);

            if (state){
                setValue(state.value);
            }
        }

        const input = inputRef.current
        if (!input) return

        input.addEventListener("beforeinput", handleBeforeInput)

        return () => {
            input.removeEventListener("beforeinput", handleBeforeInput)
        }

    }, []);

    return {
        value,
        ref: inputRef,
    }
}