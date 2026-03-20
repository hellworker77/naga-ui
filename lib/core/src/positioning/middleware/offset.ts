import {Middleware} from "../types"

export function offset(value: number): Middleware {

    return (state) => {

        const base = state.side.split("-")[0]

        if (base === "bottom") state.y += value
        if (base === "top") state.y -= value
        if (base === "left") state.x -= value
        if (base === "right") state.x += value

        return state
    }

}