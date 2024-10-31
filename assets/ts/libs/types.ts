export interface MetricData {
    rating: 'good' | 'needs-improvement' | 'poor';
    value: number;
    element?: Element | Node | null;
    score: number;
}

export interface Metrics {
    LCP: Map<string, MetricData>;
    INP: Map<string, MetricData>;
    CLS: Map<string, MetricData>;
    TTFB: Map<string, MetricData>;
    FCP: Map<string, MetricData>;
}

export interface EventData {
    type: keyof Metrics;
    data: MetricData;
}

interface CustomEventMap {
    'reshepe-web-vitals-data-set': CustomEvent<EventData>;
    'reshepe-web-vitals-data-clear': CustomEvent<unknown>;
}

declare global {
    interface Window {
        reshepe_web_vitals: Metrics;
    }

    interface Document {
        addEventListener<K extends keyof CustomEventMap>(type: K, listener: (this: Document, ev: CustomEventMap[K]) => void): void;

        dispatchEvent<K extends keyof CustomEventMap>(ev: CustomEventMap[K]): boolean;
    }
}
