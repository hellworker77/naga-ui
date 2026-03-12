import { Popover } from "@naga-ui/popover"
import styles from "./PopoverDemo.module.css"
import React from "react"

export default function PopoverDemo() {
    return (
        <div className={styles.page}>

            <header className={styles.header}>

                <h1 className={styles.title}>
                    Popover
                </h1>

                <p className={styles.subtitle}>
                    Floating panel anchored to a trigger element.
                    Supports outside click, escape close and smart positioning.
                </p>

            </header>

            {/* Example */}
            <section className={styles.section}>

                <h2>Example</h2>

                <div className={styles.stack}>

                    <Popover.Root>

                        <Popover.Trigger className={styles.button}>
                            Open popover
                        </Popover.Trigger>

                        <Popover.Portal>

                            <Popover.Content className={styles.popover}>

                                <div className={styles.popoverContent}>

                                    <strong>Popover</strong>

                                    <p>
                                        This is floating content positioned
                                        relative to the trigger.
                                    </p>

                                </div>

                            </Popover.Content>

                        </Popover.Portal>

                    </Popover.Root>

                </div>

            </section>

            {/* Usage */}
            <section className={styles.section}>

                <h2>Usage</h2>

                <pre className={styles.code}>
{`<Popover.Root>

  <Popover.Trigger>
    Open
  </Popover.Trigger>

  <Popover.Portal>

    <Popover.Content>
      Popover content
    </Popover.Content>

  </Popover.Portal>

</Popover.Root>`}
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
                        <td>element that toggles the popover</td>
                    </tr>

                    <tr>
                        <td>content</td>
                        <td>floating panel container</td>
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
                        <td>PopoverTrigger</td>
                        <td>popover open state</td>
                    </tr>

                    <tr>
                        <td>data-state="open"</td>
                        <td>PopoverContent</td>
                        <td>visible popover panel</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}