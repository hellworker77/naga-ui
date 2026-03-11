import {cloneElement, CSSProperties, forwardRef, isValidElement} from "react";
import {ButtonProps} from "./types";
import {Spinner} from "./Spinner";

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, forwardedRef) => {

    const {
        asChild,

        startIcon,
        endIcon,

        variant = "default",
        size = "md",

        loading,
        disabled,

        slots,
        className,
        children,
        style,

        ...rest
    } = props

    const iconOnly = !children;
    const isDisabled = disabled || loading;

    const dataAttrs = {
        "data-variant": variant,
        "data-size": size,
        "data-loading": loading ? "" : undefined,
        "data-icon-only": iconOnly ? "" : undefined
    }

    const content = (
        <>
            {loading && (
                <span
                    data-slot="spinner"
                    className={slots?.spinner}
                    aria-hidden>
                    <Spinner />
                </span>
            )}

            {!loading && startIcon && (
                <span
                    data-slot="start-icon"
                    className={slots?.startIcon}
                    aria-hidden>
                    {startIcon}
                </span>
            )}

            {children && (
                <span
                    data-slot="label"
                    className={slots?.label}>
                    {children}
                </span>
            )}

            {!loading && endIcon && (
                <span
                    data-slot="end-icon"
                    className={slots?.endIcon}
                    aria-hidden>
                    {endIcon}
                </span>
            )}
        </>
    )

    const baseStyle: CSSProperties = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        ...style
    }

    if (asChild && isValidElement(children)) {
        return cloneElement(children, {
            forwardedRef,
            className: slots?.root ?? className,
            style: baseStyle,
            ...dataAttrs,
            ...rest
        })
    }

    return (
        <button {...rest}
                ref={forwardedRef}
                disabled={isDisabled}
                className={slots?.root ?? className}

                {...dataAttrs}

                style={baseStyle}>

            {content}
        </button>
    )
})

Button.displayName = "Button";