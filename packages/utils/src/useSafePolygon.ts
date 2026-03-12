import {useEffect, useRef} from "react";

type Point = {x: number, y: number}
type Points = Point[];

const SPEED_THRESHOLD = 20;

export function useSafePolygon(buffer = 8) {
    const cursorRef = useRef<Point>({x: 0, y: 0});
    const prevCursorRef = useRef<Point>({x: 0, y: 0});

    useEffect(() => {
        function onPointerMove(e: PointerEvent) {
            prevCursorRef.current = cursorRef.current;

            cursorRef.current = {
                x: e.clientX,
                y: e.clientY,
            }
        }

        window.addEventListener("pointermove", onPointerMove);

        return () => {
            window.removeEventListener("pointermove", onPointerMove);
        }
    },[])

    function getDirection(): Point {
        return {
            x: cursorRef.current.x - prevCursorRef.current.x,
            y: cursorRef.current.y - prevCursorRef.current.y
        }
    }

    function isMovingTowardsTooltip(
        trigger: DOMRect,
        tooltip: DOMRect
    ) {
        const cursor = cursorRef.current;
        const direction = getDirection();

        const polygon =
            buildPolygon(trigger, tooltip, buffer)

        const inside =
            pointInPolygon(cursor, polygon);

        /* ---------- cursor speed ---------- */
        const speed =
            Math.abs(direction.x) +
            Math.abs(direction.y)

        if (speed > SPEED_THRESHOLD)
            return false;

        /* ---------- direction ---------- */
        const movingRight = direction.x > 0;
        const movingLeft = direction.x < 0;
        const movingDown = direction.y > 0;
        const movingUp = direction.y < 0;

        const towardsTooltip =
            (movingRight && tooltip.left >= trigger.right) ||
            (movingLeft && tooltip.right <= trigger.left) ||
            (movingDown && tooltip.top >= trigger.bottom) ||
            (movingUp && tooltip.bottom <= trigger.top);

        return inside && towardsTooltip;
    }

    function isMovingToTooltip(
        trigger: DOMRect,
        tooltip: DOMRect,
    ) {
        const p = cursorRef.current;

        const polygon = [

            {x: trigger.right, y: trigger.top},
            {x: trigger.right, y: trigger.bottom},

            {x: tooltip.left, y: tooltip.bottom},
            {x: tooltip.left, y: tooltip.top}

        ]

        return pointInPolygon(p, polygon)
    }

    return {isMovingToTooltip};
}

export function pointInPolygon(
    point: Point,
    polygon: Points
) {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x;
        const yi = polygon[i].y;

        const xj = polygon[j].x;
        const yj = polygon[j].y;

        const intersect =
            yi > point.y !== yj > point.y &&
            point.x <
            ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
    }

    return inside;
}

function buildPolygon(
    trigger: DOMRect,
    tooltip: DOMRect,
    buffer: number
) {
    return [
        {
            x: trigger.left - buffer,
            y: trigger.top - buffer
        },

        {
            x: trigger.right + buffer,
            y: trigger.top - buffer
        },

        {
            x: tooltip.right + buffer,
            y: tooltip.bottom + buffer
        },

        {
            x: tooltip.left - buffer,
            y: tooltip.bottom + buffer
        }
    ]
}