import {Sidebar} from "../sidebar"
import React from "react"
import "./Layout.css"

export function Layout({
                                   page,
                                   onNavigate,
                                   children
                               }: {
    page: string
    onNavigate(v: string): void
    children: React.ReactNode
}) {

    return (
        <div className="layout">
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