import {useState} from "react";

type SetState<T> =
    (value: T | ((prev: T) => T)) => void

export function useControllableState<T>({
                                            value,
                                            defaultValue,
                                            onChange,
                                        }: {
    value?: T,
    defaultValue: T
    onChange?(v: T): void
}) {
    const [internal, setInternal] = useState<T>(defaultValue)

    const controlled = value !== undefined;
    const state = controlled ? value : internal;

    const setState: SetState<T> =
        (next) => {
            const nextValue =
                typeof next === "function"
                    ? (next as (prev: T) => T)(state)
                    : next

            if (!controlled)
                setInternal(nextValue)

            if (nextValue !== state)
                onChange?.(nextValue)
        }

    return [state, setState] as const
}