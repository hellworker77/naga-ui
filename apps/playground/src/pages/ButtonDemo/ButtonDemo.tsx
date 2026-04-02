import {Button} from "@naga-ui/button"
import React from "react"

export default function ButtonDemo() {

    return (
        <div className="demo-page">

            <header className="demo-header">

                <h1 className="demo-title">
                    Button
                </h1>

                <p className="demo-subtitle">
                    Flexible button component supporting variants, sizes,
                    icons, loading states and polymorphic rendering.
                </p>

            </header>


            {/* Example */}

            <section className="demo-section">

                <h2>Example</h2>

                <div className="demo-stack">

                    <Button>
                        Default
                    </Button>

                    <Button variant="outline">
                        Outline
                    </Button>

                    <Button variant="ghost">
                        Ghost
                    </Button>

                    {/*<Button startIcon={<Icon name="arrow-right" />}>
                        With icon
                    </Button>*/}

                    <Button loading>
                        Loading
                    </Button>

                    {/*<Button
                        icon
                        aria-label="Close">
                        <Icon name="close" />
                    </Button>*/}

                </div>

            </section>

            <section className="demo-section">

                <h2>Usage</h2>

                <pre className="demo-code">
                    {`<Button>
                      Save
                    </Button>
                    
                    <Button variant="outline">
                      Cancel
                    </Button>
                    
                    <Button startIcon={<Icon name="plus" />}>
                      Create
                    </Button>`}
                </pre>

            </section>


            {/* Variants */}

            <section className="demo-section">

                <h2>Variants</h2>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>variant</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>default</td>
                        <td>primary button style</td>
                    </tr>

                    <tr>
                        <td>outline</td>
                        <td>bordered button</td>
                    </tr>

                    <tr>
                        <td>ghost</td>
                        <td>minimal button without background</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            <section className="demo-section">

                <h2>Sizes</h2>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>size</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>xs</td>
                        <td>extra small button</td>
                    </tr>

                    <tr>
                        <td>sm</td>
                        <td>small button</td>
                    </tr>

                    <tr>
                        <td>md</td>
                        <td>default size</td>
                    </tr>

                    <tr>
                        <td>lg</td>
                        <td>large button</td>
                    </tr>

                    <tr>
                        <td>xl</td>
                        <td>extra large button</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            <section className="demo-section">

                <h2>Slots</h2>

                <p>
                    Slots allow styling specific parts of the button.
                </p>

                <pre className="demo-code">
                    {`<Button
                      slots={{
                        root: "my-button",
                        startIcon: "my-icon",
                        label: "my-label"
                      }}
                    >
                      Save
                    </Button>`}
                </pre>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>slot</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>root</td>
                        <td>button element</td>
                    </tr>

                    <tr>
                        <td>startIcon</td>
                        <td>icon displayed before label</td>
                    </tr>

                    <tr>
                        <td>endIcon</td>
                        <td>icon displayed after label</td>
                    </tr>

                    <tr>
                        <td>label</td>
                        <td>button text</td>
                    </tr>

                    </tbody>

                </table>

            </section>

            <section className="demo-section">

                <h2>Data attributes</h2>

                <p>
                    Button state is exposed via <code>data-*</code> attributes.
                </p>

                <table className="demo-table">

                    <thead>
                    <tr>
                        <th>attribute</th>
                        <th>description</th>
                    </tr>
                    </thead>

                    <tbody>

                    <tr>
                        <td>data-variant</td>
                        <td>button visual style</td>
                    </tr>

                    <tr>
                        <td>data-size</td>
                        <td>button size</td>
                    </tr>

                    <tr>
                        <td>data-loading</td>
                        <td>loading state</td>
                    </tr>

                    <tr>
                        <td>data-icon-only</td>
                        <td>icon-only button</td>
                    </tr>

                    </tbody>

                </table>

            </section>

        </div>
    )
}