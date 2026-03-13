import { forwardRef, memo } from "react"
import { IconProps } from "../types"

const UpIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function UpIcon(
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
                    <path
            d="M14.77 12.79a.75.75 0 01-1.06-.02L10 9.061 6.29 12.77a.75.75 0 11-1.06-1.06l4.24-4.25a.75.75 0 011.06 0l4.24 4.25a.75.75 0 01-.02 1.06z"
    />
                </svg>
            )
        }
    )
)

UpIcon.displayName = "UpIcon"

export default UpIcon