import {createContext, RefObject, useContext} from "react";

interface PopoverContextValue {
    open: boolean;
    setOpen(v: boolean):void;

    triggerRef: RefObject<HTMLElement | null>;
    contentRef: RefObject<HTMLElement | null>;
}

export const PopoverContext =
    createContext<PopoverContextValue | null>(null)

export function usePopover() {
    const ctx = useContext(PopoverContext)

    if (!ctx)
        throw new Error("usePopover must be used within PopoverContext")

    return ctx
}