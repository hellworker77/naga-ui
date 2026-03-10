import { useState } from "react"
import Layout from "./layout/Layout"
import SelectDemo from "./pages/SelectDemo/SelectDemo"

export default function App() {

    const [page, setPage] = useState("select")

    return (
        <Layout
            page={page}
            onNavigate={setPage}
        >
            {page === "select" && <SelectDemo />}
        </Layout>
    )
}