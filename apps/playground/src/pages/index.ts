import SelectDemo from "./SelectDemo/SelectDemo"
import ButtonDemo from "./ButtonDemo/ButtonDemo"
import PopoverDemo from "./PopoverDemo/PopoverDemo"

export const pages = {
    select: SelectDemo,
    button: ButtonDemo,
    popover: PopoverDemo
} as const

export type PageId = keyof typeof pages