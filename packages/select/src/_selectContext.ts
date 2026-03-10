import {createContext, RefObject, useContext} from "react";

export type SelectOption<T> = {
    value: T;
    ref: RefObject<HTMLDivElement | null>;
    disabled?: boolean;
}

export interface SelectContextValue<T> {
    open: boolean,
    setOpen(v:T):void,

    value?:T | T[]
    setValue(v:T | T[]):void,

    highlighted: number,
    setHighlighted(i: number):void,

    options: SelectOption<T>[],

    registerOption(opt:SelectOption<T>):void,

    triggerRef: RefObject<HTMLButtonElement | null>,
}

export const SelectContext
    = createContext<SelectContextValue<any> | null>(null)

export function useSelect(){
    const ctx= useContext(SelectContext)

    if (!ctx) {
        throw new Error("Select primitives must be inside <SelectRoot>")
    }

    return ctx;
}