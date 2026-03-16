import { Select } from "@naga-ui/select"
import { useState } from "react"
export default function SelectDemo() {

    const [value, setValue] = useState("a")
    const [multiValue, setMultiValue] = useState<string[]>(["a", "c"])

    const options = [
        { value: "a", label: "Option A" },
        { value: "b", label: "Option B" },
        { value: "c", label: "Option C" },
        { value: "d", label: "Option D" },
        { value: "e", label: "Option E" },
        { value: "f", label: "Option F" },
        { value: "g", label: "Option G" },
        { value: "h", label: "Option H" },
        { value: "i", label: "Option I" }
    ]

    return (
        <div className="demo-page">

            <header className="demo-header">
                <h1 className="demo-title">Select</h1>

                <p className="demo-subtitle">
                    Accessible select component with keyboard navigation,
                    typeahead search and multi selection.
                </p>
            </header>

            {/* Example */}
            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <Select
                        value={value}
                        onChange={setValue}
                        options={options}
                    />

                    <Select
                        multi
                        value={multiValue}
                        onChange={setMultiValue}
                        options={options}
                    />

                </div>

            </section>

            {/* Usage */}
            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
                    {`const [value, setValue] = useState("a")
                    
                    <Select
                      value={value}
                      onChange={setValue}
                      options={[
                        { value: "a", label: "Option A" },
                        { value: "b", label: "Option B" }
                      ]}
                    />`}
                </pre>

            </section>

            {/* Slots */}
            <section className="demo-section">

                <h2>Slots</h2>

                <p>
                    Slots allow styling individual parts of the component.
                </p>

                <pre className="demo-code">
                    {`<Select
                      slots={{
                        trigger: "my-trigger",
                        content: "my-dropdown",
                        item: "my-option"
                      }}
                    />`}
                </pre>

                <table className="demo-table">
                    <thead>
                    <tr>
                        <th>slot</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>trigger</td>
                        <td>button that opens the select</td>
                    </tr>

                    <tr>
                        <td>content</td>
                        <td>dropdown container</td>
                    </tr>

                    <tr>
                        <td>item</td>
                        <td>individual option element</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            <section className="demo-section">

                <h2>Data attributes</h2>

                <p>
                    State is exposed through <code>data-*</code> attributes.
                </p>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>attribute</th>
                        <th>element</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>data-state="open | closed"</td>
                        <td>SelectTrigger / SelectContent</td>
                        <td>dropdown state</td>
                    </tr>

                    <tr>
                        <td>data-highlighted</td>
                        <td>SelectItem</td>
                        <td>keyboard / hover focus</td>
                    </tr>

                    <tr>
                        <td>data-selected</td>
                        <td>SelectItem</td>
                        <td>selected option</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}