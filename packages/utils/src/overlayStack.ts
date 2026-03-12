export type Overlay = {
    id: number;
    zIndex: number;
}

const stack: Overlay[] = []

let id = 0
const BASE_Z_INDEX = 1000

export function pushOverlay() {
    const overlay: Overlay = {
        id: ++id,
        zIndex: BASE_Z_INDEX + stack.length,
    }

    stack.push(overlay)

    return overlay;
}

export function removeOverlay(overlay: Overlay) {
    const index= stack.indexOf(overlay)

    if (index !== -1) {
        stack.splice(index, 1)
    }
}

export function isTopOverlay(overlay: Overlay) {
    return stack[stack.length - 1] === overlay
}

export function getOverlayZIndex(overlay: Overlay) {
    return overlay.zIndex
}