import {forwardRef, memo} from "react"
import {IconProps} from "../types"

const BlockedIcon = memo(
    forwardRef<SVGSVGElement, IconProps>(
        function BlockedIcon(
            {color = "currentColor", size = 16, ...props}, ref) {
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
                    <circle
                        cx="10"
                        cy="10"
                        r="12" />

                    <line
                        x1="5"
                        y1="15"
                        x2="15"
                        y2="5" />
                </svg>
            )
        }
    )
)

BlockedIcon.displayName = "BlockedIcon"

export default BlockedIcon