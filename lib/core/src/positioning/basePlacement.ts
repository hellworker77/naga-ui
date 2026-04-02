import {MiddlewareState} from "./types"

export function basePlacement(state: MiddlewareState): MiddlewareState {

    const {anchor, floating, side} = state

    const base = side.split("-")[0]
    const align = side.split("-")[1]

    let x = 0
    let y = 0

    switch (base) {

        case "bottom":
            y = anchor.bottom
            break

        case "top":
            y = anchor.top - floating.height
            break

        case "left":
            x = anchor.left - floating.width
            break

        case "right":
            x = anchor.right
            break
    }

    if (base === "top" || base === "bottom") {

        if (align === "start") x = anchor.left
        else if (align === "end") x = anchor.right - floating.width
        else x = anchor.left + (anchor.width - floating.width) / 2

    } else {

        if (align === "start") y = anchor.top
        else if (align === "end") y = anchor.bottom - floating.height
        else y = anchor.top + (anchor.height - floating.height) / 2

    }

    return {...state, x, y}
}