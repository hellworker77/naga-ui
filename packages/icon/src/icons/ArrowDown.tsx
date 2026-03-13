import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const ArrowDownIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function ArrowDownIcon(
            { color = "currentColor", ...props },
            ref
        ) {
            return (
                <svg
                    {...props}
                    ref={ref}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"

                    width="1em"
                    height="1em"

                    fill="none"
                    stroke={color}

                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <polyline points="17 12 12 19 7 12" />
                </svg>
            )
        }
    )
)

ArrowDownIcon.displayName = "ArrowDownIcon"

export default ArrowDownIcon