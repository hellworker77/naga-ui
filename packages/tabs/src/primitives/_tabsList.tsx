import {forwardRef, HTMLAttributes} from "react";
import {useTabs} from "../_tabsContext";

export const TabsList = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement>
>((props, ref) => {
    const {orientation} = useTabs();

    return (
        <div
            {...props}
            ref={ref}

            role="tablist"
            aria-orientation={orientation} />

    )
})

TabsList.displayName = "TabsList";