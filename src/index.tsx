import {attr, css, FASTElement, html} from "@microsoft/fast-element";
import {ButtonDefinition, TextInputDefinition, FluentDesignSystem} from '@fluentui/web-components';

import {setTheme} from '@fluentui/web-components';
import {webLightTheme} from '@fluentui/tokens';

setTheme(webLightTheme);

ButtonDefinition.define(FluentDesignSystem.registry);
TextInputDefinition.define(FluentDesignSystem.registry);

class HelloWorld extends FASTElement {
    @attr
    name: string | undefined;
}

HelloWorld.define({
    name: "hello-world",
    template: html`<span>Hello ${x => x.name}!</span>`,
    styles: css`
        span {
            color: red;
        }
    `,
});
