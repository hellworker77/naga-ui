import React, {ButtonHTMLAttributes, forwardRef} from "react";
import {useSelect} from "../_selectContext";
import {composeRefs} from "@naga-ui/core";

export const SelectTrigger = forwardRef<
    HTMLButtonElement,
    ButtonHTMLAttributes<HTMLButtonElement>
>((props, ref) => {
    const {open, setOpen, triggerRef} = useSelect();

    return (
        <button {...props}
                data-state={open? "open" : "closed"}
                ref={composeRefs(ref, triggerRef)}
                role="combobox"
                aria-expanded={open}
                aria-haspopup="listbox"
                aria-controls="select-content-id"
                aria-autocomplete="none"
                onClick={() => setOpen(!open)}>
            {props.children}
        </button>
    )
})

SelectTrigger.displayName = "SelectTrigger";