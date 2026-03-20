import {Middleware, MiddlewareState, Rect, Side} from "./types";
import {basePlacement} from "./basePlacement";

export function computePosition(
    anchor: DOMRect,
    floating: Rect,
    middleware: Middleware[] = [],
    side: Side = "bottom"
) {

    let state: MiddlewareState = {
        x: 0,
        y: 0,
        side,
        anchor,
        floating
    }

    state = basePlacement(state)

    for (const fn of middleware) {
        const next = fn(state)

        if (next.side !== state.side){
            state = basePlacement(next)
        }else {
            state = next
        }
    }

    return {
        top: 0,
        left: 0,
        transform: `translate3d(${state.x}px, ${state.y}px, 0)`
    }
}