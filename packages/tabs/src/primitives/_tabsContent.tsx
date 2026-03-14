import {forwardRef, HTMLAttributes} from "react";
import {useTabs} from "../_tabsContext";

export interface Props
    extends HTMLAttributes<HTMLDivElement> {
    value: string
}

export const TabsContent = forwardRef<
    HTMLDivElement,
    Props
>((props, ref) => {
    const {value, children, ...rest} = props

    const {value: active} = useTabs();

    if (active !== value)
        return null;

    return (
        <div
            {...rest}
            ref={ref}

            role="tabpanel"
            data-state="active">
            {children}
        </div>
    )
})

TabsContent.displayName = "TabsContent"