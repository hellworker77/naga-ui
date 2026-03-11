import {ReactNode, useId, useRef} from "react";
import {useControllableState} from "@naga-ui/utils";
import {DialogContext} from "../_dialogContext";

export function DialogRoot({
                               children,
                               open,
                               defaultOpen,
                               onOpenChange,
                           }: {
    children: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(v: boolean): void;
}) {

    const [state, setState] = useControllableState({
        value: open,
        defaultValue: defaultOpen,
        onChange: onOpenChange,
    });

    const triggerRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    const titleId = useId();
    const descriptionId = useId();

    return (
        <DialogContext.Provider
            value={{
                open: !!state,
                setOpen: setState,

                triggerRef,
                contentRef,

                titleId,
                descriptionId,
            }}>
            {children}
        </DialogContext.Provider>
    )
}