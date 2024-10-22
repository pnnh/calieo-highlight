import {attr, css, ExecutionContext, FASTElement, html, ref} from "@microsoft/fast-element";


export class SelectorElement extends FASTElement {
    @attr
    selectedValue: string | undefined = 'javascript';

    valueChanged(context: ExecutionContext) {
        console.log('valueChanged', (context.event.target as HTMLSelectElement).value);
        this.selectedValue = (context.event.target as HTMLSelectElement).value;
    }

}

const template = html<SelectorElement>`
    <div>
        <select @change="${(x, v: ExecutionContext) => x.valueChanged(v)}">
            <option value="javascript" selected>Javascript</option>
            <option value="csharp">C#</option>
            <option value="go">Golang</option>
            <option value="java">Java</option>
            <option value="html">Html</option>
            <option value="css">CSS</option>
            <option value="svg">SVG</option>
            <option value="xml">XML</option>
            <option value="php">PHP</option>
            <option value="sql">SQL</option>
            <option value="bash">BASH</option>
            <option value="handlebars">Handlebars</option>
            <option value="protobuf">Protobuf</option>
            <option value="aspnet">ASP.NET</option>
            <option value="razor">Razor</option>
            <option value="jsx">JSX</option>
            <option value="ignore">ignore</option>
            <option value="ruby">Ruby</option>
            <option value="rust">Rust</option>
            <option value="json">JSON</option>
            <option value="cpp">C/C++</option>
            <option value="swift">Swift</option>
            <option value="dart">Dart</option>
            <option value="lua">Lua</option>
            <option value="zig">Zig</option>
            <option value="yaml">Yaml</option>
            <option value="perl">Perl</option>
        </select>
    </div>
`

const styles = css`
    .codeBlockContainer {
        font-family: monospace;
        font-size: 0.9rem;
        padding: 1rem;
        background-color: #f8f8f8;
        height: 200px;
    }
`


SelectorElement.define({
    name: "calieo-selector",
    template,
    styles
});


