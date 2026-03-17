export function restoreCaret(
    input: HTMLInputElement,
    prev: string,
    next: string,
    caret: number
) {
    const diff =
        next.length - prev.length

    const nextCaret =
        Math.max(0, caret + diff)

    requestAnimationFrame(() => {

        input.setSelectionRange(
            nextCaret,
            nextCaret
        )

    })
}

/*
placeholder mask
lazy mask
dynamic masks
*/