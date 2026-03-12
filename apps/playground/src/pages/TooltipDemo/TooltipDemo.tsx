import { Tooltip } from "@naga-ui/tooltip"
import styles from "./TooltipDemo.module.css"
import React from "react"

export function TooltipDemo() {

    return (
        <Tooltip.Provider>
            <div className={styles.page}>

                <header className={styles.header}>

                    <h1 className={styles.title}>
                        Tooltip
                    </h1>

                    <p className={styles.subtitle}>
                        Floating label that appears on hover or focus.
                        Supports delay, skip delay and safe polygon hover.
                    </p>

                </header>

                {/* Example */}
                <section className={styles.section}>

                    <h2>Example</h2>

                    <div className={styles.stack}>

                        <Tooltip.Root>

                            <Tooltip.Trigger className={styles.button}>
                                Hover me
                            </Tooltip.Trigger>

                            <Tooltip.Portal>

                                <Tooltip.Content className={styles.tooltip}>
                                    Tooltip content
                                </Tooltip.Content>

                            </Tooltip.Portal>

                        </Tooltip.Root>

                    </div>

                </section>

                {/* Usage */}
                <section className={styles.section}>

                    <h2>Usage</h2>

                    <pre className={styles.code}>
{`<Tooltip.Providr>
    <Tooltip.Root>
    
      <Tooltip.Trigger>
        Hover me
      </Tooltip.Trigger>
    
      <Tooltip.Portal>
    
        <Tooltip.Content>
          Tooltip text
        </Tooltip.Content>
    
      </Tooltip.Portal>
    
    </Tooltip.Root>
</Tooltip.Providr>`}
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
                            <td>element that shows the tooltip on hover</td>
                        </tr>

                        <tr>
                            <td>content</td>
                            <td>floating tooltip element</td>
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
                            <td>TooltipTrigger</td>
                            <td>tooltip visibility state</td>
                        </tr>

                        <tr>
                            <td>data-state="open"</td>
                            <td>TooltipContent</td>
                            <td>tooltip is visible</td>
                        </tr>

                        </tbody>

                    </table>

                </section>

            </div>
        </Tooltip.Provider>
    )
}