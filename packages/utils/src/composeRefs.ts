import {MutableRefObject, Ref} from "react";

export function composeRefs<T>(...refs: Ref<T>[]) {
    return (node: T) => {
        refs.forEach(ref => {
            if (!ref) return;

            if (typeof ref === "function") {
                ref(node);
            }else {
                ;(ref as MutableRefObject<T | null>).current = node;
            }
        })
    }
}