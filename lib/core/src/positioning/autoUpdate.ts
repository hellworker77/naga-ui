type Cleanup = () => void;

export function autoUpdate(
    anchor: HTMLElement,
    floating: HTMLElement,
    update: () => void
): Cleanup {

    const resizeObserver = new ResizeObserver(update)

    resizeObserver.observe(anchor)
    resizeObserver.observe(floating)

    window.addEventListener("scroll", update, true)
    window.addEventListener("resize", update)

    update()

    return () => {
        resizeObserver.disconnect()

        window.removeEventListener("scroll", update, true)
        window.removeEventListener("resize", update)
    }
}