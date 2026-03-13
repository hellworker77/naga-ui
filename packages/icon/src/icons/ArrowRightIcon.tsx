import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const ArrowRightIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function ArrowRightIcon(
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
                    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 7 19 12 12 17"/>
                </svg>
            )
        }
    )
)

ArrowRightIcon.displayName = "ArrowRightIcon"

export default ArrowRightIcon