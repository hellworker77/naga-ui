import {RefObject} from "react";

export type Orientation =
    "horizontal" | "vertical";

export type ActivationMode =
    "automatic" | "manual"

export type TriggerItem = {
    value: string;
    ref: RefObject<HTMLButtonElement | null>,
    text?: string;
}