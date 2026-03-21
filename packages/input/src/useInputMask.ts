import {
    ChangeEvent,
    ClipboardEvent,
    CompositionEvent,
    useMemo,
    useRef,
    useState
} from "react"

import {
    createMaskEngine,
    type Mask,
    type MaskEngineResult
} from "@naga-ui/mask-engine"

export function useInputMask(mask?: Mask) {
    const engine = useMemo(
        () => mask
            ? createMaskEngine(mask)
            : null,
        [mask]
    )

    const prevValueRef = useRef("")
    const composing = useRef(false)

    const [value, setValue] = useState("")

    function applyResult(
        input: HTMLInputElement,
        result: MaskEngineResult
    ) {
        setValue(result.value)
        prevValueRef.current = result.value

        requestAnimationFrame(() => {
            input.setSelectionRange(result.caret, result.caret)
        })
    }

    function handleChange(input: HTMLInputElement) {
        if (!engine) return

        const nextValue = input.value
        const prevValue = prevValueRef.current

        const result = engine.process(nextValue, prevValue)

        applyResult(input, result)
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (composing.current) return
        handleChange(e.target)
    }

    function onPaste(e: ClipboardEvent<HTMLInputElement>) {
        if (!engine) return

        e.preventDefault()

        const input = e.currentTarget
        const paste = e.clipboardData.getData("text")

        const start = input.selectionStart ?? 0
        const end = input.selectionEnd ?? 0

        const prevValue = prevValueRef.current

        const nextValue =
            prevValue.slice(0, start) +
            paste +
            prevValue.slice(end)

        const result = engine.process(nextValue, prevValue)

        applyResult(input, result)
    }

    function onCompositionStart() {
        composing.current = true
    }

    function onCompositionEnd(e: CompositionEvent<HTMLInputElement>) {
        composing.current = false
        handleChange(e.currentTarget)
    }

    return {
        value,
        onChange,
        onPaste,
        onCompositionStart,
        onCompositionEnd
    }
}