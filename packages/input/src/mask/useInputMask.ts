import {ChangeEvent, ClipboardEvent, useMemo, useRef, useState, KeyboardEvent} from "react";
import {createMaskEngine, DynamicMask, extractRaw, Mask} from "./_engine";
import {findCaretFromRaw, getRawBeforeCaret, restoreCaret} from "./_caret";

export function useInputMask(mask?: Mask | DynamicMask) {
    const engine =
        useMemo(
            () => mask
                ? createMaskEngine(mask)
                : null,
            [mask]
        )

    const rawRef = useRef("")
    const [value, setValue] = useState("")
    const composing = useRef(false)

    function onChange(
        e: ChangeEvent<HTMLInputElement>,
    ) {
        if (!engine || composing.current) return;

        const input = e.target;
        const start = input.selectionStart ?? 0;

        const raw = extractRaw(input.value);
        rawRef.current = raw;

        const next = engine.process(raw)
        const prev = input.value;

        setValue(next)

        requestAnimationFrame(() => {
            restoreCaret(input, prev, next, start)
        })
    }

    function onPaste(
        e: ClipboardEvent<HTMLInputElement>
    ) {
        if (!engine) return;
        e.preventDefault();

        const raw =
            extractRaw(e.clipboardData.getData("text"))
        rawRef.current = raw;

        setValue(engine.process(raw))
    }

    const validation = engine
        ? engine.validate(rawRef.current)
        : {valid: true, complete: true}

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (!engine) return;

        const input = e.currentTarget;

        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;

        if (start !== end) return;

        if (e.key === "Backspace") {
            const raw = extractRaw(input.value);

            const rawBefore =
                getRawBeforeCaret(input.value, start);

            if (rawBefore > 0) {
                e.preventDefault();

                const newRaw =
                    raw.slice(0, rawBefore - 1) +
                    raw.slice(rawBefore)

                rawRef.current = newRaw;

                const next =
                    engine.process(newRaw)

                setValue(next)

                requestAnimationFrame(() => {
                    const caret =
                        findCaretFromRaw(next, rawBefore - 1)

                    input.setSelectionRange(caret, caret)
                })
            }
        }

        if (e.key === "Delete") {
            const raw = extractRaw(input.value);

            const rawBefore =
                getRawBeforeCaret(input.value, start);

            if (rawBefore < raw.length) {
                e.preventDefault();

                const newRaw =
                    raw.slice(0, rawBefore) +
                    raw.slice(rawBefore + 1)

                rawRef.current = newRaw;
                const next =
                    engine.process(newRaw)

                setValue(next)

                requestAnimationFrame(() => {
                    const caret =
                        findCaretFromRaw(next, rawBefore)

                    input.setSelectionRange(caret, caret)
                })
            }
        }
    }

    return {
        raw: rawRef.current,
        validation,

        value,
        onChange,
        onPaste,
        onKeyDown,
        onCompositionStart: () => composing.current = true,
        onCompositionEnd: () => composing.current = false,
    }
}