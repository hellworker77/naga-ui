import Sidebar from "./Sidebar"
import React from "react"
import "./Layout.css"

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
        <div className="container">

            <Sidebar
                page={page}
                onNavigate={onNavigate}
            />

            <main className="main">
                {children}
            </main>

        </div>
    )
}