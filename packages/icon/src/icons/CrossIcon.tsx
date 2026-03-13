import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const CrossIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function CrossIcon(
            { color = "currentColor", size = 16, ...props }, ref) {
            return (
                <svg
                    {...props}
                    ref={ref}
                    width={size}
                    height={size}
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke={color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="6" y1="6" x2="14" y2="14"/>
    <line x1="14" y1="6" x2="6" y2="14"/>
                </svg>
            )
        }
    )
)

CrossIcon.displayName = "CrossIcon"

export default CrossIcon