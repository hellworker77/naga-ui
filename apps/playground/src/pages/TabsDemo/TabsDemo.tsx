import { Tabs } from "@naga-ui/tabs";
import styles from "./TabsDemo.module.css"
import React from "react"

export function TabsDemo() {

    return (
        <div className={styles.page}>

            <header className={styles.header}>

                <h1 className={styles.title}>
                    Tabs
                </h1>

                <p className={styles.subtitle}>
                    Accessible tabs with keyboard navigation,
                    roving focus and typeahead support.
                </p>

            </header>

            <section className={styles.section}>

                <h2>Example</h2>

                <Tabs.Root
                    defaultValue="account"
                    orientation="horizontal"
                >

                    <Tabs.List className={styles.tabsList}>

                        <Tabs.Trigger
                            value="account"
                            className={styles.trigger}
                        >
                            Account
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="security"
                            className={styles.trigger}
                        >
                            Security
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            value="billing"
                            className={styles.trigger}
                        >
                            Billing
                        </Tabs.Trigger>

                    </Tabs.List>

                    <Tabs.Content
                        value="account"
                        className={styles.panel}
                    >
                        Account settings panel
                    </Tabs.Content>

                    <Tabs.Content
                        value="security"
                        className={styles.panel}
                    >
                        Security settings panel
                    </Tabs.Content>

                    <Tabs.Content
                        value="billing"
                        className={styles.panel}
                    >
                        Billing settings panel
                    </Tabs.Content>

                </Tabs.Root>

            </section>

            <section className={styles.section}>

                <h2>Usage</h2>

                <pre className={styles.code}>
{`<Tabs.Root defaultValue="account">

  <Tabs.List>

    <Tabs.Trigger value="account">
      Account
    </Tabs.Trigger>

    <Tabs.Trigger value="security">
      Security
    </Tabs.Trigger>

  </Tabs.List>

  <Tabs.Content value="account">
    Account panel
  </Tabs.Content>

</Tabs.Root>`}
                </pre>

            </section>

        </div>
    )
}