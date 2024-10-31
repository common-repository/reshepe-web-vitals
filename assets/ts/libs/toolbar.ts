import {
    type MetricData,
    type Metrics,
} from '@reshepe-web-vitals/types';

interface ToolbarMetric {
    key: string;
    title: string;
    nodes: {
        wrapper: HTMLElement | null;
        fill: SVGGElement | null;
        value: HTMLElement | null;
    };
}

const keys: Record<keyof Metrics, ToolbarMetric> = {
    LCP:  {
        key:   'lcp',
        title: 'Largest Contentful Paint',
        nodes: {
            wrapper: null,
            fill:    null,
            value:   null,
        },
    },
    INP:  {
        key:   'inp',
        title: 'Interaction to Next Paint',
        nodes: {
            wrapper: null,
            fill:    null,
            value:   null,
        },
    },
    CLS:  {
        key:   'cls',
        title: 'Cumulative Layout Shift',
        nodes: {
            wrapper: null,
            fill:    null,
            value:   null,
        },
    },
    TTFB: {
        key:   'ttfb',
        title: 'Time to First Byte',
        nodes: {
            wrapper: null,
            fill:    null,
            value:   null,
        },
    },
    FCP:  {
        key:   'fcp',
        title: 'First Contentful Paint',
        nodes: {
            wrapper: null,
            fill:    null,
            value:   null,
        },
    },
};

const colors = {
    success: '#76c893',
    warning: '#d2b05f',
    error:   '#87233f',
    unknown: '#5d6462',
} as const;

const styles = `
    <style>
        #reshepe-web-vitals-toolbar {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 1rem;
            height: 64px;
            background-color: #141619;
            z-index: 9999999999;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 1rem;
            color: #fff;
            margin-left: auto;
            margin-right: auto;
            margin-inline: auto; 
            width: fit-content;
            padding: 0.4rem;
            border-radius: 0.5rem;
            opacity: 0.8;
            transition: opacity 0.2s ease-in-out;
        }
        
        #reshepe-web-vitals-toolbar:hover {
            opacity: 1;
        }
        
        .reshepe-web-vitals-toolbar-logo {
            width: 32px;
            height: 32px;
        }

        .reshepe-web-vitals-toolbar-logo--image {
            width: 32px;
            height: 32px;
        }
        
        .reshepe-web-vitals-toolbar-metrics {
            display: flex;
            flex-direction: row;
            gap: 0.4rem;
        }
        
        .reshepe-web-vitals-toolbar-metrics-item {
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .reshepe-web-vitals-toolbar-metrics-item-icon {
            width: 48px;
            height: 48px;
        }
        
        .reshepe-web-vitals-toolbar-metrics-item-rail {
            stroke-width: 4;
            stroke-linecap: round;
            fill: none;
            stroke-dasharray: 315px, 800px;
            stroke-dashoffset: 0;
            stroke: #5d6462;
        }
        
        .reshepe-web-vitals-toolbar-metrics-item-fill {
            stroke-width: 4;
            stroke-linecap: round;
            fill: none;
            stroke-dasharray: 0, 800px;
            stroke-dashoffset: 0;
            transform-origin: center center;
            transform: rotate(180deg);
            stroke: #76c893;
            transition: stroke-dasharray 0.6s ease-in-out;
        }
        
        .reshepe-web-vitals-toolbar-metrics-item-value {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            display: flex;
            align-items: center;
            font-size: 0.65rem;
            white-space: nowrap;
            font-family: arial, sans-serif;
        }
    </style>
`;

const value = (metric: keyof Metrics, value: number): string => metric === 'CLS'
                                                                ? value.toFixed(2)
                                                                : value.toFixed(0);

const fill = (score: number): number => {
    const max = 316; // full circle

    return score * max / 100;
};

