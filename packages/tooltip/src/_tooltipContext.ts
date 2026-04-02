import {createContext, RefObject, useContext} from "react";

interface TooltipContextValue {
    open: boolean;
    setOpen(v: boolean):void;
    
    triggerRef: RefObject<HTMLElement | null>
    contentRef: RefObject<HTMLElement | null>
}

export const TooltipContext =
    createContext<TooltipContextValue | null>(null)

export function useTooltip(){
    const ctx = useContext(TooltipContext)

    if (!ctx)
        throw new Error('useTooltip must be used within TooltipContext')

    return ctx
}