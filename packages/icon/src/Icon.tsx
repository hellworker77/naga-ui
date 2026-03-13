import {IconComponent, IconProps} from "./types";
import {IconName, iconRegistry} from "./iconRegistry";
import {ComponentType, forwardRef, useEffect, useState} from "react";
import {getCachedIcon, setCachedIcon} from "./cache";

interface Props extends IconProps {
    name: IconName
}

export const Icon = forwardRef<SVGSVGElement, Props>(
    ({name, size = 16, color = "currentColor", ...props}, ref) => {

        const [Component, setComponent] =
            useState<IconComponent | null>(() =>
                getCachedIcon(name) ?? null)

        useEffect(() => {
            if (Component) return

            const loader = iconRegistry[name]

            loader().then((mod) => {
                const IconComponent = mod.default;
                setCachedIcon(name, IconComponent)
                setComponent(() => IconComponent)
            })
        }, [name])

        if (!Component) return

        return (
            <Component
                ref={ref}
                width={size}
                height={size}
                color={color}
                {...props} />
        )
    }
)