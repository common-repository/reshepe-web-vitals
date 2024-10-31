import {
    init,
    missing_api_key,
    send,
} from '@reshepe-web-vitals/core';

declare global {
    interface Window {
        reshepe_web_vitals_config: {
            api_key: string | null;
            version: string;
            platform: string;
            production: string;
        };
    }
}

const {
    api_key,
    version,
    platform,
    production,
} = window.reshepe_web_vitals_config;

const is_production = !!parseInt(production);

if (!api_key) {
    missing_api_key();
} else {
    init(is_production);

    addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            if (is_production) {
                send(
                    window.location.pathname,
                    api_key,
                    version,
                    platform,
                );
            }
        }
    });
}


