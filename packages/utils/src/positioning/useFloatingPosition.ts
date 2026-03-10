import {RefObject, useLayoutEffect, useState} from "react"
import {computePosition} from "./computePosition"
import {autoUpdate} from "./autoUpdate"
import {Middleware, Side} from "./types"

interface Options {
    open: boolean
    anchorRef: RefObject<HTMLElement | null>
    floatingRef: RefObject<HTMLElement | null>
    side?: Side
    middleware?: Middleware[]
}

export function useFloatingPosition({
                                        open,
                                        anchorRef,
                                        floatingRef,
                                        side,
                                        middleware = []
                                    }: Options) {

    const [style, setStyle] = useState({})

    useLayoutEffect(() => {

        if (!open || !anchorRef.current || !floatingRef.current) return

        const update = () => {

            const anchorRect =
                anchorRef.current!.getBoundingClientRect()

            const floatingEl = floatingRef.current!

            const floatingRect = {
                width: floatingEl.offsetWidth || floatingEl.clientWidth,
                height: floatingEl.offsetHeight || floatingEl.clientHeight
            }

            if (!floatingRect.width || !floatingRect.height) return

            const pos = computePosition(
                anchorRect,
                floatingRect,
                middleware,
                side
            )

            setStyle(pos)
        }

        const cleanup =
            autoUpdate(anchorRef.current, floatingRef.current, update)

        update()

        return cleanup

    }, [open])

    return style
}