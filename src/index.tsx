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
import './components/selector'
import './components/editor'
import {globalStylesUrl} from "@/services/client/style";
import {SelectorElement} from "@/components/selector";
import {EditorElement} from "@/components/editor";
import domToImage from 'dom-to-image-more';

setTheme(webLightTheme);

ButtonDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);
TextAreaDefinition.define(FluentDesignSystem.registry);

class AppElement extends FASTElement {
    @attr
    name: string | undefined;

    codeBlock: EditorElement | undefined;
    previewBlock: HTMLDivElement | undefined;
    selectorElement: SelectorElement | undefined;

    formatCode() {
        console.log('formatCode');
        if (!this.codeBlock) {
            return
        }
        const codeText = this.codeBlock.content || '';
        const lang = this.selectorElement?.selectedValue || 'javascript';
        if (!this.previewBlock || !codeText) {
            return;
        }
        const html = highlightCode(codeText, lang);
        this.previewBlock.innerHTML = `<pre><code class="language-${lang}">${html}</code></pre>`;
    }

    exportImage() {
        const node = this.previewBlock;

        if (!node || !node.innerHTML) {
            return
        }
        domToImage
            .toPng(node)
            .then(function (dataUrl: string) {
                // var img = new Image();
                // img.src = dataUrl;
                // document.body.appendChild(img);
                const link = document.createElement('a');
                link.download = 'my-image-name.jpeg';
                link.href = dataUrl;
                link.click();
            })
            .catch(function (error: Error) {
                console.error('oops, something went wrong!', error);
            });
    }

}

const template = html<AppElement>`
    <link rel="stylesheet" href="${globalStylesUrl}"/>
    <div class="codeBlockContainer">
        <calieo-editor ${ref('codeBlock')}></calieo-editor>
    </div>
    <div class="selectorContainer">
        <calieo-selector ${ref('selectorElement')}></calieo-selector>
    </div>
    <div class="actionContainer">
        <fluent-button appearance="accent" @click="${(x) => x.formatCode()}">格式化</fluent-button>
        <fluent-button appearance="accent" @click="${(x) => x.exportImage()}">导出图像</fluent-button>
    </div>
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

    .selectorContainer {
        padding: 0 1rem;
        width: 100%;
        margin-bottom: 1rem;
    }

    .actionContainer {
        padding: 0 1rem;
        width: 100%;
        margin-bottom: 1rem;
    }

    .previewBlock {
        margin: 1rem;
        padding: 1rem;
        background-color: #ffffff;
        width: calc(100% - 4rem);
        min-height: 16rem;
        max-height: 32rem;
        overflow: auto;
        scrollbar-width: thin;

        pre {
            padding: 0;
            margin: 0;
            display: block;
            width: 100%;

            code {
                display: block;
                width: 100%;
            }
        }
    }
`


AppElement.define({
    name: "calieo-highlight",
    template,
    styles
});


