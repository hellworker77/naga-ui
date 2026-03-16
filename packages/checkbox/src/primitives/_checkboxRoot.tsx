import {ButtonHTMLAttributes, forwardRef, useEffect, useRef} from "react";
import {CheckboxContext, CheckedState} from "../_checkboxContext";
import {composeRefs, useControllableState} from "@naga-ui/utils";
import {CheckboxIndicator} from "./_checkboxIndicator";

export interface Props
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "checked" | "defaultChecked" | "type"> {
    checked?: CheckedState;
    defaultChecked?: CheckedState;

    onCheckedChange?(c: CheckedState): void

    name?: string
    value?: string
    required?: boolean
}

export const CheckboxRoot = forwardRef<
    HTMLButtonElement,
    Props
>((props, forwardedRef) => {
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

    const initialCheckedRef  =
        useRef(defaultChecked);

    const [state, setState] =
        useControllableState<CheckedState>({
            value: checked,
            defaultValue: defaultChecked,
            onChange: onCheckedChange
        })

    const checkedState: CheckedState =
        state ?? false

    const buttonRef =
        useRef<HTMLButtonElement | null>(null)

    const inputRef =
        useRef<HTMLInputElement | null>(null);

    function toggle() {
        if (disabled)
            return

        setState(
            checkedState === "indeterminate"
                ? true
                : !checkedState
        );
    }

    /* ---------------- BubbleInput sync ---------------- */

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        const prevChecked = input.checked;

        input.indeterminate =
            checkedState === "indeterminate"

        input.checked =
            checkedState === true

        /* ---- THIS IS THE RADIX TRICK ---- */
        if (prevChecked !== input.checked) {
            const event = new Event("change", {
                bubbles: true
            });

            input.dispatchEvent(event)
        }

    }, [checkedState])

    useEffect(() => {

        const form
            = inputRef.current?.form

        if (!form) return

        function handleReset() {
            setState(initialCheckedRef.current)
        }

        form.addEventListener("reset", handleReset)

        return () => {
            form.removeEventListener("reset", handleReset)
        }

    }, [defaultChecked])

    const dataState =
        checkedState === "indeterminate"
            ? "indeterminate"
            : checkedState
                ? "checked"
                : "unchecked"

    return (
        <CheckboxContext.Provider value={{checked: checkedState, disabled}}>
            <button {...rest}

                    ref={composeRefs(forwardedRef, buttonRef)}

                    aria-checked={
                        checkedState === "indeterminate"
                            ? "mixed"
                            : checkedState
                    }

                    data-state={dataState}
                    data-disabled={disabled ? "" : undefined}

                    disabled={disabled}

                    onClick={toggle}

                    type={"button"}
            >
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

                    style={{
                        position: "absolute",
                        opacity: 0,
                        pointerEvents: "none",
                        margin: 0
                    }}

                    tabIndex={-1}
                />
            )}
        </CheckboxContext.Provider>
    )
})

CheckboxRoot.displayName = "Checkbox"