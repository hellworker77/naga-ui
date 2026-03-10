import {ReactNode, useRef, useState} from "react";
import {SelectContext, SelectOption} from "../_selectContext";

export function SelectRoot<T>({
                                  children,
                                  value,
                                  defaultValue,
                                  onValueChange,
                              }: {
    children: ReactNode,
    value?: T | T[],
    defaultValue?: T | T[],
    onValueChange?(value: T | T[]): void
}) {
    const triggerRef = useRef<HTMLButtonElement | null>(null);

    const [internalValue, setInternalValue] = useState<T | T[] | undefined>(defaultValue)
    const selected = value ?? internalValue;

    const setValue = (v: T) => {
        if (value === undefined) {
            setInternalValue(v)
        }

        onValueChange?.(v)
    }

    const [open, setOpen] = useState(false)
    const [highlighted, setHighlighted] = useState(-1)

    const optionsRef = useRef<SelectOption<T>[]>([])
    const [, forceUpdate] = useState(0)

    function registerOption(opt: SelectOption<T>) {
        optionsRef.current.push(opt)

        optionsRef.current.sort((a, b) => {
            const aEl = a.ref.current
            const bEl = b.ref.current

            if (!aEl || !bEl) return 0;

            const pos = aEl.compareDocumentPosition(bEl)

            if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
            if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;

            return 0;
        })

        forceUpdate(v => v + 1)

        return () => {
            optionsRef.current =
                optionsRef.current.filter(o => o !== opt)

            forceUpdate(v => v + 1)
        }
    }

    return (
        <SelectContext.Provider value={{
            open,
            setOpen,
            triggerRef,

            value: selected,
            setValue,

            highlighted,
            setHighlighted,

            options: optionsRef.current,
            registerOption
        }}>
            {children}
        </SelectContext.Provider>
    )
}

SelectRoot.displayName = "SelectRoot";