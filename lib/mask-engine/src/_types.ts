export type MaskToken =
    | { type: "digit"; optional?: boolean }
    | { type: "letter"; optional?: boolean }
    | { type: "alphanumeric"; optional?: boolean }
    | { type: "literal"; char: string }

export type Slot = {
    token: MaskToken
    char: string | null
}

export type BufferState = {
    slots: Slot[]
    cursor: number
}

export type MaskConfig = {
    mask: string
    prefixLength?: number
}

export type DynamicMask = {
    masks: string[]
    dispatch(raw: string): string
}

export type Mask = string | MaskConfig | DynamicMask

export type MaskEngineResult = {
    value: string
    raw: string
    complete: boolean
    caret: number
}