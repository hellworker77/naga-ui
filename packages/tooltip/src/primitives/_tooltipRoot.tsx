import {ReactNode, useRef} from "react";
import {useControllableState} from "@naga-ui/core";
import {TooltipContext} from "../_tooltipContext";

export function TooltipRoot({children, open, defaultOpen, onOpenChange}: {
    children: ReactNode,
    open?: boolean,
    defaultOpen?: boolean,
    onOpenChange?(v: boolean): void
}) {
    const [state, setState] = useControllableState({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    })

    const triggerRef = useRef<HTMLElement | null>(null)
    const contentRef = useRef<HTMLElement | null>(null)

    return (
        <TooltipContext.Provider value={{
            open: !!state,
            setOpen: setState,

            triggerRef,
            contentRef
        }}>
            {children}
        </TooltipContext.Provider>
    )
}