import {ReactNode, useRef, useState} from "react";
import {ActivationMode, Orientation, TriggerItem} from "../types";
import {useControllableState} from "@naga-ui/core";
import {TabsContext} from "../_tabsContext";

export interface TabsRootProps {
    children?: ReactNode,
    value?: string,
    defaultValue?: string,
    onValueChange?(value: string): void,
    orientation?: Orientation,
    activationMode?: ActivationMode
}

export function TabsRoot({
                             children,
                             value,
                             defaultValue,
                             onValueChange,
                             orientation = "horizontal",
                             activationMode = "automatic"
                         }: TabsRootProps) {
    const [state, setState] = useControllableState({
        value,
        defaultValue,
        onChange: onValueChange,
    })

    const triggerRef = useRef<TriggerItem[]>([]);
    const [,force] = useState(0);

    function registerTrigger(item: TriggerItem) {
        triggerRef.current.push(item);
        force(v => v + 1)

        return () => {
            triggerRef.current =
                triggerRef.current.filter(x => x !== item);

            force(v => v + 1);
        }
    }

    return (
        <TabsContext.Provider
            value={{
                value: state ?? null,
                setValue: setState,

                orientation,
                activationMode,

                triggers: triggerRef.current,
                registerTrigger,
            }}>
            {children}
        </TabsContext.Provider>
    )
}