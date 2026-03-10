import Sidebar from "./Sidebar"
import styles from "./Layout.module.css"

export default function Layout({
                                   page,
                                   onNavigate,
                                   children
                               }: {
    page: string
    onNavigate(v: string): void
    children: React.ReactNode
}) {

    return (
        <div className={styles.container}>

            <Sidebar
                page={page}
                onNavigate={onNavigate}
            />

            <main className={styles.main}>
                {children}
            </main>

        </div>
    )
}