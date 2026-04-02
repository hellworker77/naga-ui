import {ButtonHTMLAttributes, ReactNode} from "react";

export type ButtonVariant =
    | "default"
    | "ghost"
    | "outline"

export type ButtonSize =
    | "xm"
    | "sm"
    | "md"
    | "lg"
    | "xl"

export interface ButtonSlots {
    root?: string
    startIcon?: string
    endIcon?: string
    label?: string
    spinner?: string
}

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {

    asChild?: boolean;

    startIcon?: ReactNode;
    endIcon?: ReactNode;

    variant?: ButtonVariant;
    size?: ButtonSize;

    loading?: boolean;

    slots?: ButtonSlots;
}