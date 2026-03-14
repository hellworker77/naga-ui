import {MutableRefObject, useRef} from "react";

export interface CollectionItem<T> {
    ref: MutableRefObject<HTMLElement | null>
    data: T
}

export function useCollection<T>() {
    const itemsRef =
        useRef<CollectionItem<T>[]>([])

    function register(
        item: CollectionItem<T>,
    ) {
        itemsRef.current.push(item)

        return () => {
            itemsRef.current =
                itemsRef.current.filter(i => i !== item)
        }
    }

    function getItems() {
        return itemsRef.current;
    }

    return {
        register,
        getItems,
    }
}