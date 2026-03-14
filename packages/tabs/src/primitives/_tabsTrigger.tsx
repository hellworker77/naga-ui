import {ButtonHTMLAttributes, forwardRef, useEffect, useRef} from "react";
import {useTabs} from "../_tabsContext";
import {composeRefs, useTypehead} from "@naga-ui/utils";

export interface Props
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

export const TabsTrigger = forwardRef<
    HTMLButtonElement,
    Props
>((props, ref) => {

    const {value, children, ...rest} = props

    const {
        value: active,
        setValue,
        triggers,
        registerTrigger,
        orientation,
        activationMode
    } = useTabs()

    const localRef =
        useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        return registerTrigger({
            value,
            ref: localRef,
            text: typeof children === "string"
                ? children
                : undefined
        })
    }, [])

    const selected = active === value;

    const index =
        triggers.findIndex(t => t.value === value)

    const typeahead =
        useTypehead(
            triggers,
            index,
            (i) => {
                const next = triggers[i]
                if(!next) return

                next.ref.current?.focus()

                if (activationMode === "automatic")
                    setValue(next.value)
            }
        )

    function move(nextIndex: number) {
        const length = triggers.length;

        const loopIndex =
            (nextIndex + length) % length;

        const item = triggers[loopIndex];

        if (!item) return;

        item.ref.current?.focus()

        if (activationMode === "automatic") {
            setValue(item.value)
        }
    }

    function onKeyDown(e: React.KeyboardEvent) {

        if (orientation === "horizontal") {

            if (e.key === "ArrowRight") {
                e.preventDefault()
                move(index + 1)
            }

            if (e.key === "ArrowLeft") {
                e.preventDefault()
                move(index - 1)
            }

        }

        if (orientation === "vertical") {

            if (e.key === "ArrowDown") {
                e.preventDefault()
                move(index + 1)
            }

            if (e.key === "ArrowUp") {
                e.preventDefault()
                move(index - 1)
            }

        }

        if (e.key === "Home") {
            move(0)
        }

        if (e.key === "End") {
            move(triggers.length - 1)
        }

        if (
            activationMode === "manual"
            && (e.key === "Enter" || e.key === " ")
        ) {
            setValue(value)
        }

        typeahead(e.key)

    }

    return (
        <button
            {...rest}
            ref={composeRefs(ref, localRef)}

            role="tab"
            aria-selected={selected}

            tabIndex={selected ? 0 : -1}

            data-state={selected ? "active" : "inactive"}

            onClick={() => setValue(value)}

            onKeyDown={onKeyDown}>
            {children}
        </button>
    )
})

TabsTrigger.displayName = "TabsTrigger"
