export type OverlayLayer = {
    id: number,
    node: HTMLElement | null,
    modal: boolean,
    onDismiss?: () => void,
}

const layers: OverlayLayer[] = []

let id = 0;
const BASE_Z = 1000;

let pointerBlocked = false;
let scrollBlocked = false;
let listenersAttached = false;

/* ---------- stack ---------- */

export function createLayer(): OverlayLayer {
    return {
        id: ++id,
        node: null,
        modal: false,
    }
}

export function registerLayer(layer: OverlayLayer) {
    layers.push(layer)
    updateGlobalState()
    ensureListeners()
}

export function unregisterLayer(layer: OverlayLayer) {
    const index = layers.indexOf(layer)

    if (index !== -1) {
        layers.splice(index, 1)
    }

    updateGlobalState()

    if (layers.length === 0) {
        removeListeners()
    }
}

export function isTopLayer(layer: OverlayLayer) {
    return layers[layers.length - 1] === layer
}

export function getLayerZIndex(layer: OverlayLayer) {
    const index = layers.indexOf(layer)
    return BASE_Z + index;
}

/* ---------- global state ---------- */

function updateGlobalState() {
    const hasModal =
        layers.some(l => l.modal)

    /* scroll lock */

    if (hasModal && !scrollBlocked) {
        document.body.style.overflow = "hidden"
        scrollBlocked = true
    }

    if (!hasModal && scrollBlocked) {
        document.body.style.overflow = ""
        scrollBlocked = false
    }
}
/* ---------- events ---------- */

function handlePointerDown(event: PointerEvent) {

    const layer = layers[layers.length - 1]
    if (!layer) return

    const node = layer.node
    if (!node) return

    if (node.contains(event.target as Node))
        return

    layer.onDismiss?.()

}

function handleEscape(event: KeyboardEvent) {
    if (event.key !== "Escape")
        return;

    const layer = layers[layers.length - 1];
    layer?.onDismiss?.();
}
/* ---------- listeners ---------- */

function ensureListeners() {

    if (listenersAttached)
        return

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleEscape)

    listenersAttached = true
}

function removeListeners() {

    document.removeEventListener("pointerdown", handlePointerDown)
    document.removeEventListener("keydown", handleEscape)

    listenersAttached = false
}