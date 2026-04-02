import {forwardRef, HTMLAttributes} from "react";
import {usePopover} from "../_popoverContext";
import {composeRefs} from "@naga-ui/core";

export const PopoverTrigger = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>((props, ref) => {

    const {open, setOpen, triggerRef} = usePopover()

    return (
        <button {...props}
             ref={composeRefs(ref, triggerRef)}

             aria-haspopup="dialog"
             aria-expanded={open}

             data-state={open ? "open" : "closed"}

             onClick={() => setOpen(!open)} />
    )
})

PopoverTrigger.displayName = "PopoverTrigger"