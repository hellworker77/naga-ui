export type Overlay = {
    id: number;
    zIndex: number;
}

const stack: Overlay[] = []

let id = 0
const BASE_Z_INDEX = 1000

/**
 * @deprecated Use new OverlayEngine
 */
export function pushOverlay() {
    const overlay: Overlay = {
        id: ++id,
        zIndex: BASE_Z_INDEX + stack.length,
    }

    stack.push(overlay)

    return overlay;
}

/**
 * @deprecated Use new OverlayEngine
 */
export function removeOverlay(overlay: Overlay) {
    const index= stack.indexOf(overlay)

    if (index !== -1) {
        stack.splice(index, 1)
    }
}

/**
 * @deprecated Use new OverlayEngine
 */
export function isTopOverlay(overlay: Overlay) {
    return stack[stack.length - 1] === overlay
}

/**
 * @deprecated Use new OverlayEngine
 */
export function getOverlayZIndex(overlay: Overlay) {
    return overlay.zIndex
}