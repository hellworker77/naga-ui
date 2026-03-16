import {createContext, useContext} from "react";

export type CheckedState = boolean | "indeterminate";

interface CheckboxContextValue {
    checked: CheckedState;
    disabled?: boolean;
}

export const CheckboxContext =
    createContext<CheckboxContextValue | null>(null)

export function useCheckbox() {
    const ctx = useContext(CheckboxContext)

    if (!ctx)
        throw new Error('useCheckbox must be used within CheckboxContext')

    return ctx
}