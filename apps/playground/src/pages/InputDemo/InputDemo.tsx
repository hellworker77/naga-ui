import { Input } from "@naga-ui/input"
import styles from "./InputDemo.module.css"
import React from "react"

export function InputDemo() {

    return (
        <div className="demo-page">

            <header className="demo-header">

                <h1 className="demo-title">
                    Input
                </h1>

                <p className="demo-subtitle">
                    Input with masking, formatting and dynamic behavior.
                </p>

            </header>

            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Phone
                        </label>

                        <Input
                            mask="+7 (999) 999-99-99"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Date
                        </label>

                        <Input
                            mask="99/99/9999"
                            className={styles.input}
                        />
                    </div>

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

                        alert(
                            JSON.stringify(
                                Object.fromEntries(data)
                            )
                        )
                    }}
                >

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Phone
                        </label>

                        <Input
                            required
                            name="phone"
                            mask="+7 (999) 999-99-99"
                            className={styles.input}
                        />
                    </div>

                    <button type="submit">
                        Submit
                    </button>

                </form>

            </section>

            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
                    {`<Input mask="+7 (999) 999-99-99" />
                    
                    <Input mask="99/99/9999" />
                    
                    <Input
                      mask={{
                        mask: "99/99/9999",
                        placeholder: "_",
                        lazy: false
                      }}
                    />
                    
                    <Input mask={currencyMask} />`}
                </pre>

            </section>

            <section className="demo-section">

                <h2>Features</h2>

                <table className="demo-table">
                    <tbody>

                    <tr>
                        <td>caret restore</td>
                        <td>yes</td>
                    </tr>

                    <tr>
                        <td>paste support</td>
                        <td>yes</td>
                    </tr>

                    <tr>
                        <td>composition (IME)</td>
                        <td>yes</td>
                    </tr>

                    <tr>
                        <td>dynamic masks</td>
                        <td>yes</td>
                    </tr>

                    <tr>
                        <td>custom format</td>
                        <td>yes</td>
                    </tr>

                    </tbody>
                </table>

            </section>

        </div>
    )
}