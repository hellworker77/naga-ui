import {Input} from "@naga-ui/input"
import styles from "./InputDemo.module.css"
import React, {useMemo} from "react"

export function InputDemo() {

    const phoneMask = useMemo(() => ({
        masks: [
            "+1 (999) 999-9999",
            "+44 99 9999 9999"
        ],

        dispatch(raw: string) {
            if (!raw) {
                // дефолтная маска (не дёргаем)
                return "+1 (999) 999-9999"
            }

            if (raw.startsWith("44")) {
                return "+44 99 9999 9999"
            }

            if (raw.startsWith("1")) {
                return "+1 (999) 999-9999"
            }

            // fallback
            return "+1 (999) 999-9999"
        }
    }), [])

    return (
        <div className="demo-page">

            <header className="demo-header">
                <h1 className="demo-title">Input</h1>

                <p className="demo-subtitle">
                    Input with masking.
                </p>
            </header>


            {/* Example */}

            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Phone
                        </label>

                        <Input
                            mask={phoneMask}
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


            {/* Formats */}

            <section className="demo-section">

                <h2>Formats</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Credit card
                        </label>

                        <Input
                            mask="9999 9999 9999 9999"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Time
                        </label>

                        <Input
                            mask="99:99"
                            className={styles.input}
                        />
                    </div>

                </div>

            </section>


            {/* Form */}

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

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Date
                        </label>

                        <Input
                            required
                            name="date"
                            mask="99/99/9999"
                            className={styles.input}
                        />
                    </div>

                    <button type="submit">
                        Submit
                    </button>

                </form>

            </section>


            {/* Usage */}

            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
                    {`<Input mask="+7 (999) 999-99-99" />
                    
                    <Input mask="99/99/9999" />
                    
                    <Input mask="9999 9999 9999 9999" />`}
                </pre>

            </section>


            {/* Features */}

            <section className="demo-section">

                <h2>Features</h2>

                <table className="demo-table">
                    <tbody>

                    <tr>
                        <td>caret control</td>
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
                        <td>overwrite mode</td>
                        <td>yes</td>
                    </tr>

                    <tr>
                        <td>literal skip</td>
                        <td>yes</td>
                    </tr>

                    </tbody>
                </table>

            </section>

        </div>
    )
}