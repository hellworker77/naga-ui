import {useState} from "react";

export function useRovingFocus(
    length: number,
    loop = true
) {
    const [index, setIndex] =
        useState(length)

    function moveNext() {
        if (loop) {
            setIndex((i) =>
                (i + 1) % length
            )
        } else {
            setIndex((i) =>
                Math.min(i + 1, length - 1)
            )
        }
    }

    function movePrev() {
        if (loop) {
            setIndex((i) =>
                (i - 1 + length) % length
            )
        } else {
            setIndex((i) =>
                Math.max(i -1, 0)
            )
        }
    }

    function moveFirst() {
        setIndex(0)
    }

    function moveLast() {
        setIndex(length- 1)
    }

    return {
        index,
        setIndex,
        moveNext,
        movePrev,
        moveFirst,
        moveLast,
    }
}