import { Mask, MaskEngineResult } from "./_types"
import { parseMask } from "./_parser"
import { createBuffer, cloneEmpty, insert, clearRange } from "./_buffer"
import { toValue, toRaw, autoDetectPrefix } from "./_format"
import { diff } from "./_diff"

export function createMaskEngine(mask: Mask) {

    let currentMask: string
    let prefixLength: number | undefined

    if (typeof mask === "string") {
        currentMask = mask
    } else if ("mask" in mask) {
        currentMask = mask.mask
        prefixLength = mask.prefixLength
    } else {
        currentMask = mask.masks[0]
    }

    let tokens = parseMask(currentMask)
    let prefixEnd = prefixLength ?? autoDetectPrefix(tokens)
    let state = createBuffer(tokens)

    function remaskIfNeeded(raw: string) {
        if (typeof mask === "string" || "mask" in mask) return

        const nextMask = mask.dispatch(raw)

        if (nextMask === currentMask) return

        currentMask = nextMask
        tokens = parseMask(currentMask)
        prefixEnd = autoDetectPrefix(tokens)

        const newState = cloneEmpty(tokens)
        insert(newState, raw)

        state = newState
    }

    return {
        process(nextValue: string, prevValue: string): MaskEngineResult {
            const d = diff(prevValue, nextValue)

            let slotIndex = d.start

            if (d.removed.length) {
                clearRange(state, slotIndex, slotIndex + d.removed.length)
            }

            state.cursor = slotIndex

            if (d.inserted) {
                insert(state, d.inserted)
            }

            const raw = toRaw(state.slots)

            remaskIfNeeded(raw)

            return {
                value: toValue(state.slots, prefixEnd),
                raw,
                complete: true,
                caret: state.cursor
            }
        }
    }
}