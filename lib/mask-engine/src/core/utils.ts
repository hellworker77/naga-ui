export
function isInputChar(char: string): boolean {
    return /[a-zA-Z0-9]/.test(char)
}

export
function extractRaw(v: string) {
    return v.replace(/[^a-zA-Z0-9]/g,  "")
}