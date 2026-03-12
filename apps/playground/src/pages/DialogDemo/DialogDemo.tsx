import { Dialog } from "@naga-ui/dialog"
import styles from "./DialogDemo.module.css"
import React from "react"

export function DialogDemo() {

    return (
        <div className={styles.page}>

            <header className={styles.header}>

                <h1 className={styles.title}>
                    Dialog
                </h1>

                <p className={styles.subtitle}>
                    Modal dialog built with overlay stack, focus trap and
                    dismiss system. Supports keyboard navigation and
                    accessibility attributes.
                </p>

            </header>

            {/* Example */}
            <section className={styles.section}>

                <h2>Example</h2>

                <div className={styles.stack}>

                    <Dialog.Root>

                        <Dialog.Trigger className={styles.button}>
                            Open dialog
                        </Dialog.Trigger>

                        <Dialog.Portal>

                            <Dialog.Overlay className={styles.overlay} />

                            <Dialog.Content className={styles.dialog}>

                                <Dialog.Title className={styles.dialogTitle}>
                                    Dialog title
                                </Dialog.Title>

                                <Dialog.Description className={styles.dialogText}>
                                    This is an accessible modal dialog.
                                    Focus is trapped inside while open.
                                </Dialog.Description>

                                <div className={styles.dialogActions}>

                                    <Dialog.Close className={styles.buttonSecondary}>
                                        Cancel
                                    </Dialog.Close>

                                    <Dialog.Close className={styles.button}>
                                        Confirm
                                    </Dialog.Close>

                                </div>

                            </Dialog.Content>

                        </Dialog.Portal>

                    </Dialog.Root>

                </div>

            </section>

            {/* Usage */}
            <section className={styles.section}>

                <h2>Usage</h2>

                <pre className={styles.code}>
{`<Dialog.Root>

  <Dialog.Trigger>
    Open dialog
  </Dialog.Trigger>

  <Dialog.Portal>

    <Dialog.Overlay />

    <Dialog.Content>

      <Dialog.Title>
        Dialog title
      </Dialog.Title>

      <Dialog.Description>
        Dialog description
      </Dialog.Description>

      <Dialog.Close>
        Close
      </Dialog.Close>

    </Dialog.Content>

  </Dialog.Portal>

</Dialog.Root>`}
                </pre>

            </section>

            {/* Slots */}
            <section className={styles.section}>

                <h2>Slots</h2>

                <table className={styles.table}>

                    <thead>
                    <tr>
                        <th>slot</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>trigger</td>
                        <td>element that opens the dialog</td>
                    </tr>

                    <tr>
                        <td>overlay</td>
                        <td>background layer blocking pointer events</td>
                    </tr>

                    <tr>
                        <td>content</td>
                        <td>dialog container</td>
                    </tr>

                    <tr>
                        <td>title</td>
                        <td>dialog heading used by aria-labelledby</td>
                    </tr>

                    <tr>
                        <td>description</td>
                        <td>dialog text used by aria-describedby</td>
                    </tr>

                    <tr>
                        <td>close</td>
                        <td>button that closes dialog</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            {/* Data attributes */}
            <section className={styles.section}>

                <h2>Data attributes</h2>

                <table className={styles.table}>

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
                        <td>DialogTrigger</td>
                        <td>dialog open state</td>
                    </tr>

                    <tr>
                        <td>data-state="open"</td>
                        <td>DialogContent</td>
                        <td>dialog visibility</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}