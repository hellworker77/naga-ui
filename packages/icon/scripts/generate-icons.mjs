import fs from 'fs'
import path from 'path'
import fg from "fast-glob"
import ejs from "ejs"

const SVG_DIR = "icons/svg";
const OUT_DIR = "src/icons";
const TEMPLATE = "scripts/icon.ejs";
const EXPORT_TEMPLATE = "scripts/exports.ejs"

const template = fs.readFileSync(TEMPLATE, "utf8");

function pascalCase(name) {
    return name
        .replace(/(^\w|-\w)/g, m => m.replace("-", "").toUpperCase())
}

function extractSvg(svg) {
    const viewBox =
        svg.match(/viewBox="([^"]+)"/)?.[1] || "0 0 24 24"

    const inner =
        svg
            .replace(/width="[^"]*"/g, "")
            .replace(/height="[^"]*"/g, "")
            .replace(/<svg[^>]*>/, "")
            .replace("</svg>", "")
            .trim()

    return { viewBox, inner }
}

function generateExports(list) {
    const template =
        fs.readFileSync(EXPORT_TEMPLATE, "utf8")

    const code = ejs.render(template, {
        icons: list
    })

    fs.writeFileSync(
        "src/icons/index.ts",
        code.trim()
    )

    console.log("generated index.ts")
}

async function run() {

    const files = await fg(`${SVG_DIR}/*.svg`)
    console.log("SVG files:", files)
    fs.mkdirSync(OUT_DIR, { recursive: true })

    const registry = []

    for (const file of files) {

        const name = path.basename(file, ".svg")

        const componentName =
            pascalCase(name) + "Icon"

        const svg = fs.readFileSync(file, "utf8")

        const { viewBox, inner } = extractSvg(svg)

        const code = ejs.render(template, {
            componentName,
            viewBox,
            svgContent: inner
        })

        const out = `${OUT_DIR}/${componentName}.tsx`

        fs.writeFileSync(out, code)

        registry.push({
            name,
            componentName
        })

        console.log("generated:", componentName)

    }

    generateRegistry(registry)
    generateExports(registry)
}

function generateRegistry(list) {

    const lines = list.map(
        i =>
            `"${i.name}": () => import("./icons/${i.componentName}")`
    )

    const code = `
export const iconRegistry = {
${lines.join(",\n")}
}

export type IconName = keyof typeof iconRegistry
`

    fs.writeFileSync(
        "src/iconRegistry.ts",
        code.trim()
    )

    console.log("generated iconRegistry")

}

run()