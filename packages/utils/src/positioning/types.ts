export type Side =
    | "top"
    | "bottom"
    | "left"
    | "right"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"

export interface Rect {
    width: number
    height: number
}

export interface MiddlewareState {
    x: number
    y: number
    side: Side
    anchor: DOMRect
    floating: Rect
}

export type Middleware = (
    state: MiddlewareState
) => MiddlewareState