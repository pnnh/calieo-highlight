import {attr, css, FASTElement, html, ref} from "@microsoft/fast-element";
import {
    ButtonDefinition,
    TextInputDefinition,
    TextAreaDefinition,
    FluentDesignSystem
} from '@fluentui/web-components';

import {setTheme} from '@fluentui/web-components';
import {webLightTheme} from '@fluentui/tokens';
import {highlightCode} from "@/services/client/highlight";
import {func} from "prop-types";
import {isDev} from "@/services/client/config";

setTheme(webLightTheme);

ButtonDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);
TextAreaDefinition.define(FluentDesignSystem.registry);

class AppElement extends FASTElement {
    @attr
    name: string | undefined;

    codeBlock: HTMLTextAreaElement | undefined;
    previewBlock: HTMLDivElement | undefined;

    formatCode() {
        console.log('formatCode');
        if (this.codeBlock) {
            const codeText = this.codeBlock.value;
            console.log('formatCode', codeText);
            if (this.previewBlock) {
                const html = highlightCode(codeText, 'javascript');
                this.previewBlock.innerHTML = `<pre><code class="language-javascript">${html}</code></pre>`;
            }
        }
    }

}

const globalStylesUrl = isDev ? '/src/index.scss' : '/dist/index.css';

const template = html<AppElement>`
    <link rel="stylesheet" href="${globalStylesUrl}"/>
    <div class="codeBlockContainer">
        <fluent-textarea auto-resize resize="both" size="large" block ${ref('codeBlock')}>
            AppElement.define({
            name: "calieo-highlight",
            template,
            styles
            });
        </fluent-textarea>
    </div>
    <fluent-button appearance="accent" @click="${(x) => x.formatCode()}">格式化</fluent-button>
    <div ${ref('previewBlock')} class="previewBlock"></div>
`

const styles = css`
    .codeBlockContainer {
        font-family: monospace;
        font-size: 0.9rem;
        padding: 1rem;
        background-color: #f8f8f8;
        height: 200px;

        fluent-textarea {
            width: 100%;
            height: 100%;
        }
    }

    .previewBlock {
        padding: 1rem;
        background-color: #f8f8f8;
        width: 100%;
        height: 200px;
    }
`


AppElement.define({
    name: "calieo-highlight",
    template,
    styles
});


