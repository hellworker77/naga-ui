import SelectDemo from "./SelectDemo/SelectDemo"
import ButtonDemo from "./ButtonDemo/ButtonDemo"
import PopoverDemo from "./PopoverDemo/PopoverDemo"
import {DialogDemo} from "./DialogDemo/DialogDemo";
import {TooltipDemo} from "./TooltipDemo/TooltipDemo";
import {IconDemo} from "./IconDemo/IconDemo";

export const pages = {
    select: SelectDemo,
    button: ButtonDemo,
    popover: PopoverDemo,
    dialog: DialogDemo,
    tooltip: TooltipDemo,
    icon: IconDemo,
} as const

export type PageId = keyof typeof pages