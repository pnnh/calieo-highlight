import {isDev} from "@/services/client/config";

export const globalStylesUrl = isDev ? '/src/index.scss' : '/dist/index.css';

export function prismjsThemeUrl(themeName: string) {
    const assetsUrl = isDev ? '' : '/dist';
    return `${assetsUrl}/node_modules/prismjs/themes/${themeName}.css`
}
