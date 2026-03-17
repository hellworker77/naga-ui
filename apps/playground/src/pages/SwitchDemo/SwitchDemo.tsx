import { Switch } from "@naga-ui/switch"
import styles from "./SwitchDemo.module.css"
import React, { useState } from "react"

export function SwitchDemo() {

    const [checked, setChecked] = useState(false)

    return (
        <div className="demo-page">

            <header className="demo-header">

                <h1 className="demo-title">
                    Switch
                </h1>

                <p className="demo-subtitle">
                    Accessible switch component built on top of button.
                    Supports keyboard interaction and form integration.
                </p>

            </header>


            {/* Example */}

            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <label className={styles.switchRow}>

                        <Switch className={styles.switch}>
                            <Switch.Thumb className={styles.thumb}/>
                        </Switch>

                        Uncontrolled switch

                    </label>

                    <label className={styles.switchRow}>

                        <Switch
                            checked={checked}
                            onCheckedChange={setChecked}
                            className={styles.switch}
                        >
                            <Switch.Thumb className={styles.thumb}/>
                        </Switch>

                        Controlled switch ({checked ? "on" : "off"})

                    </label>

                </div>

            </section>


            {/* Form integration */}

            <section className="demo-section">

                <h2>Form integration</h2>

                <form
                    className="demo-stack"

                    onSubmit={(e) => {

                        e.preventDefault()

                        const data =
                            new FormData(e.currentTarget)

                        alert(
                            JSON.stringify(
                                Object.fromEntries(data)
                            )
                        )

                    }}
                >

                    <label className={styles.switchRow}>

                        <Switch
                            name="notifications"
                            className={styles.switch}
                        >
                            <Switch.Thumb className={styles.thumb}/>
                        </Switch>

                        Enable notifications

                    </label>

                    <button type="submit">
                        Submit
                    </button>

                </form>

            </section>


            {/* Usage */}

            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
{`<Switch>

  <Switch.Thumb />

</Switch>`}
                </pre>

            </section>


            {/* Slots */}

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
                        <td>interactive switch element</td>
                    </tr>

                    <tr>
                        <td>thumb</td>
                        <td>movable handle inside the switch</td>
                    </tr>

                    </tbody>

                </table>

            </section>


            {/* Data attributes */}

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
                        <td>data-state="checked | unchecked"</td>
                        <td>Switch</td>
                        <td>current switch state</td>
                    </tr>

                    <tr>
                        <td>data-disabled</td>
                        <td>Switch</td>
                        <td>present when switch is disabled</td>
                    </tr>

                    <tr>
                        <td>data-state="checked | unchecked"</td>
                        <td>SwitchThumb</td>
                        <td>thumb position state</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}