import { Input } from "@naga-ui/input"
import styles from "./InputDemo.module.css"
import React from "react"

const phoneMask = {
    masks: [
        "+1 (999) 999-9999",
        "+44 99 9999 9999"
    ],

    dispatch(value: string) {
        if (value.startsWith("1"))
            return "+1 (999) 999-9999"

        return "+44 99 9999 9999"
    }
}

const currencyMask = (value: string) => {
    const num = Number(value.replace(/\D/g, ""))
    if (!num) return ""
    return num.toLocaleString("en-US")
}

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


            {/* Example */}

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


            {/* Placeholder */}

            <section className="demo-section">

                <h2>Placeholder / Lazy</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Lazy (default)
                        </label>

                        <Input
                            mask={{
                                mask: "99/99/9999",
                                lazy: true
                            }}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            With placeholder
                        </label>

                        <Input
                            mask={{
                                mask: "99/99/9999",
                                placeholder: "_",
                                lazy: false
                            }}
                            className={styles.input}
                        />
                    </div>

                </div>

            </section>


            {/* Dynamic */}

            <section className="demo-section">

                <h2>Dynamic mask</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Phone (US / UK)
                        </label>

                        <Input
                            mask={phoneMask}
                            className={styles.input}
                        />
                    </div>

                </div>

            </section>


            {/* Currency */}

            <section className="demo-section">

                <h2>Custom (currency)</h2>

                <div className="demo-stack">

                    <div className={styles.inputRow}>
                        <label className={styles.label}>
                            Currency
                        </label>

                        <Input
                            mask={currencyMask}
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


            {/* Data */}

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