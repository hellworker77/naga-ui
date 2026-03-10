import {Middleware} from "../types"

export function limitShift(limit = 20): Middleware {

    return (state) => {

        const vw = window.innerWidth
        const vh = window.innerHeight

        if (state.x + state.floating.width > vw - limit)
            state.x = vw - state.floating.width - limit

        if (state.y + state.floating.height > vh - limit)
            state.y = vh - state.floating.height - limit

        return state
    }

}