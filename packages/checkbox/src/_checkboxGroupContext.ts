import {createContext, useContext} from "react";

interface CheckboxGroupContextValue {
    value: string[];
    toggle: (v: string) => void;
    name?: string;
    disabled?: boolean;
}

export const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(null);

export function useCheckboxGroup() {
    return useContext(CheckboxGroupContext);
}