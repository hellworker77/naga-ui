import {forwardRef, HTMLAttributes} from "react";
import {useDialog} from "../_dialogContext";
import {composeRefs} from "@naga-ui/utils";

export const DialogTrigger = forwardRef<
    HTMLButtonElement,
    HTMLAttributes<HTMLButtonElement>
>((props, ref) => {
    const {open, setOpen, triggerRef} = useDialog();

    return (
        <button {...props}
            ref={composeRefs(ref, triggerRef)}

            data-state={open? "open" : "closed"}

            aria-haspopup="dialog"
            aria-expanded={open}

            onClick={() => setOpen(!open)}
        />
    )
})

DialogTrigger.displayName = "DialogTrigger";