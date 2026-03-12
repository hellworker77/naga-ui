export type Overlay = {
    id: number;
}

const stack: Overlay[] = []

let id = 0

export function pushOverlay() {
    const overlay = {id: ++id}

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