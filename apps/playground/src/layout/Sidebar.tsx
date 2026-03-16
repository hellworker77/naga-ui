import React from "react"
import styles from "./Sidebar.module.css"

export default function Sidebar({
                                    page,
                                    onNavigate
                                }: {
    page: string
    onNavigate(v: string): void
}) {

    const items = [
        {id: "select", label: "Select"},
        {id: "button", label: "Button"},
        {id: "popover", label: "Popover"},
        {id: "dialog", label: "Dialog"},
        {id: "tooltip", label: "Tooltip"},
        {id: "icon", label: "Icon"},
        {id: "tabs", label: "Tabs"},
        {id: "checkbox", label: "Checkbox"},
    ]

    return (
        <aside className={styles.sidebar}>

            <h3 className={styles.logo}>
                naga-ui
                <span className={styles.version}>0.0.1</span>
            </h3>

            <nav className={styles.nav}>

                {items.map(item => (

                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`${styles.link} ${
                            page === item.id ? styles.active : ""
                        }`}
                    >
                        {item.label}
                    </button>

                ))}

            </nav>

        </aside>
    )
}