"use strict";(()=>{var p={LCP:{key:"lcp",title:"Largest Contentful Paint",nodes:{wrapper:null,fill:null,value:null}},INP:{key:"inp",title:"Interaction to Next Paint",nodes:{wrapper:null,fill:null,value:null}},CLS:{key:"cls",title:"Cumulative Layout Shift",nodes:{wrapper:null,fill:null,value:null}},TTFB:{key:"ttfb",title:"Time to First Byte",nodes:{wrapper:null,fill:null,value:null}},FCP:{key:"fcp",title:"First Contentful Paint",nodes:{wrapper:null,fill:null,value:null}}},m={success:"#76c893",warning:"#d2b05f",error:"#87233f",unknown:"#5d6462"},y=`
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
`,k=(o,e)=>o==="CLS"?e.toFixed(2):e.toFixed(0),x=o=>o*316/100,v=(o,e)=>{let l=p[o];if(l.nodes.value&&(l.nodes.value.textContent=k(o,e.value)),l.nodes.wrapper){if(e.element){let t=e.element;l.nodes.wrapper.onclick=()=>{t.scrollIntoView({behavior:"smooth"});let r=t.style.boxShadow,n=t.style.backgroundColor;t.style.boxShadow=`0 0 0 1px ${m.warning}`,t.style.backgroundColor=m.warning,setTimeout(()=>{t.style.boxShadow=r,t.style.backgroundColor=n},1e3)},l.nodes.wrapper.style.cursor="pointer"}else l.nodes.wrapper.onclick=null,l.nodes.wrapper.style.cursor="default";if(l.nodes.fill){let t;e.score>=90?t="success":e.value>=50?t="warning":t="error";let r=x(e.score);l.nodes.fill.style.strokeDasharray=`${r}px`,l.nodes.fill.style.stroke=m[t]}}},C=()=>{for(let o of Object.keys(p)){let e=p[o];e.nodes.wrapper&&(e.nodes.wrapper.onclick=null,e.nodes.wrapper.style.cursor="default"),e.nodes.fill&&(e.nodes.fill.style.strokeDasharray="0",e.nodes.fill.style.stroke=m.unknown),e.nodes.value&&(e.nodes.value.textContent="-")}},g=o=>{let e=document.createElement("div");e.id="reshepe-web-vitals-toolbar-wrapper";let l=e.attachShadow({mode:"closed"});l.innerHTML=y,document.body.appendChild(e);let t=document.createElement("div");t.id="reshepe-web-vitals-toolbar";let r=document.createElement("div");r.className="reshepe-web-vitals-toolbar-logo";let n=document.createElement("img");n.className="reshepe-web-vitals-toolbar-logo--image",n.src=o,n.alt="reshepe logo",r.appendChild(n),t.appendChild(r);let h=document.createElement("div");h.className="reshepe-web-vitals-toolbar-metrics";for(let a of Object.keys(p)){let s=p[a],i=document.createElement("div");i.id=`reshepe-web-vitals-toolbar-metrics-${s.key}`,i.className="reshepe-web-vitals-toolbar-metrics-item",i.title=s.title;let d=document.createElementNS("http://www.w3.org/2000/svg","svg");d.setAttribute("viewBox","0 0 110 110"),d.classList.add("reshepe-web-vitals-toolbar-metrics-item-icon");let b=document.createElementNS("http://www.w3.org/2000/svg","g"),u=document.createElementNS("http://www.w3.org/2000/svg","path");u.classList.add("reshepe-web-vitals-toolbar-metrics-item-rail"),u.setAttribute("d","M 55,55 m 0,50 a 50,50 0 1 1 0,-100 a 50,50 0 1 1 0,100"),b.appendChild(u),d.appendChild(b);let f=document.createElementNS("http://www.w3.org/2000/svg","g"),c=document.createElementNS("http://www.w3.org/2000/svg","path");c.classList.add("reshepe-web-vitals-toolbar-metrics-item-fill"),c.setAttribute("d","M 55,55 m 0,50 a 50,50 0 1 1 0,-100 a 50,50 0 1 1 0,100"),f.appendChild(c),d.appendChild(f),i.appendChild(d);let w=document.createElement("span");w.className="reshepe-web-vitals-toolbar-metrics-item-value",w.textContent="-",i.appendChild(w),h.appendChild(i),s.nodes.wrapper=i,s.nodes.fill=c,s.nodes.value=w}t.appendChild(h),l.appendChild(t),setTimeout(()=>{if(window.reshepe_web_vitals)for(let a of Object.keys(window.reshepe_web_vitals))window.reshepe_web_vitals[a].forEach(s=>{v(a,s)});document.addEventListener("reshepe-web-vitals-data-set",({detail:a})=>{v(a.type,a.data)}),document.addEventListener("reshepe-web-vitals-data-clear",()=>{C()})},200)};var{logo_icon:_}=window.reshepe_web_vitals_toolbar_config;g(_);})();
