import {Middleware, Side} from "../types"

export function autoPlacement(): Middleware {
    return (state) => {

        const vh = window.innerHeight

        const bottomSpace =
            vh - state.anchor.bottom
        const side: Side =
            bottomSpace >= state.floating.height
                ? "bottom"
                : "top"
        return {
            ...state,
            side
        }
    }
}