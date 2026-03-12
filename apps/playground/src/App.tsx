import { useState } from "react"
import Layout from "./layout/Layout"
import { pages, PageId } from "./pages"
import React from "react"

export default function App() {

    const [page, setPage] = useState<PageId>("select")

    const Page = pages[page]

    return (
        <Layout
            page={page}
            onNavigate={(p) => setPage(p as PageId)}
        >
            <Page />
        </Layout>
    )
}