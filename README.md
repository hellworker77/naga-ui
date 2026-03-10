# naga-ui

Headless React UI primitives with accessibility and keyboard navigation built-in.

Lightweight component library focused on composability and control.

---

## Features

- Accessible components (ARIA patterns)
- Keyboard navigation
- Headless primitives
- Floating positioning engine
- Middleware based positioning
- Fully controllable state
- TypeScript support

---

## Installation


```
npm install @naga-ui/select

or

pnpm add @naga-ui/select
```


## Usage
```
import { Select } from "@naga-ui/select"
import { useState } from "react"

function Example() {
  const [value, setValue] = useState("a")

  return (
    <Select
      value={value}
      onChange={setValue}
      options={[
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" }
      ]}
    />
  )
}
Multi Select
<Select
  multi
  value={values}
  onChange={setValues}
  options={options}
/>
Styling
```
## Components expose styling hooks via:
```
Slots
<Select
  slots={{
    trigger: "my-trigger",
    content: "my-dropdown",
    item: "my-option"
  }}
/>
Data attributes
[data-state="open"]
[data-highlighted]
[data-selected]

Example:

.my-option[data-highlighted] {
  background: #eee;
}
```
## Components roadmap

See:

ROADMAP.md

TODO.md

## Development

Run playground:

pnpm dev
License

MIT