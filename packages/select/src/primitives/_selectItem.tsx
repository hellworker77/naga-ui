import {forwardRef, ReactNode, useEffect, useRef} from "react";
import {useSelect} from "../_selectContext";
import {composeRefs} from "@naga-ui/utils";

export const SelectItem = forwardRef<
    HTMLDivElement,
    {
        value: any,
        className?: string,
        disabled?: boolean,
        children: ReactNode,
    }
>((props, ref) => {
    const {value, disabled, children} = props;

    const {
        value: valueState,
        setValue,
        setOpen,
        highlighted,
        setHighlighted,
        options,
        registerOption
    } = useSelect()

    const localRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        return registerOption({
            value,
            ref: localRef,
            disabled
        })
    }, [value, disabled, registerOption]);

    const index = options.findIndex(o => o.value === value)
    const highlightedState = highlighted === index

    useEffect(() => {
        if(!highlightedState) return;

        localRef.current?.scrollIntoView({
            block: "nearest"
        })
    }, [highlightedState]);

    const selected =
        Array.isArray(valueState)
            ? valueState.includes(value)
            : valueState === value

    function handleSelect() {
        if (disabled) return;

        if (Array.isArray(valueState)) {
            const exists = valueState.includes(value)

            setValue(exists?
            valueState.filter(v => v !== value):
            [...valueState, value])
        }else {
            setValue(value)
            setOpen(false)
        }
    }

    return (
        <div ref={composeRefs(localRef, ref)}
             role="option"
             data-highlighted={highlightedState? "": undefined}
             data-selected={selected? "": undefined}

             aria-selected={selected}
             tabIndex={-1}

             onMouseEnter={() => setHighlighted(index)}

             onClick={handleSelect}
             className={props.className}
             style={{
                 padding: 8,
                 background:highlightedState ? "#eee" : undefined,
                 cursor: disabled? "not-allowed": "pointer",
                 opacity: disabled? 0.5: 1,
                 display: "flex",
                 alignItems: "center",
                 gap: 8
             }}>

            {children}

            <tspan style={{
                marginLeft: "auto",
                opacity: selected? 1: 0,
            }}>
                ✓
            </tspan>
        </div>
    )
})

SelectItem.displayName = "SelectItem";