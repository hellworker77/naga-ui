import {Middleware, Side} from "../types";

export function flip(): Middleware {

    return (state) => {

        const vw = window.innerWidth
        const vh = window.innerHeight

        const { x, y, floating } = state

        const overflow =
            y < 0 ||
            y + floating.height > vh ||
            x < 0 ||
            x + floating.width > vw

        if (!overflow) return state

        const base = state.side.split("-")[0]

        const opposite = {
            top: "bottom",
            bottom: "top",
            left: "right",
            right: "left"
        }[base as "top" | "bottom" | "left" | "right"]

        return {
            ...state,
            side: opposite as Side
        }
    }
}