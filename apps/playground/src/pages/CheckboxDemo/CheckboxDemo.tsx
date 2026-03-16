import {Checkbox} from "@naga-ui/checkbox"
import styles from "./CheckboxDemo.module.css"
import React, {useState} from "react"

export function CheckboxDemo() {

    const [checked, setChecked] = useState(false)

    const [parent, setParent] =
        useState<boolean | "indeterminate">("indeterminate")

    function toggleParent() {
        if (parent === "indeterminate")
            setParent(true)
        else
            setParent(!parent)
    }

    return (
        <div className="demo-page">

            <header className="demo-header">

                <h1 className="demo-title">
                    Checkbox
                </h1>

                <p className="demo-subtitle">
                    Accessible checkbox with indeterminate state,
                    keyboard interaction and form support.
                </p>

            </header>

            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <label className={styles.checkboxRow}>

                        <Checkbox className={styles.checkbox}>
                            <Checkbox.Indicator className={styles.indicator}>✓</Checkbox.Indicator>
                        </Checkbox>

                        Uncontrolled checkbox

                    </label>

                    <label className={styles.checkboxRow}>

                        <Checkbox
                            checked={checked}
                            onCheckedChange={v => setChecked(v === true)}
                            className={styles.checkbox}
                        >
                            <Checkbox.Indicator className={styles.indicator}>✓</Checkbox.Indicator>
                        </Checkbox>

                        Controlled checkbox ({checked ? "checked" : "unchecked"})

                    </label>

                    <label className={styles.checkboxRow}>

                        <Checkbox
                            checked={parent}
                            onCheckedChange={toggleParent}
                            className={styles.checkbox}
                        >
                            <Checkbox.Indicator className={styles.indicator}>✓</Checkbox.Indicator>
                        </Checkbox>

                        Indeterminate checkbox

                    </label>

                </div>

            </section>

            <section className="demo-section">

                <h2>Form integration</h2>

                <form
                    className="demo-stack"

                    onSubmit={(e) => {
                        e.preventDefault()

                        const data =
                            new FormData(e.currentTarget)

                        alert(JSON.stringify(
                            Object.fromEntries(data)
                        ))
                    }}
                >

                    <label className={styles.checkboxRow}>

                        <Checkbox
                            type="button"
                            name="terms"
                            required
                            className={styles.checkbox}
                        >
                            <Checkbox.Indicator
                                className={styles.indicator}
                            >✓</Checkbox.Indicator>
                        </Checkbox>

                        Accept terms

                    </label>

                    <button
                        type="submit"
                        className={styles.button}
                    >
                        Submit
                    </button>

                </form>

            </section>

            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
                    {`<Checkbox>

                    <Checkbox.Indicator />

                    </Checkbox>`}
                </pre>

            </section>

            <section className="demo-section">

                <h2>Slots</h2>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>slot</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>root</td>
                        <td>interactive checkbox element</td>
                    </tr>

                    <tr>
                        <td>indicator</td>
                        <td>rendered when checkbox is checked or indeterminate</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            <section className="demo-section">

                <h2>Data attributes</h2>

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
                        <td>data-state="checked | unchecked | indeterminate"</td>
                        <td>Checkbox</td>
                        <td>current checkbox state</td>
                    </tr>

                    <tr>
                        <td>data-disabled</td>
                        <td>Checkbox</td>
                        <td>present when checkbox is disabled</td>
                    </tr>

                    <tr>
                        <td>data-state="checked | indeterminate"</td>
                        <td>CheckboxIndicator</td>
                        <td>indicator visibility state</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}