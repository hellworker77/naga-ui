import {forwardRef, HTMLAttributes} from "react";
import {useControllableState} from "@naga-ui/utils";
import {CheckboxGroupContext} from "../_checkboxGroupContext";

export interface CheckboxGroupProps
    extends HTMLAttributes<HTMLDivElement> {

    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;

    name?: string;
    disabled?: boolean;
}

export const CheckboxGroup = forwardRef<
    HTMLDivElement,
    CheckboxGroupProps
>((props, ref) => {
    const {
        value,
        defaultValue = [],
        onValueChange,
        name,
        disabled,
        children,
        ...rest
    } = props

    const [state, setState] = useControllableState<string[]>({
        value,
        defaultValue,
        onChange: onValueChange
    })

    function toggle(v: string) {
        setState(prev => {

            if (prev.includes(v)) {
                return prev.filter(i => i !== v);
            }

            return [...prev, v];
        });
    }

    return (
        <CheckboxGroupContext.Provider
            value={{
                value: state,
                toggle,
                name,
                disabled
            }}
        >
            <div
                {...rest}
                ref={ref}
                role="group">
                {children}
            </div>
        </CheckboxGroupContext.Provider>
    )
});

CheckboxGroup.displayName = "CheckboxGroup";