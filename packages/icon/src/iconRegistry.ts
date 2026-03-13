export const iconRegistry = {
"arrow-left": () => import("./icons/ArrowLeftIcon"),
"arrow-right": () => import("./icons/ArrowRightIcon"),
"arrow-up": () => import("./icons/ArrowUpIcon"),
"blocked": () => import("./icons/BlockedIcon"),
"cross": () => import("./icons/CrossIcon"),
"down": () => import("./icons/DownIcon"),
"up": () => import("./icons/UpIcon")
}

export type IconName = keyof typeof iconRegistry