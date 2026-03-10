import {useState} from "react";

export function useControllableState<T>({
                                            value,
                                            defaultValue,
                                            onChange,
                                        }: {
    value?: T,
    defaultValue?: T
    onChange?(v: T): void
}) {
    const [internal, setInternal] = useState(defaultValue)

    const controlled = value !== undefined;
    const state = controlled ? value : internal;

    function setState(v: T) {
        if (!controlled)
            setInternal(v)

        onChange?.(v)
    }

    return [state, setState] as const
}