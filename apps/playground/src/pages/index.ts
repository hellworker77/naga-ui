import SelectDemo from "./SelectDemo/SelectDemo"
import ButtonDemo from "./ButtonDemo/ButtonDemo"
import PopoverDemo from "./PopoverDemo/PopoverDemo"
import {DialogDemo} from "./DialogDemo/DialogDemo";
import {TooltipDemo} from "./TooltipDemo/TooltipDemo";
import {IconDemo} from "./IconDemo/IconDemo";
import {TabsDemo} from "./TabsDemo/TabsDemo";
import {CheckboxDemo} from "./CheckboxDemo/CheckboxDemo";
import {SwitchDemo} from "./SwitchDemo/SwitchDemo";

export const pages = {
    select: SelectDemo,
    button: ButtonDemo,
    popover: PopoverDemo,
    dialog: DialogDemo,
    tooltip: TooltipDemo,
    icon: IconDemo,
    tabs: TabsDemo,
    checkbox: CheckboxDemo,
    switch: SwitchDemo,
} as const

export type PageId = keyof typeof pages