import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const ArrowUpIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function ArrowUpIcon(
            { color = "currentColor", size = 16, ...props }, ref) {
            return (
                <svg
                    {...props}
                    ref={ref}
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="12" y1="19" x2="12" y2="5"/>
    <polyline points="7 12 12 5 17 12"/>
                </svg>
            )
        }
    )
)

ArrowUpIcon.displayName = "ArrowUpIcon"

export default ArrowUpIcon