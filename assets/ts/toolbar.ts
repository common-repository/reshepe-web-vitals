import {
    init,
} from '@reshepe-web-vitals/toolbar';

declare global {
    interface Window {
        reshepe_web_vitals_toolbar_config: {
            logo_icon: string;
        };
    }
}

const {
    logo_icon,
} = window.reshepe_web_vitals_toolbar_config;

init(logo_icon);

