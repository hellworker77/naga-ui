import {RefObject, useEffect, useRef} from "react";
import {createLayer, getLayerZIndex, isTopLayer, OverlayLayer, registerLayer, unregisterLayer} from "./overlayEngine";

export function useOverlayLayer({
    open,
    ref,
    onDismiss,
    modal = false
                                }: {
    open: boolean,
    ref: RefObject<HTMLElement | null>,
    onDismiss?: () => void,
    modal?: boolean
}) {
    const layerRef =
        useRef<OverlayLayer | null>(null)

    useEffect(() => {
        if (!open) return;

        const layer = createLayer()

        layer.node = ref.current
        layer.modal = modal
        layer.onDismiss = onDismiss

        layerRef.current = layer
        registerLayer(layer)

        return () => {
            unregisterLayer(layer);
        }
    }, [open])

    function isTop() {
        const layer = layerRef.current
        if (!layer) return false

        return isTopLayer(layer)
    }

    function getZIndex() {
        const layer = layerRef.current
        if (!layer) return 0

        return getLayerZIndex(layer)
    }

    return {isTop, getZIndex}
}