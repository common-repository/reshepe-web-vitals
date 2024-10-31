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
