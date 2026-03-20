export function restoreCaret(
    input: HTMLInputElement,
    prev: string,
    next: string,
    prevCaret: number
) {
    const rawIndex =
        getRawBeforeCaret(prev, prevCaret)

    const nextCaret =
        findCaretFromRaw(next, rawIndex)

    requestAnimationFrame(() =>{
        input.setSelectionRange(
            nextCaret,
            nextCaret,
        )
    })
}

export function isInputChar(c: string) {
    return /[a-zA-Z0-9]/.test(c);
}

export function getRawBeforeCaret(
    value: string,
    caret: number
) {
    let count = 0

    for (let i = 0; i < caret; i++) {
        if (isInputChar(value[i]))
            count++
    }

    return count
}

export function findCaretFromRaw(
    formatted: string,
    rawIndex: number
) {
    if (rawIndex === 0) return 0

    let count = 0

    for (let i = 0; i < formatted.length; i++) {

        if (isInputChar(formatted[i])) {
            count++
        }

        if (count === rawIndex) {
            let j = i + 1

            while (
                j < formatted.length &&
                !isInputChar(formatted[j])
                ) {
                j++
            }

            return j
        }

    }

    return formatted.length
}