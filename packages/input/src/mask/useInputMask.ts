import {ChangeEvent, ClipboardEvent, useMemo, useRef} from "react";
import {createMaskEngine} from "./_engine";
import {restoreCaret} from "./_caret";

export function useInputMask(mask?: string) {

    const engine =
        useMemo(
            () => mask
                ? createMaskEngine(mask)
                : null,
            [mask]
        )

    const composing =
        useRef(false)

    function onCompositionStart(){
        composing.current = true
    }

    function onCompositionEnd(){
        composing.current = false
    }

    function onChange(
        e:  ChangeEvent<HTMLInputElement>,
    ){
        if (!engine) return;
        if (composing.current) return;

        const input = e.target;

        const prev = input.value;
        const caret =
            input.selectionStart ?? 0;

        const next =
            engine.process(prev)

        input.value = next;

        restoreCaret(
            input,
            prev,
            next,
            caret
        )
    }

    function onPaste(
        e: ClipboardEvent<HTMLInputElement>
    ) {
        if (!engine) return;
        e.preventDefault();

        const text =
            e.clipboardData
                .getData("text")

        const input = e.currentTarget;
        input.value =
            engine.process(text)
    }

    return {
        onChange,
        onPaste,
        onCompositionStart,
        onCompositionEnd,
    }
}