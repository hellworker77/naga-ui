import {ReactNode} from "react"
import {SelectChip} from "./_selectChip"
import {useSelect} from "./_selectContext";

export function SelectValue<T>({
                                   options,
                                   multi,
                                   onRemove
                               }: {
    options: { value: T; label: ReactNode }[]
    multi?: boolean,
    onRemove?(v: T): void
}) {

    const {value} = useSelect();

    if (value == null) {
        return <>Select...</>
    }
    if (multi && Array.isArray(value)) {
        const selected = options.filter(o =>
            value.includes(o.value)
        )
        return (
            <div style={{
                display: "flex",
                gap: 4,
                flexWrap: "wrap"
            }}>

                {selected.map(o => (

                    <SelectChip key={String(o.value)}
                                onRemove={() => onRemove?.(o.value)}>
                        {o.label}
                    </SelectChip>
                ))}
            </div>
        )
    }

    const selected = options.find(o => o.value === value)

    return <>{selected?.label}</>
}