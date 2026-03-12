import {createContext, MutableRefObject, ReactNode, useContext, useRef} from "react";

interface TooltipProviderValue {
    delayDuration: number;
    skipDelayDuration: number;
    isInstantRef: MutableRefObject<boolean | null>;
    openTimerRef: MutableRefObject<number | null>;
}

const TooltipProviderContext = createContext<TooltipProviderValue | null>(null);

export function useTooltipProvider() {
    const ctx = useContext(TooltipProviderContext);

    if (!ctx)
        throw new Error("useTooltipProvider must be used within TooltipProvider");

    return ctx;
}

export function TooltipProvider({

                                    children,
                                    delayDuration = 400,
                                    skipDelayDuration = 300,

                                }: {
    children: ReactNode;
    delayDuration?: number;
    skipDelayDuration?: number;
}) {
    const isInstantRef = useRef<boolean | null>(null);
    const openTimerRef = useRef<number | null>(null);

    return (
        <TooltipProviderContext.Provider
            value={{
                delayDuration,
                skipDelayDuration,
                isInstantRef,
                openTimerRef
            }}>
            {children}
        </TooltipProviderContext.Provider>
    )
}