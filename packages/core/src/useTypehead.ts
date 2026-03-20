import {useEffect, useRef} from "react";

export function useTypehead<T>(
    options: { text?: string }[],
    highlighted: number,
    setHighlighted: (index: number) => void,
) {
    const searchRef = useRef("");
    const timerRef = useRef<number>()
    const optionsRef = useRef(options)

    useEffect(() => {
        optionsRef.current = options
    }, [options])

    return function handleTypehead(key: string) {
        if (!/^[a-z0-9]$/i.test(key)) return

        const search = (searchRef.current + key).toLowerCase();

        const list = optionsRef.current;

        let start = highlighted + 1;

        const index = list.slice(start).findIndex(
            o => o.text?.toLowerCase().startsWith(search))

        if (index !== -1) {
            setHighlighted(start + index);
        }

        searchRef.current = search;

        window.clearTimeout(timerRef.current);

        timerRef.current = window.setTimeout(() => {
            searchRef.current = ""
        }, 500)
    }
}