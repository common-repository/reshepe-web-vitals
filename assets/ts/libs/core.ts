import { type EventData, type MetricData, type Metrics } from '@reshepe-web-vitals/types';
import { UAParser }                                      from 'ua-parser-js';
import {
    type CLSMetricWithAttribution, type FCPMetricWithAttribution, type INPMetricWithAttribution, type LCPMetricWithAttribution, onCLS,
    onFCP, onINP, onLCP, onTTFB, type TTFBMetricWithAttribution,
}                                                        from 'web-vitals/attribution';

const set = (
    type: keyof Metrics,
    store: Map<string, MetricData>,
    id: string,
    data: MetricData,
): void => {
    store.set(id, data);

    document.dispatchEvent(new CustomEvent<EventData>('reshepe-web-vitals-data-set', {
        detail: {
            type,
            data,
        },
    }));
};

interface ScoreItem {
    good: number;
    poor: number;
    floor: number;
}

const scores: Record<keyof Metrics, ScoreItem> = {
    LCP:  {
        good:  2500,
        poor:  4000,
        floor: 10000,
    },
    INP:  {
        good:  200,
        poor:  500,
        floor: 1000,
    },
    CLS:  {
        good:  0.1,
        poor:  0.25,
        floor: 1,
    },
    TTFB: {
        good:  800,
        poor:  1800,
        floor: 5000,
    },
    FCP:  {
        good:  1800,
        poor:  3000,
        floor: 10000,
    },
};

interface minmax {
    percent: number;
    value: number;
}

const score = (value: number, start: minmax, end: minmax): number => {
    const slope = (end.value - start.value) / (end.percent - start.percent);

    const percent = start.percent + ((start.value - value) / Math.abs(slope));

    return parseInt(percent.toFixed(0), 10);
};

const init = (production: boolean, report_soft_navigation: boolean = false): void => {
    if (!production) {
        console.info('[reshepe web vitals]: running in developer mode, data will not be send to the server');
    }

    window.reshepe_web_vitals = window.reshepe_web_vitals || {
        LCP:  new Map(),
        INP:  new Map(),
        CLS:  new Map(),
        TTFB: new Map(),
        FCP:  new Map(),
    };

    onLCP((metric: LCPMetricWithAttribution) => {
        const {
            id,
            rating,
            value,
            attribution,
        } = metric;

        let s: number;

        if (value <= scores.LCP.good) {
            s = score(value, {
                percent: 90,
                value:   scores.LCP.good,
            }, {
                percent: 100,
                value:   0,
            });
        } else if (value <= scores.LCP.poor) {
            s = score(value, {
                percent: 50,
                value:   scores.LCP.poor,
            }, {
                percent: 90,
                value:   scores.LCP.good,
            });
        } else {
            s = score(value, {
                percent: 0,
                value:   scores.LCP.floor,
            }, {
                percent: 50,
                value:   scores.LCP.poor,
            });
        }

        const data: MetricData = {
            rating,
            value,
            element: attribution.lcpEntry?.element,
            score:   Math.max(0, s),
        };

        set('LCP', window.reshepe_web_vitals.LCP, id, data);
    }, {
        reportAllChanges: true,
        reportSoftNavs:   report_soft_navigation,
    });

    onINP((metric: INPMetricWithAttribution) => {
        const {
            id,
            rating,
            value,
            attribution,
        } = metric;

        let s: number;

        if (value <= scores.INP.good) {
            s = score(value, {
                percent: 90,
                value:   scores.INP.good,
            }, {
                percent: 100,
                value:   0,
            });
        } else if (value <= scores.INP.poor) {
            s = score(value, {
                percent: 50,
                value:   scores.INP.poor,
            }, {
                percent: 90,
                value:   scores.INP.good,
            });
        } else {
            s = score(value, {
                percent: 0,
                value:   scores.INP.floor,
            }, {
                percent: 50,
                value:   scores.INP.poor,
            });
        }

        const data: MetricData = {
            rating,
            value,
            element: attribution.interactionTargetElement,
            score:   Math.max(0, s),
        };

        set('INP', window.reshepe_web_vitals.INP, id, data);
    }, {
        reportAllChanges: true,
        reportSoftNavs:   report_soft_navigation,
    });

    onCLS((metric: CLSMetricWithAttribution) => {
        const {
            id,
            rating,
            value,
            attribution,
        } = metric;

        let s: number;

        if (value <= scores.CLS.good) {
            s = score(value, {
                percent: 90,
                value:   scores.CLS.good,
            }, {
                percent: 100,
                value:   0,
            });
        } else if (value <= scores.CLS.poor) {
            s = score(value, {
                percent: 50,
                value:   scores.CLS.poor,
            }, {
                percent: 90,
                value:   scores.CLS.good,
            });
        } else {
            s = score(value, {
                percent: 0,
                value:   scores.CLS.floor,
            }, {
                percent: 50,
                value:   scores.CLS.poor,
            });
        }

        const data: MetricData = {
            rating,
            value,
            element: attribution.largestShiftSource?.node,
            score:   Math.max(0, s),
        };

        set('CLS', window.reshepe_web_vitals.CLS, id, data);
    }, {
        reportAllChanges: true,
        reportSoftNavs:   report_soft_navigation,
    });

    onTTFB((metric: TTFBMetricWithAttribution) => {
        const {
            id,
            rating,
            value,
        } = metric;

        let s: number;

        if (value <= scores.TTFB.good) {
            s = score(value, {
                percent: 90,
                value:   scores.TTFB.good,
            }, {
                percent: 100,
                value:   0,
            });
        } else if (value <= scores.TTFB.poor) {
            s = score(value, {
                percent: 50,
                value:   scores.TTFB.poor,
            }, {
                percent: 90,
                value:   scores.TTFB.good,
            });
        } else {
            s = score(value, {
                percent: 0,
                value:   scores.TTFB.floor,
            }, {
                percent: 50,
                value:   scores.TTFB.poor,
            });
        }

        const data: MetricData = {
            rating,
            value,
            element: undefined,
            score:   Math.max(0, s),
        };

        set('TTFB', window.reshepe_web_vitals.TTFB, id, data);
    }, {
        reportAllChanges: true,
        reportSoftNavs:   report_soft_navigation,
    });

    onFCP((metric: FCPMetricWithAttribution) => {
        const {
            id,
            rating,
            value,
        } = metric;

        let s: number;

        if (value <= scores.FCP.good) {
            s = score(value, {
                percent: 90,
                value:   scores.FCP.good,
            }, {
                percent: 100,
                value:   0,
            });
        } else if (value <= scores.FCP.poor) {
            s = score(value, {
                percent: 50,
                value:   scores.FCP.poor,
            }, {
                percent: 90,
                value:   scores.FCP.good,
            });
        } else {
            s = score(value, {
                percent: 0,
                value:   scores.FCP.floor,
            }, {
                percent: 50,
                value:   scores.FCP.poor,
            });
        }

        const data: MetricData = {
            rating,
            value,
            element: undefined,
            score:   Math.max(0, s),
        };

        set('FCP', window.reshepe_web_vitals.FCP, id, data);
    }, {
        reportAllChanges: true,
        reportSoftNavs:   report_soft_navigation,
    });
};

