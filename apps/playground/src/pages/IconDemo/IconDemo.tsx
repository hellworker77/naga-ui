import { Icon } from "@naga-ui/icon"
import styles from "./IconDemo.module.css"

export function IconDemo() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1 className={styles.title}>Icon</h1>
                <p className={styles.subtitle}>
                    SVG icon system with code generation, lazy loading and registry-based
                    dynamic imports. Icons can be used statically or through the dynamic
                    Icon component.
                </p>
            </header>

            {/* Example */}
            <section className={styles.section}>
                <h2>Example</h2>

                <div className={styles.stack}>
                    <div className={styles.row}>
                        <Icon name="arrow-up" />
                        <Icon name="cross" size={20} />
                        <Icon name="blocked" size={28} />
                        <Icon name="up" color="red" />
                    </div>
                </div>
            </section>

            {/* Usage */}
            <section className={styles.section}>
                <h2>Usage</h2>

                <pre className={styles.code}>
{`import { Icon } from "@naga-ui/icon"

<Icon name="arrow-up" />

<Icon
  name="arrow-up"
  size={20}
/>

<Icon
  name="arrow-up"
  color="red"
/>`}
        </pre>
            </section>

            {/* Props */}
            <section className={styles.section}>
                <h2>Props</h2>

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>prop</th>
                        <th>type</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>name</td>
                        <td>IconName</td>
                        <td>icon identifier from generated registry</td>
                    </tr>

                    <tr>
                        <td>size</td>
                        <td>number</td>
                        <td>icon size in pixels</td>
                    </tr>

                    <tr>
                        <td>color</td>
                        <td>string</td>
                        <td>stroke color</td>
                    </tr>
                    </tbody>
                </table>
            </section>

            {/* Features */}
            <section className={styles.section}>
                <h2>Features</h2>

                <ul className={styles.list}>
                    <li>SVG → React code generation</li>
                    <li>ForwardRef + memo icons</li>
                    <li>Dynamic import registry</li>
                    <li>Runtime cache</li>
                    <li>Tree-shakable static imports</li>
                </ul>
            </section>
        </div>
    )
}