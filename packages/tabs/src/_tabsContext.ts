import {createContext, useContext} from "react";
import {ActivationMode, Orientation, TriggerItem} from "./types";

interface TabsContextValue {
    value: string | null;
    setValue(value: string): void;

    orientation: Orientation;
    activationMode: ActivationMode;

    triggers: TriggerItem[],
    registerTrigger(v: TriggerItem): () => void;
}

export const TabsContext =
    createContext<TabsContextValue | null>(null)

export function useTabs() {
    const ctx = useContext(TabsContext);

    if (!ctx)
        throw new Error("useTabs must be used within TabsContext");

    return ctx;
}