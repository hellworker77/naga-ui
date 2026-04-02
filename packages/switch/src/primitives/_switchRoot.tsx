import {ButtonHTMLAttributes, forwardRef, useEffect, useRef} from "react";
import {useControllableState} from "@naga-ui/core";
import {SwitchContext} from "../_switchContext";

export interface Props
    extends Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "checked" | "defaultChecked" | "type"
    > {

    checked?: boolean
    defaultChecked?: boolean

    onCheckedChange?(v: boolean): void

    name?: string
    value?: string
    required?: boolean
}

export const SwitchRoot = forwardRef<
    HTMLButtonElement,
    Props
>((props, ref) => {
    const {
        checked,
        defaultChecked = false,
        onCheckedChange,

        name,
        value = "on",
        required,

        disabled,
        children,
        ...rest
    } = props

    const [state, setState] =
        useControllableState<boolean>({
            value: checked,
            defaultValue: defaultChecked,
            onChange: onCheckedChange
        });

    const checkedState = state ?? false;

    const inputRef =
        useRef<HTMLInputElement | null>(null)

    function toggle() {
        if (disabled) return;

        setState(!checkedState);
    }

    useEffect(() => {
        const input = inputRef.current
        if (!input) return

        const prevChecked = input.checked;

        if (prevChecked !== input.checked) {
            const event =
                new Event("change", {
                    bubbles: true
                })
            input.dispatchEvent(event)
        }
    }, [checkedState])

    const dataState =
        checkedState
            ? "checked"
            : "unchecked"

    return (
        <SwitchContext.Provider
            value={{
                checked: checkedState,
                disabled
            }}>
            <button
                {...rest}

                ref={ref}

                type="button"

                role="switch"

                aria-checked={checkedState}

                data-state={dataState}
                data-disable={
                    disabled ? "" : undefined
                }

                disabled={disabled}

                onClick={toggle}>

                {children}
            </button>

            {name && (
                <input
                ref={inputRef}

                type="checkbox"

                name={name}
                value={value}

                required={required}
                disabled={disabled}

                tabIndex={-1}

                style={{
                    position: "absolute",
                    opacity: 0,
                    pointerEvents: "none"
                }}
                />
            )}
        </SwitchContext.Provider>
    )
})

SwitchRoot.displayName = "Switch"