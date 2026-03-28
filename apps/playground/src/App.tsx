import { useState } from "react"
import { pages, PageId } from "./pages"
import React from "react"
import {Layout} from "./layout";

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