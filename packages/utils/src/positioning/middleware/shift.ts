import {Middleware} from "../types"

export function shift(padding = 8): Middleware {

    return (state) => {

        const vw = window.innerWidth
        const vh = window.innerHeight

        let {x, y} = state

        if (x < padding) x = padding
        if (x + state.floating.width > vw - padding)
            x = vw - state.floating.width - padding

        if (y < padding) y = padding
        if (y + state.floating.height > vh - padding)
            y = vh - state.floating.height - padding

        return {...state, x, y}

    }

}