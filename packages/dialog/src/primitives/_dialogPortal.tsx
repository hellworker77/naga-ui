import {ReactNode} from "react";
import {createPortal} from "react-dom";

export function DialogPortal({children}: {children: ReactNode}) {
    return createPortal(children, document.body);
}