import {CSSProperties, ReactNode} from "react"

import {SelectRoot} from "./primitives/_selectRoot"
import {SelectTrigger} from "./primitives/_selectTrigger"
import {SelectContent} from "./primitives/_selectContent"
import {SelectItem} from "./primitives/_selectItem"
import {SelectValue} from "./_selectValue";

interface SelectSlots {
    slots?: {
        trigger?: string
        content?: string
        item?: string
    }
}

interface BaseSelectProps<T> extends SelectSlots {

    options: {
        value: T
        label: ReactNode
        disabled?: boolean
    }[]

    className?: string
    style?: CSSProperties
    disabled?: boolean
}

type SingleSelectProps<T> = BaseSelectProps<T> & {
    multi?: false,
    value?: T,
    defaultValue?: T,
    onChange?(v: T): void,
}

type MultiSelectProps<T> = BaseSelectProps<T> & {
    multi: true,
    value?: T[],
    defaultValue?: T[],
    onChange?(v: T[]): void,
}

type SelectProps<T> =
    | SingleSelectProps<T>
    | MultiSelectProps<T>

export function Select<T>(props: SelectProps<T>) {

    const {
        options,
        className,
        style,
        disabled,

    } = props

    const {slots} = props

    const multi = props.multi === true;

    return (

        <SelectRoot value={props.value}
                    defaultValue={props.defaultValue}
                    onValueChange={props.onChange}>

            <SelectTrigger disabled={disabled}
                           style={style}
                           className={[className, slots?.trigger].filter(Boolean).join(" ")}>

                <SelectValue options={options}
                             multi={multi}
                             onRemove={(v) => {
                                 if (!Array.isArray(props.value)) return
                                 if (props.multi && Array.isArray(props.value)) {
                                     props.onChange?.(
                                         props.value.filter(x => x !== v)
                                     )
                                 }
                             }}
                />

            </SelectTrigger>

            <SelectContent className={slots?.content}>

                {options.map(o => (

                    <SelectItem className={slots?.item}
                                key={String(o.value)}
                                value={o.value}
                                disabled={o.disabled}>

                        {o.label}

                    </SelectItem>

                ))}

            </SelectContent>

        </SelectRoot>
    )
}