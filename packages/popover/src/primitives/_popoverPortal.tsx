import {ReactNode} from "react";
import {createPortal} from "react-dom";

export function PopoverPortal({children}: { children: ReactNode; }) {
    return createPortal(children, document.body);
}