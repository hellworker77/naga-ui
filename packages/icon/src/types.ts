import {ComponentType, ForwardRefExoticComponent, MemoExoticComponent, RefAttributes, SVGProps} from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: number;
    color?: string;
}

export type IconComponent = MemoExoticComponent<
    ForwardRefExoticComponent<
        IconProps & RefAttributes<SVGSVGElement>
    >
>;

export type IconLoader = () => Promise<{
    default: IconComponent;
}>