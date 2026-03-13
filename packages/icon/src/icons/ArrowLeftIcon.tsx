import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const ArrowLeftIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function ArrowLeftIcon(
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
                    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 17 5 12 12 7"/>
                </svg>
            )
        }
    )
)

ArrowLeftIcon.displayName = "ArrowLeftIcon"

export default ArrowLeftIcon