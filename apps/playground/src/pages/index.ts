import SelectDemo from "./SelectDemo/SelectDemo"
import ButtonDemo from "./ButtonDemo/ButtonDemo"
import PopoverDemo from "./PopoverDemo/PopoverDemo"
import {DialogDemo} from "./DialogDemo/DialogDemo";
import {TooltipDemo} from "./TooltipDemo/TooltipDemo";
import {IconDemo} from "./IconDemo/IconDemo";
import {TabsDemo} from "./TabsDemo/TabsDemo";
import {CheckboxDemo} from "./CheckboxDemo/CheckboxDemo";

export const pages = {
    select: SelectDemo,
    button: ButtonDemo,
    popover: PopoverDemo,
    dialog: DialogDemo,
    tooltip: TooltipDemo,
    icon: IconDemo,
    tabs: TabsDemo,
    checkbox: CheckboxDemo,
} as const

export type PageId = keyof typeof pages