import SelectDemo from "./SelectDemo/SelectDemo"
import ButtonDemo from "./ButtonDemo/ButtonDemo"
import PopoverDemo from "./PopoverDemo/PopoverDemo"
import {DialogDemo} from "./DialogDemo/DialogDemo";
import {TooltipDemo} from "./TooltipDemo/TooltipDemo";

export const pages = {
    select: SelectDemo,
    button: ButtonDemo,
    popover: PopoverDemo,
    dialog: DialogDemo,
    tooltip: TooltipDemo,
} as const

export type PageId = keyof typeof pages