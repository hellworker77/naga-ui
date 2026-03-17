import {createContext, useContext} from "react";

interface SwitchContextValue {
    checked?: boolean;
    disabled?: boolean;
}

export const SwitchContext =
    createContext<SwitchContextValue | null>(null);

export function useSwitch(){
    const ctx = useContext(SwitchContext);

    if (!ctx)
        throw new Error("useSwitch must be used within SwitchContext");

    return ctx;
}