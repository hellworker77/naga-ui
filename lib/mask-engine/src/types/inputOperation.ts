export
type InsertOperation = { type: "insert"; text: string }

export
type DeleteBackwardOperation = { type: "deleteBackward" }

export
type DeleteForwardOperation = { type: "deleteForward" }

export
type ReplaceOperation = { type: "replace", text: string }

export
type InputOperation =
    | InsertOperation
    | DeleteBackwardOperation
    | DeleteForwardOperation
    | ReplaceOperation