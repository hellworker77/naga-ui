import {ReactNode} from "react"

export function SelectChip({
                               children,
                               onRemove
                           }: {
    children: ReactNode
    onRemove?: () => void
}) {

    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "2px 6px",
            background: "#eee",
            borderRadius: 4,
            fontSize: 12
        }}>
            {children}
            {onRemove && (
                <span onClick={(e) => {
                    e.stopPropagation()
                    onRemove()
                }}
                       style={{
                           cursor: "pointer",
                           fontSize: 10
                       }}>
                    ✕
                </span>
            )}

        </span>
    )
}