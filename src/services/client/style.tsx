import {isDev} from "@/services/client/config";

export const globalStylesUrl = isDev ? '/src/index.scss' : '/dist/index.css';
