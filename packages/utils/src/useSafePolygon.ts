import {useEffect, useRef} from "react";

export function pointInPolygon(
    point: { x: number, y: number },
    polygon: { x: number, y: number }[]
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

export function useSafePolygon() {
    const cursorRef = useRef({x: 0, y: 0});

    useEffect(() => {
        function onPointerMove(e: PointerEvent) {
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

