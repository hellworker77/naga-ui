export
type DynMask = {
    masks: string[];
    dispatch(v: string): string
}

export
type MaskConfig = {
    mask: string
    placeholder?: string
    lazy?: boolean
}

export
type Mask =
    | string
    | ((v: string) => string)
    | DynMask
    | MaskConfig