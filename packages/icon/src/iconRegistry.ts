import {IconLoader} from "./types";

export const iconRegistry = {
    "arrow-down": () => import("./icons/ArrowDown")
} satisfies Record<string, IconLoader>

export type IconName = keyof typeof iconRegistry;