const send = (
    path: string,
    api_key: string,
    version: string,
    platform: string,
) => {
    const payload = {
        api_key,
        path:    path.length > 1 ? path.replace(/\/$/, '') : path,
        version,
        platform,
        desktop: true,
        metrics: {
            LCP:  Array.from(window.reshepe_web_vitals.LCP, ([id, { rating, value, score }]) => ({
                id,
                rating,
                value,
                score,
            })),
            INP:  Array.from(window.reshepe_web_vitals.INP, ([id, { rating, value, score }]) => ({
                id,
                rating,
                value,
                score,
            })),
            CLS:  Array.from(window.reshepe_web_vitals.CLS, ([id, { rating, value, score }]) => ({
                id,
                rating,
                value,
                score,
            })),
            TTFB: Array.from(window.reshepe_web_vitals.TTFB, ([id, { rating, value, score }]) => ({
                id,
                rating,
                value,
                score,
            })),
            FCP:  Array.from(window.reshepe_web_vitals.FCP, ([id, { rating, value, score }]) => ({
                id,
                rating,
                value,
                score,
            })),
        },
    };

    const has_data = Object.keys(payload.metrics).some((key) => payload.metrics[key as keyof Metrics].length > 0);

    if (!has_data) {
        return;
    }

    const parser = new UAParser(navigator.userAgent);
    const device = parser.getDevice();

    payload.desktop = device.type === undefined || !['wearable', 'mobile'].includes(device.type);

    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
        navigator.sendBeacon(process.env.API_URL, body);
    } else {
        fetch(process.env.API_URL, {
            method:    'POST',
            keepalive: true,
            headers:   {
                'Content-Type': 'application/json',
            },
            body,
        });
    }
};

const missing_api_key = () => {
    console.error(`[reshepe web vitals]: missing api key, please visit ${process.env.DOCS_URL} for more information`);
};

const clear = () => {
    window.reshepe_web_vitals = {
        LCP:  new Map(),
        INP:  new Map(),
        CLS:  new Map(),
        TTFB: new Map(),
        FCP:  new Map(),
    };

    document.dispatchEvent(new CustomEvent('reshepe-web-vitals-data-clear', {}));
};

export {
    init,
    send,
    missing_api_key,
    clear,
};
