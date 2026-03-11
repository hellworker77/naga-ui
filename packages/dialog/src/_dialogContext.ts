import {createContext, RefObject, useContext} from "react";

interface DialogContextValue {
    open: boolean;
    setOpen: (v: boolean) => void;

    triggerRef: RefObject<HTMLElement | null>;
    contentRef: RefObject<HTMLElement | null>;
}

export const DialogContext =
    createContext<DialogContextValue | null>(null);

export function useDialog() {
    const ctx = useContext(DialogContext);

    if (!ctx)
        throw new Error("Dialog components must be used inside DialogRoot")

    return ctx;
}