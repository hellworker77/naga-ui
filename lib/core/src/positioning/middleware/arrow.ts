import {Middleware} from "../types";

export function arrow(arrowSize = 8): Middleware {

    return (state) => {

        const base = state.side.split("-")[0]
        
        if (base === "top") state.y -= arrowSize;

        if (base === "bottom") state.y += arrowSize;

        if (base === "left") state.x -= arrowSize;

        if (base === "right") state.x += arrowSize;

        return state
    }

}