const update = (metric: keyof Metrics, data: MetricData) => {
    const key = keys[metric];

    if (key.nodes.value) {
        key.nodes.value.textContent = value(metric, data.value);
    }

    if (key.nodes.wrapper) {
        if (data.element) {
            const el = data.element as HTMLElement;

            key.nodes.wrapper.onclick = () => {
                el.scrollIntoView({
                    behavior: 'smooth',
                });

                const previous_shadow = el.style.boxShadow;
                const previous_background = el.style.backgroundColor;

                el.style.boxShadow = `0 0 0 1px ${colors.warning}`;
                el.style.backgroundColor = colors.warning;

                setTimeout(() => {
                    el.style.boxShadow = previous_shadow;
                    el.style.backgroundColor = previous_background;
                }, 1000);
            };

            key.nodes.wrapper.style.cursor = 'pointer';
        } else {
            key.nodes.wrapper.onclick = null;
            key.nodes.wrapper.style.cursor = 'default';
        }

        if (key.nodes.fill) {
            let type: keyof typeof colors;

            if (data.score >= 90) {
                type = 'success';
            } else if (data.value >= 50) {
                type = 'warning';
            } else {
                type = 'error';
            }

            const value = fill(data.score);

            key.nodes.fill.style.strokeDasharray = `${value}px`;
            key.nodes.fill.style.stroke = colors[type];
        }
    }
};

const clear = () => {
    for (const key of Object.keys(keys) as (keyof Metrics)[]) {
        const metric = keys[key];

        if (metric.nodes.wrapper) {
            metric.nodes.wrapper.onclick = null;
            metric.nodes.wrapper.style.cursor = 'default';
        }

        if (metric.nodes.fill) {
            metric.nodes.fill.style.strokeDasharray = '0';
            metric.nodes.fill.style.stroke = colors.unknown;
        }

        if (metric.nodes.value) {
            metric.nodes.value.textContent = '-';
        }
    }
};

const init = (logo_icon: string) => {
    const wrapper = document.createElement('div');
    wrapper.id = 'reshepe-web-vitals-toolbar-wrapper';
    const shadow = wrapper.attachShadow({ mode: 'closed' });
    shadow.innerHTML = styles;
    document.body.appendChild(wrapper);

    const toolbar = document.createElement('div');
    toolbar.id = 'reshepe-web-vitals-toolbar';

    const logo = document.createElement('div');
    logo.className = 'reshepe-web-vitals-toolbar-logo';
    const logo_image = document.createElement('img');
    logo_image.className = 'reshepe-web-vitals-toolbar-logo--image';
    logo_image.src = logo_icon;
    logo_image.alt = 'reshepe logo';
    logo.appendChild(logo_image);
    toolbar.appendChild(logo);

    const metrics = document.createElement('div');
    metrics.className = 'reshepe-web-vitals-toolbar-metrics';

    for (const key of Object.keys(keys) as (keyof Metrics)[]) {
        const metric = keys[key];
        const item = document.createElement('div');
        item.id = `reshepe-web-vitals-toolbar-metrics-${metric.key}`;
        item.className = 'reshepe-web-vitals-toolbar-metrics-item';
        item.title = metric.title;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 110 110');
        svg.classList.add('reshepe-web-vitals-toolbar-metrics-item-icon');

        const rail = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const rail_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        rail_path.classList.add('reshepe-web-vitals-toolbar-metrics-item-rail');
        rail_path.setAttribute('d', 'M 55,55 m 0,50 a 50,50 0 1 1 0,-100 a 50,50 0 1 1 0,100');
        rail.appendChild(rail_path);
        svg.appendChild(rail);

        const fill = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        const fill_path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        fill_path.classList.add('reshepe-web-vitals-toolbar-metrics-item-fill');
        fill_path.setAttribute('d', 'M 55,55 m 0,50 a 50,50 0 1 1 0,-100 a 50,50 0 1 1 0,100');
        fill.appendChild(fill_path);
        svg.appendChild(fill);

        item.appendChild(svg);

        const value = document.createElement('span');
        value.className = 'reshepe-web-vitals-toolbar-metrics-item-value';
        value.textContent = '-';
        item.appendChild(value);

        metrics.appendChild(item);

        metric.nodes.wrapper = item;
        metric.nodes.fill = fill_path;
        metric.nodes.value = value;
    }

    toolbar.appendChild(metrics);

    shadow.appendChild(toolbar);

    setTimeout(() => {
        if (window.reshepe_web_vitals) {
            for (const metric of Object.keys(window.reshepe_web_vitals) as (keyof Metrics)[]) {
                window.reshepe_web_vitals[metric].forEach((data) => {
                    update(metric, data);
                });
            }
        }

        document.addEventListener('reshepe-web-vitals-data-set', ({ detail }): void => {
            update(detail.type, detail.data);
        });

        document.addEventListener('reshepe-web-vitals-data-clear', (): void => {
            clear();
        });
    }, 200);
};

export {
    init,
};


