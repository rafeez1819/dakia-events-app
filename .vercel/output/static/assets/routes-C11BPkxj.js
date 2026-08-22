import{a as e,i as t,n,r,t as i}from"./consent-DJgWZ4zI.js";import{f as a,l as o,n as s,r as c}from"./index-LSKLV12F.js";var l=a(o(),1),u=`G-PK86GP1MGY`,d=`/api/collect`,f=[`quotation_submit`,`contact_form_submit`,`lead_generated`,`whatsapp_click`,`phone_click`,`email_click`,`led_quote_request`],p={quotation_submit:450,contact_form_submit:450,lead_generated:450,led_quote_request:450,rental_quote_submit:400,whatsapp_click:80,phone_click:120,email_click:60,brochure_download:40,specification_download:35},m=new Set(`page_view.session_start.first_visit.user_engagement.scroll.product_view.led_product_view.project_view.fiba_project_view.concert_project_view.exhibition_project_view.event_project_view.sports_project_view.form_start.form_submit.form_validation_error.form_submit_error.quotation_start.quotation_submit.contact_form_start.contact_form_submit.lead_generated.led_quote_request.phone_click.whatsapp_click.email_click.quote_cta_click.event_carousel_navigation.social_placeholder_click.consent_update`.split(`.`)),h=[`email`,`phone`,`phone_number`,`fullName`,`full_name`,`name`,`first_name`,`last_name`,`address`,`company`,`details`,`message`,`password`,`user_id`],g=`dakia_cid`,_=`dakia_sid`,v=18e5;function y(e){let t=new Uint8Array(8);return crypto.getRandomValues(t),`${e}.${[...t].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}function b(){try{let e=localStorage.getItem(g);if(e)return e;let t=y(`cid`);return localStorage.setItem(g,t),t}catch{return y(`cid`)}}function x(){try{let e=sessionStorage.getItem(_);if(e){let t=JSON.parse(e);if(Date.now()-t.at<v)return t.at=Date.now(),sessionStorage.setItem(_,JSON.stringify(t)),t.id}let t={id:y(`sid`),at:Date.now()};return sessionStorage.setItem(_,JSON.stringify(t)),t.id}catch{return y(`sid`)}}function S(){try{return!localStorage.getItem(`dakia_fv`)&&(localStorage.setItem(`dakia_fv`,`1`),!0)}catch{return!1}}function C(e){let t=new URLSearchParams(e),n=[`utm_source`,`utm_medium`,`utm_campaign`,`utm_content`,`utm_term`],r={};for(let e of n){let n=t.get(e);n&&(r[e]=n.slice(0,100))}if(Object.keys(r).length===0){try{let e=sessionStorage.getItem(`dakia_utm`);if(e)return JSON.parse(e)}catch{}return r}try{sessionStorage.setItem(`dakia_utm`,JSON.stringify(r))}catch{}return r}function w(e,t){let n=(e.utm_source||``).toLowerCase(),r=(e.utm_medium||``).toLowerCase();if(r===`cpc`||r===`paid`||n.includes(`googleads`))return`paid`;if(n===`linkedin`||r===`social`&&n.includes(`linkedin`))return`linkedin`;if(n===`instagram`||n===`facebook`)return`instagram`;if(n===`whatsapp`||r===`whatsapp`)return`whatsapp`;if(r===`email`)return`email`;if(n||r)return`referral`;if(!t)return`direct`;try{let e=new URL(t).hostname;if(e.includes(`google`)||e.includes(`bing`))return`organic`;if(e.includes(`linkedin`))return`linkedin`;if(e.includes(`instagram`)||e.includes(`facebook`))return`instagram`;if(typeof window<`u`&&e!==window.location.hostname)return`referral`}catch{}return`direct`}function T(){let e=navigator.userAgent;return/iPad|Tablet/i.test(e)?`tablet`:/Mobi|Android/i.test(e)?`mobile`:`desktop`}var E=new Set(h.map(e=>e.toLowerCase())),ee=/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,D=/(\+?\d[\d\s().-]{7,}\d)/g,O=30,k=200;function A(e){return e==null?null:typeof e==`boolean`||typeof e==`number`&&Number.isFinite(e)?e:String(e).slice(0,k).replace(ee,`[redacted]`).replace(D,`[redacted]`)}function j(e){let t={};if(!e)return t;let n=0;for(let[r,i]of Object.entries(e)){if(n>=O)break;let e=r.toLowerCase().slice(0,40);e&&(E.has(e)||/email|phone|name|address|password|user_id/.test(e)&&e!==`item_name`||(t[e]=A(i),n+=1))}return t}function M(e){return e.trim().toLowerCase().replace(/\s+/g,`_`).replace(/[^a-z0-9_]/g,``).slice(0,40)}function N(e){return m.has(e)}var P=!1,F=!1,I=!1,L=[];function R(){let e=window.location.hash.replace(`#`,``),t=C(window.location.search);return{page_location:window.location.href.split(`#`)[0]??window.location.href,page_title:document.title,page_referrer:document.referrer||``,content_group:e||`home`,content_type:e?`section`:`landing`,language:navigator.language,...t}}function z(e,t){window.dataLayer=window.dataLayer||[],window.dataLayer.push({event:e,...t})}function B(e,t){n()&&typeof window.gtag==`function`&&window.gtag(`event`,e,t)}function V(e){let t=JSON.stringify({...e,consent:`granted`});if(navigator.sendBeacon){let e=new Blob([t],{type:`application/json`});navigator.sendBeacon(d,e);return}fetch(d,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:t,credentials:`same-origin`,keepalive:!0}).catch(()=>{})}function H(e,t={}){if(!n())return;let r=M(e);if(!r||!N(r))return;let i=j({...R(),lead_source:w(C(window.location.search),document.referrer),device_category:T(),...t});f.includes(r)&&i.value==null&&(i.value=p[r]??0,i.currency=`AED`);let a={event:r,timestamp:Date.now(),client_id:b(),session_id:x(),origin:`live`,params:i};z(r,i),B(r,i),V(a)}function U(){if(F)return;F=!0;let e=S();x(),e&&H(`first_visit`),H(`session_start`,{screen_resolution:`${window.screen.width}x${window.screen.height}`,device_category:T(),language:navigator.language}),H(`page_view`,{page_type:`homepage`,site_section:`dakia_events`});let t=()=>{let e=Math.round((window.scrollY+window.innerHeight)/Math.max(document.body.scrollHeight,1)*100);!I&&e>=25&&(I=!0,H(`user_engagement`,{engagement_threshold:25})),e>=90&&(window.removeEventListener(`scroll`,t),H(`scroll`,{percent_scrolled:90}))};window.addEventListener(`scroll`,t,{passive:!0}),L.push(()=>window.removeEventListener(`scroll`,t));let n=()=>{document.visibilityState===`hidden`&&H(`user_engagement`,{visibility:`hidden`})};document.addEventListener(`visibilitychange`,n),L.push(()=>document.removeEventListener(`visibilitychange`,n))}function W(){r().analytics_storage===`granted`&&U()}function G(){return P?()=>{}:(P=!0,window.dataLayer=window.dataLayer||[],typeof window.gtag!=`function`&&(window.gtag=function(...e){window.dataLayer.push(e)}),n()&&U(),()=>{L.splice(0).forEach(e=>e()),P=!1,F=!1,I=!1})}function K(){if(document.getElementById(`ga4-gtag`))return;window.dataLayer=window.dataLayer||[],window.gtag=function(...e){window.dataLayer.push(e)},window.gtag(`consent`,`default`,{analytics_storage:`denied`,ad_storage:`denied`,ad_user_data:`denied`,ad_personalization:`denied`,functionality_storage:`granted`,personalization_storage:`denied`,security_storage:`granted`,wait_for_update:500}),window.gtag(`js`,new Date),window.gtag(`config`,u,{anonymize_ip:!0,allow_google_signals:!1,send_page_view:!1});let e=document.createElement(`script`);e.id=`ga4-gtag`,e.async=!0,e.src=`https://www.googletagmanager.com/gtag/js?id=${u}`,document.head.appendChild(e)}var q=c();function J(){return{analytics_storage:`granted`,ad_storage:`denied`,ad_user_data:`denied`,ad_personalization:`denied`,decided:!0,updatedAt:new Date().toISOString()}}function Y(){return{analytics_storage:`denied`,ad_storage:`denied`,ad_user_data:`denied`,ad_personalization:`denied`,decided:!0,updatedAt:new Date().toISOString()}}function X(){let[e,n]=(0,l.useState)(!1);if((0,l.useEffect)(()=>{n(!r().decided)},[]),!e)return null;let a=e=>{t(e),i(e),e.analytics_storage===`granted`&&(W(),H(`consent_update`,{analytics_storage:`granted`})),n(!1)};return(0,q.jsx)(`div`,{className:`fixed inset-x-0 bottom-0 z-[1200] p-4 md:p-6`,children:(0,q.jsxs)(`div`,{className:`mx-auto flex max-w-5xl flex-col gap-4 border border-gold/25 bg-ink/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur-md md:flex-row md:items-end md:justify-between md:p-6`,children:[(0,q.jsxs)(`div`,{className:`max-w-xl`,children:[(0,q.jsx)(`p`,{className:`font-cond text-[11px] tracking-[0.28em] text-gold uppercase`,children:`Consent Mode v2`}),(0,q.jsx)(`p`,{className:`mt-2 font-display text-2xl tracking-wide text-paper`,children:`MEASUREMENT CHOICE`}),(0,q.jsxs)(`p`,{className:`mt-2 text-sm leading-relaxed text-mute`,children:[`Analytics is off until you choose. Google Analytics and the first-party Intelligence collector both stay silent unless you accept. Names, emails and phone numbers are never sent to measurement.`,` `,(0,q.jsx)(`a`,{className:`text-gold underline-offset-4 hover:underline`,href:`/privacy`,children:`Privacy Policy`}),`.`]})]}),(0,q.jsxs)(`div`,{className:`flex flex-col gap-2 sm:flex-row`,children:[(0,q.jsx)(`button`,{type:`button`,className:`min-h-11 border border-gold/30 px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-paper uppercase hover:border-gold`,onClick:()=>a(Y()),children:`Essential only`}),(0,q.jsx)(`button`,{type:`button`,className:`min-h-11 bg-gold px-5 py-2.5 font-cond text-xs tracking-[0.18em] text-ink uppercase hover:bg-gold-2`,onClick:()=>a(J()),children:`Accept analytics`})]})]})})}function Z(){return(0,q.jsxs)(s,{to:`/intel`,"aria-label":`Open Website Intelligence`,className:`fixed right-4 bottom-24 z-[1100] flex min-h-11 items-center gap-2 border border-gold/40 bg-ink/90 px-3 py-2 text-gold shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-sm hover:border-gold hover:bg-ink md:right-6 md:bottom-8`,children:[(0,q.jsx)(e,{className:`size-4`,strokeWidth:1.6}),(0,q.jsx)(`span`,{className:`font-cond text-[11px] tracking-[0.22em] uppercase`,children:`Intel`})]})}function Q({children:e,dock:t=!0}){return(0,l.useEffect)(()=>{K();let e=r();return e.decided&&i(e),G()},[]),(0,q.jsxs)(q.Fragment,{children:[e,(0,q.jsx)(X,{}),t?(0,q.jsx)(Z,{}):null]})}var te=`<a class="skip-link" href="#main">Skip to content</a>

<!-- Cursor -->
<div class="cursor" id="cursor" aria-hidden="true"></div>
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>

<!-- Mobile Nav -->
<div class="mobile-nav" id="mobileNav" role="dialog" aria-modal="true" aria-label="Mobile navigation" hidden>
  <a href="#about" onclick="closeMobile()">About</a>
  <a href="#services" onclick="closeMobile()">Services</a>
  <a href="#events" onclick="closeMobile()">Events</a>
  <a href="#capabilities" onclick="closeMobile()">Capabilities</a>
  <a href="#process" onclick="closeMobile()">Process</a>
  <a href="#projects" onclick="closeMobile()">Projects</a>
  <a href="#contact" onclick="closeMobile()">Contact</a>
</div>

<!-- Navigation -->
<nav id="mainNav" role="navigation" aria-label="Primary navigation">
  <a href="#hero" class="nav-logo" aria-label="Dakia Events home">
    <img src="/assets/dakia-logo.webp" alt="" width="40" height="40" onerror="this.onerror=null;this.src='/assets/dakia-logo.png';" fetchpriority="high">
    <span class="nav-logo-wordmark"><strong>DAKIA</strong><small>EVENTS</small></span>
  </a>
  <div class="nav-links" id="desktopNav">
    <a href="#about">About</a>
    <a href="#services">Services</a>
    <a href="#events">Events</a>
    <a href="#capabilities">Capabilities</a>
    <a href="#process">Process</a>
    <a href="#projects">Projects</a>
    <a href="#contact" class="nav-cta" data-track="quote_cta_click">Get a Quote</a>
  </div>
  <button class="hamburger" id="hamburger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="mobileNav" onclick="toggleMobile()">
    <span></span><span></span><span></span>
  </button>
</nav>

<main id="main">

<!-- HERO -->
<section id="hero" aria-labelledby="heroTitle">
  <div class="hero-bg" aria-hidden="true"></div>
  <div class="hero-grid-lines" aria-hidden="true"></div>
  <div class="hero-scan" aria-hidden="true"></div>

  <div class="hero-tag reveal">Dakia Events · Arena Operations Excellence</div>
  <h1 id="heroTitle" class="hero-title reveal reveal-delay-1">
    DAKIA
    <span class="line2">PRODUCTIONS</span>
    <span class="line3">Ajman · United Arab Emirates</span>
  </h1>

  <div class="hero-bottom">
    <p class="hero-desc reveal reveal-delay-2">
      We engineer <strong>unforgettable live experiences</strong>. From intimate corporate gatherings to stadium-scale concerts, Dakia deploys cutting-edge LED, sound, lighting, and staging solutions across the UAE and GCC.
    </p>
    <div class="hero-cta reveal reveal-delay-3">
      <a href="#contact" class="btn-primary" data-track="services_cta_click">Request a Quote <span style="margin-left:0.5rem">→</span></a>
      <a href="#services" class="btn-outline">Our Services</a>
    </div>
  </div>

  <div class="hero-contact-strip reveal reveal-delay-3" aria-label="Contact information">
    <a href="#contact" aria-label="Location"><span>⌖</span><span>Ajman, UAE</span></a>
    <a href="tel:+971545826560" data-track="phone_click" aria-label="Call Dakia Events"><span>◯</span><span>+971 54 582 6560</span></a>
    <a href="mailto:info@dakiaevents.com" data-track="email_click" aria-label="Email Dakia Events"><span>✉</span><span>info@dakiaevents.com</span></a>
  </div>

  <div class="hero-scroll" aria-hidden="true">
    <div class="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

<!-- STATS TICKER -->
<div class="stats-bar" aria-label="Dakia Events statistics">
  <div class="stats-ticker" id="ticker">
    <div class="stat-item"><span class="stat-num">500+</span><div class="stat-label">Events<br>Delivered</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">8K+</span><div class="stat-label">LED Panel<br>Inventory</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">100+</span><div class="stat-label">Corporate<br>Clients</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">15+</span><div class="stat-label">Years<br>Experience</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">2 MVA</span><div class="stat-label">Power<br>Capacity</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">300+</span><div class="stat-label">Moving<br>Lights</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">24/7</span><div class="stat-label">On-site<br>Support</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">GCC</span><div class="stat-label">Regional<br>Coverage</div></div>
    <!-- Duplicate for seamless loop -->
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">500+</span><div class="stat-label">Events<br>Delivered</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">8K+</span><div class="stat-label">LED Panel<br>Inventory</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">100+</span><div class="stat-label">Corporate<br>Clients</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">15+</span><div class="stat-label">Years<br>Experience</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">2 MVA</span><div class="stat-label">Power<br>Capacity</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">300+</span><div class="stat-label">Moving<br>Lights</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">24/7</span><div class="stat-label">On-site<br>Support</div></div>
    <div class="stat-div"></div>
    <div class="stat-item"><span class="stat-num">GCC</span><div class="stat-label">Regional<br>Coverage</div></div>
  </div>
</div>

<!-- ABOUT -->
<section id="about" class="section-pad" aria-labelledby="aboutTitle">
  <div class="about-grid">
    <div class="about-text">
      <div class="section-tag reveal">Who We Are</div>
      <h2 id="aboutTitle" class="section-title reveal reveal-delay-1">BUILDING <em>STAGES</em><br>THAT DEFINE<br>MOMENTS</h2>
      <div class="gold-line reveal reveal-delay-2"></div>
      <p class="reveal reveal-delay-2">
        Dakia is a professional arena operations and event production company headquartered in <strong>Ajman, UAE</strong>. We are the technical backbone behind some of the region's most impactful live events — from sports venues and corporate conferences to large-format concerts and exhibitions.
      </p>
      <p class="reveal reveal-delay-3">
        From high-definition <strong>LED video walls</strong> and precision <strong>sound systems</strong> to architectural <strong>lighting designs</strong> and engineered <strong>stage platforms</strong>, every element we deploy is chosen and operated to deliver maximum visual and acoustic impact.
      </p>
      <div class="about-values reveal reveal-delay-3">
        <div class="value-card">
          <div class="value-num">01</div>
          <div class="value-title">Technical Excellence</div>
          <div class="value-desc">Latest generation equipment maintained to the highest standards of performance and reliability.</div>
        </div>
        <div class="value-card">
          <div class="value-num">02</div>
          <div class="value-title">On-Time Delivery</div>
          <div class="value-desc">Rigorous project timelines backed by experienced logistics and operations teams.</div>
        </div>
        <div class="value-card">
          <div class="value-num">03</div>
          <div class="value-title">Safety First</div>
          <div class="value-desc">Full HSE compliance on every project, with certified rigging and electrical procedures.</div>
        </div>
        <div class="value-card">
          <div class="value-num">04</div>
          <div class="value-title">Client-Centric</div>
          <div class="value-desc">Every solution is custom-built around your event's unique creative and technical vision.</div>
        </div>
      </div>
    </div>
    <div class="about-visual reveal reveal-delay-2">
      <div class="about-img-frame">
        <div class="about-img-inner">
          <div class="stage-icon" aria-hidden="true"></div>
          <div class="frame-label">DAKIA<br>EVENTS</div>
        </div>
      </div>
      <div class="about-corner-tag">
        <div class="about-corner-num">UAE</div>
        <div class="about-corner-txt">Ajman Based</div>
      </div>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section id="services" class="section-pad" aria-labelledby="servicesTitle">
  <div class="services-header">
    <div>
      <div class="section-tag reveal">What We Do</div>
      <h2 id="servicesTitle" class="section-title reveal reveal-delay-1">TECHNICAL<br><em>SERVICES</em></h2>
    </div>
    <p class="services-intro reveal reveal-delay-2">Every discipline in-house. From concept to strike, Dakia handles the full technical scope of your event production across the UAE and GCC.</p>
  </div>
  <div class="services-grid">

    <div class="service-card featured reveal">
      <div class="feat-badge">
        <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true"><circle cx="4" cy="4" r="3" fill="currentColor"/></svg>
        Flagship Service
      </div>
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="1"/><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      </div>
      <div class="service-num">01</div>
      <div class="service-title">LED Video Walls</div>
      <div class="service-desc">High-resolution indoor and outdoor LED display solutions engineered for maximum visual impact. Our pixel-perfect panels transform any space into an immersive visual environment.</div>
      <ul class="service-features">
        <li>Indoor &amp; Outdoor LED Panels</li>
        <li>Pixel Pitch from 1.9mm to 10mm</li>
        <li>Real-time Video Processing</li>
        <li>Custom Configurations</li>
        <li>Seamless Tiling Technology</li>
      </ul>
    </div>

    <div class="service-card reveal reveal-delay-1">
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
      </div>
      <div class="service-num">02</div>
      <div class="service-title">Sound Systems</div>
      <div class="service-desc">Professional audio solutions that fill every seat with crystal-clear sound. From line array systems for concert venues to intimate conference audio configurations.</div>
      <ul class="service-features">
        <li>Line Array Speaker Systems</li>
        <li>Wireless Microphone Rigs</li>
        <li>Live Sound Engineering</li>
        <li>Conference Audio Solutions</li>
        <li>Delay &amp; Fill Speakers</li>
      </ul>
    </div>

    <div class="service-card reveal reveal-delay-2">
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
      </div>
      <div class="service-num">03</div>
      <div class="service-title">Lighting Systems</div>
      <div class="service-desc">Intelligent lighting design that transforms atmosphere and amplifies your event's energy. Moving heads, architectural wash, beam packages, and special effects all under one contract.</div>
      <ul class="service-features">
        <li>Intelligent Moving Lights</li>
        <li>Architectural Wash Lighting</li>
        <li>Special FX (Haze, Pyro-safe)</li>
        <li>Lighting Design &amp; Programming</li>
        <li>LED Strip &amp; Pixel Mapping</li>
      </ul>
    </div>

    <div class="service-card reveal">
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><rect x="3" y="17" width="18" height="2"/><polygon points="3 17 7 5 12 12 16 8 21 17"/></svg>
      </div>
      <div class="service-num">04</div>
      <div class="service-title">Stage &amp; Rigging</div>
      <div class="service-desc">Custom stage structures, truss systems, and certified rigging solutions engineered for safety and spectacle. We design and build stages for the largest and most demanding events in the region.</div>
      <ul class="service-features">
        <li>Modular Stage Platforms</li>
        <li>Truss &amp; Ground Support</li>
        <li>Certified Rigging Operations</li>
        <li>Custom Stage Fabrication</li>
        <li>Load Calculation &amp; Engineering</li>
      </ul>
    </div>

    <div class="service-card reveal reveal-delay-1">
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </div>
      <div class="service-num">05</div>
      <div class="service-title">Event Production</div>
      <div class="service-desc">Complete end-to-end event technical management. We embed our project team into your event, coordinating all technical disciplines from pre-production planning through live execution and de-rig.</div>
      <ul class="service-features">
        <li>Full Technical Direction</li>
        <li>Conference AV Setup</li>
        <li>Exhibition Booth Support</li>
        <li>Live Event Coordination</li>
        <li>On-site Technical Crew</li>
      </ul>
    </div>

    <div class="service-card reveal reveal-delay-2">
      <div class="service-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      </div>
      <div class="service-num">06</div>
      <div class="service-title">AV Rental &amp; Consultation</div>
      <div class="service-desc">Flexible dry and wet hire of professional AV equipment, plus strategic technical consultation to plan and budget your event's technical requirements before a single item ships.</div>
      <ul class="service-features">
        <li>Dry &amp; Wet Hire Available</li>
        <li>Equipment Consultation</li>
        <li>Technical Rider Fulfillment</li>
        <li>Delivery &amp; Collection</li>
        <li>Technical Documentation</li>
      </ul>
    </div>

  </div>
</section>

<!-- EVENTS WE SERVE -->
<section id="events" class="section-pad" aria-labelledby="eventsTitle">
  <div class="events-header">
    <div>
      <div class="section-tag reveal">Our Expertise</div>
      <h2 id="eventsTitle" class="section-title reveal reveal-delay-1">EVENT <em>TYPES</em></h2>
    </div>
    <div class="events-nav">
      <button class="ev-nav-btn" id="evPrev" type="button" aria-label="Previous events">
        <svg viewBox="0 0 16 16" aria-hidden="true"><polyline points="10 12 6 8 10 4"/></svg>
      </button>
      <button class="ev-nav-btn" id="evNext" type="button" aria-label="Next events">
        <svg viewBox="0 0 16 16" aria-hidden="true"><polyline points="6 4 10 8 6 12"/></svg>
      </button>
    </div>
  </div>
  <div class="events-scroll-wrap">
    <div class="events-track" id="eventsTrack" tabindex="0" aria-label="Event types carousel">

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-1.jpg" alt="Sports event with Dakia LED video wall and arena production" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Arena Sports · FIBA</div>
          <div class="event-name">Sports Events</div>
          <div class="event-tech">Scoreboard LED displays · Stadium PA · Broadcast-ready lighting · Pitch-level staging</div>
        </div>
      </article>

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-2.jpg" alt="Concert production with Dakia lighting, LED and sound systems" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Live Entertainment</div>
          <div class="event-name">Music Concerts</div>
          <div class="event-tech">Massive LED backdrops · Line array PA · Moving light rigs · Custom stage build</div>
        </div>
      </article>

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-3.jpg" alt="Corporate event AV production and LED video wall by Dakia" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Corporate</div>
          <div class="event-name">Corporate Events</div>
          <div class="event-tech">Presentation LED walls · Conference audio · Podium lighting · IMAG camera screens</div>
        </div>
      </article>

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-4.jpg" alt="Exhibition booth LED and AV technology by Dakia Events" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Exhibitions &amp; Trade Shows</div>
          <div class="event-name">Exhibitions</div>
          <div class="event-tech">Booth LED solutions · Ambient audio · Accent lighting · Modular display units</div>
        </div>
      </article>

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-5.jpg" alt="Conference AV setup, LED wall and sound by Dakia Events" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Corporate</div>
          <div class="event-name">Conferences</div>
          <div class="event-tech">Presentation LED walls · Conference audio · Podium lighting · IMAG screens</div>
        </div>
      </article>

      <article class="event-card">
        <div class="event-visual">
          <img src="/assets/event-6.jpg" alt="Private event lighting and production services by Dakia" loading="lazy">
        </div>
        <div class="event-info">
          <div class="event-type">Private &amp; Lifestyle</div>
          <div class="event-name">Private Events</div>
          <div class="event-tech">Ambient LED installations · Boutique sound systems · Designer lighting · VIP staging</div>
        </div>
      </article>

    </div>
  </div>
</section>

<!-- CLIENTS -->
<section id="clients" class="section-pad" aria-labelledby="clientsTitle">
  <div style="text-align:center;max-width:900px;margin:0 auto;">
    <div class="section-tag reveal" style="justify-content:center;">Trusted By</div>
    <h2 id="clientsTitle" class="section-title reveal reveal-delay-1">OUR <em>CLIENTS</em></h2>
    <div class="clients-image-wrap reveal reveal-delay-2">
      <img src="/assets/client-logos.jpg" alt="Selected clients and partners that trust Dakia Events for LED, AV and event production" loading="lazy">
    </div>
    <p class="reveal reveal-delay-3" style="font-size:0.85rem;color:var(--muted2);margin-top:2rem;font-style:italic;">We work with leading corporates, government bodies, hospitality groups, and event agencies across the UAE and GCC.</p>
  </div>
</section>

<!-- CAPABILITIES -->
<section id="capabilities" class="section-pad" aria-labelledby="capTitle">
  <div class="cap-grid">
    <div>
      <div class="section-tag reveal">Deep Expertise</div>
      <h2 id="capTitle" class="section-title reveal reveal-delay-1">TECHNICAL<br><em>CAPABILITIES</em></h2>
      <div class="gold-line reveal reveal-delay-2"></div>
      <div class="cap-list reveal reveal-delay-2">
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">LED Pixel Processing</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Real-time 4K video signal processing, mapping, and blending across multi-panel LED arrays using industry-standard Novastar and Brompton processors.</div>
        </div>
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">Line Array System Design</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Acoustic modelling and system tuning using EASE and Rational Acoustics Smaart software, ensuring even coverage from front of house to the back row.</div>
        </div>
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">Lighting Programming &amp; Control</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Full DMX512 and ArtNet control via MA Lighting, ChamSys, and custom media server setups for pixel-mapped and generative show environments.</div>
        </div>
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">Structural Engineering &amp; Rigging</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Certified rigging operations with full load calculations, truss engineering drawings, and compliance with UAE and international ESTA rigging standards.</div>
        </div>
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">Sports &amp; FIBA Venue Technology</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Venue-ready LED courtside systems, scoreboards, 24-second shot clocks, ribbon displays, broadcast-calibrated lighting and technical ground support for basketball and multi-sport environments.</div>
        </div>
        <div class="cap-item">
          <div class="cap-item-header">
            <div class="cap-item-title">Power Distribution &amp; Management</div>
            <div class="cap-arrow" aria-hidden="true"><svg viewBox="0 0 10 10"><polyline points="2 8 8 2"/><polyline points="3 2 8 2 8 7"/></svg></div>
          </div>
          <div class="cap-item-desc">Clean power distribution with load balancing, generator tie-in, and UPS backup solutions to guarantee zero interruptions during live events.</div>
        </div>
      </div>
    </div>
    <div class="cap-visual reveal reveal-delay-3">
      <div class="tech-specs">
        <div class="tech-specs-header">
          <div class="tech-specs-title">Equipment Readiness</div>
          <div class="live-dot" aria-hidden="true"></div>
        </div>
        <div class="specs-list">
          <div class="spec-row">
            <div class="spec-name">LED Inventory</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:92%; animation-delay:0.1s"></div></div>
            <div class="spec-val">8K+ panels</div>
          </div>
          <div class="spec-row">
            <div class="spec-name">Audio Systems</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:85%; animation-delay:0.2s"></div></div>
            <div class="spec-val">150kW+</div>
          </div>
          <div class="spec-row">
            <div class="spec-name">Moving Lights</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:78%; animation-delay:0.3s"></div></div>
            <div class="spec-val">300+ units</div>
          </div>
          <div class="spec-row">
            <div class="spec-name">Truss Stock</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:88%; animation-delay:0.4s"></div></div>
            <div class="spec-val">2,000m+</div>
          </div>
          <div class="spec-row">
            <div class="spec-name">Stage Decks</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:72%; animation-delay:0.5s"></div></div>
            <div class="spec-val">500m²</div>
          </div>
          <div class="spec-row">
            <div class="spec-name">Generator Capacity</div>
            <div class="spec-bar-wrap"><div class="spec-bar" style="width:95%; animation-delay:0.6s"></div></div>
            <div class="spec-val">2 MVA</div>
          </div>
        </div>
      </div>

      <div style="margin-top:1.5rem; border:1px solid var(--border2); background:var(--black2); padding:2rem;">
        <div class="section-tag" style="margin-bottom:1rem;">Our Reach</div>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);">
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)">Ajman</span>
            <span style="font-family:'Bebas Neue',sans-serif;color:var(--gold);font-size:0.9rem;letter-spacing:0.1em">HQ / Base</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);">
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)">Dubai · Abu Dhabi · Sharjah</span>
            <span style="font-family:'Bebas Neue',sans-serif;color:var(--white2);font-size:0.9rem;letter-spacing:0.1em">UAE Coverage</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;border-bottom:1px solid var(--border2);">
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)">KSA · Qatar · Kuwait</span>
            <span style="font-family:'Bebas Neue',sans-serif;color:var(--white2);font-size:0.9rem;letter-spacing:0.1em">GCC Export</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem 0;">
            <span style="font-family:'Barlow Condensed',sans-serif;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--muted)">Beyond GCC</span>
            <span style="font-family:'Bebas Neue',sans-serif;color:var(--muted2);font-size:0.9rem;letter-spacing:0.1em">On Request</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PROCESS -->
<section id="process" class="section-pad" aria-labelledby="processTitle">
  <div style="text-align:center;max-width:700px;margin:0 auto 5rem;">
    <div class="section-tag reveal" style="justify-content:center;text-align:center;">How We Work</div>
    <h2 id="processTitle" class="section-title reveal reveal-delay-1">FROM BRIEF TO <em>SHOWTIME.</em></h2>
    <p class="reveal reveal-delay-2" style="font-size:0.95rem;color:var(--muted);line-height:1.8;margin-top:1.5rem;">From your first call to final de-rig, every stage is managed with precision, transparency and clear communication.</p>
  </div>
  <div class="process-steps">
    <div class="process-step reveal">
      <div class="step-num-wrap"><div class="step-num">01</div></div>
      <div class="step-title">Brief &amp; Site Survey</div>
      <div class="step-desc">We listen, ask the right questions, and map your creative vision against venue and technical reality.</div>
    </div>
    <div class="process-step reveal reveal-delay-1">
      <div class="step-num-wrap"><div class="step-num">02</div></div>
      <div class="step-title">Technical Design</div>
      <div class="step-desc">Technical drawings, system schematics, and 3D stage visualizations crafted by our in-house team.</div>
    </div>
    <div class="process-step reveal reveal-delay-2">
      <div class="step-num-wrap"><div class="step-num">03</div></div>
      <div class="step-title">Production &amp; Testing</div>
      <div class="step-desc">Systems are prepped, racked and bench-tested in our warehouse before a single truck rolls.</div>
    </div>
    <div class="process-step reveal reveal-delay-3">
      <div class="step-num-wrap"><div class="step-num">04</div></div>
      <div class="step-title">Live Delivery &amp; Support</div>
      <div class="step-desc">Seamless build, full technical rehearsal and expert live show operation — on-site the entire time.</div>
    </div>
  </div>
</section>

<!-- PROJECTS FOCUS -->
<section id="projects" class="section-pad" aria-labelledby="projectsTitle">
  <div style="max-width:1400px;margin:0 auto;">
    <div>
      <div class="section-tag reveal">Selected Focus</div>
      <h2 id="projectsTitle" class="section-title reveal reveal-delay-1">PROJECTS &amp; <em>EVENT TECHNOLOGY</em></h2>
    </div>
    <div class="project-grid">
      <article class="project-card reveal">
        <b>Sports &amp; FIBA</b>
        <span>LED courtside systems · scoreboards · ribbon displays · shot clocks · broadcast-calibrated lighting · technical ground support for basketball and arena sports environments.</span>
      </article>
      <article class="project-card reveal reveal-delay-1">
        <b>Corporate &amp; Conferences</b>
        <span>Main-stage LED walls · projection mapping · wireless mics · conference audio · intelligent lighting · show control · IMAG camera systems.</span>
      </article>
      <article class="project-card reveal reveal-delay-2">
        <b>Concerts &amp; Live Shows</b>
        <span>Large-format LED backdrops · FOH/BOH audio systems · line arrays · moving-head lighting packages · custom stage build · rigging and ground support.</span>
      </article>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials" class="section-pad" aria-labelledby="testiTitle">
  <div style="max-width:1400px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div class="section-tag reveal">Client Voices</div>
        <h2 id="testiTitle" class="section-title reveal reveal-delay-1">WHAT THEY <em>SAY</em></h2>
      </div>
    </div>
    <div class="testimonials-grid">
      <article class="testi-card reveal">
        <span class="testi-quote" aria-hidden="true">"</span>
        <div class="star-row" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        <p class="testi-text">The LED wall Dakia installed for our product launch was flawless. Every pixel was calibrated perfectly and the visual impact had our guests genuinely stunned. These are pros who understand luxury events in the UAE.</p>
        <div class="testi-author">
          <div class="testi-avatar" aria-hidden="true">AH</div>
          <div>
            <div class="testi-name">Ahmed Hassan</div>
            <div class="testi-role">Events Director, Dubai Corporate Group</div>
          </div>
        </div>
      </article>
      <article class="testi-card reveal reveal-delay-1">
        <span class="testi-quote" aria-hidden="true">"</span>
        <div class="star-row" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        <p class="testi-text">We've used Dakia for three consecutive annual conferences. Their crew is incredibly efficient, the audio was perfect in a 3,000-seat ballroom, and they never missed a cue. Total professionals.</p>
        <div class="testi-author">
          <div class="testi-avatar" aria-hidden="true">SQ</div>
          <div>
            <div class="testi-name">Sara Al Qassimi</div>
            <div class="testi-role">Operations Manager, Expo Authority UAE</div>
          </div>
        </div>
      </article>
      <article class="testi-card reveal reveal-delay-2">
        <span class="testi-quote" aria-hidden="true">"</span>
        <div class="star-row" aria-hidden="true"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        <p class="testi-text">Our music festival had 15,000 attendees and Dakia's stage build and sound system performed beyond our expectations. The rig looked spectacular and sounded even better. Booking them again next year.</p>
        <div class="testi-author">
          <div class="testi-avatar" aria-hidden="true">MR</div>
          <div>
            <div class="testi-name">Majid Al Rashidi</div>
            <div class="testi-role">Founder, Gulf Entertainment Agency</div>
          </div>
        </div>
      </article>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="section-pad" aria-labelledby="contactTitle">
  <div class="contact-wrap">
    <div class="contact-info">
      <div>
        <div class="section-tag reveal">Let's Create Something</div>
        <h2 id="contactTitle" class="section-title reveal reveal-delay-1">EXTRAORDINARY<br><em>TOGETHER.</em></h2>
        <div class="gold-line reveal reveal-delay-2"></div>
        <p class="reveal reveal-delay-2">Tell us about your event and our team will get back to you with the perfect technical solution. Whether you're planning a stadium concert or a boardroom conference, we have the team and technology to make it exceptional.</p>
      </div>

      <div class="quick-links reveal reveal-delay-2">
        <a href="https://wa.me/971525089299" target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp<small>+971 52 508 9299</small></a>
        <a href="tel:+971545826560" data-track="phone_click">Call Us<small>+971 54 582 6560</small></a>
        <a href="mailto:info@dakia-events.com" data-track="email_click">Email Us<small>info@dakia-events.com</small></a>
        <a href="#about">Our Location<small>Ajman, United Arab Emirates</small></a>
      </div>

      <div class="contact-detail reveal reveal-delay-3">
        <div class="detail-item">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </div>
          <div>
            <div class="detail-label">Location</div>
            <div class="detail-val">Ajman, United Arab Emirates</div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.59 3.47 2 2 0 0 1 3.56 1.29h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.81-.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          </div>
          <div>
            <div class="detail-label">Phone · WhatsApp</div>
            <div class="detail-val"><a href="tel:+97152 508 9299" data-track="phone_click">+971 52 508 9299</a></div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div>
            <div class="detail-label">Email</div>
            <div class="detail-val"><a href="mailto:info@dakia-events.com" data-track="email_click">info@dakia-events.com</a></div>
          </div>
        </div>
        <div class="detail-item">
          <div class="detail-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div>
            <div class="detail-label">Response Time</div>
            <div class="detail-val">Within 2 business hours</div>
          </div>
        </div>
      </div>
    </div>

    <form id="quoteForm" class="contact-form reveal reveal-delay-2" novalidate>
      <input class="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">
      <div class="form-row">
        <div class="form-group">
          <label for="fullName">Full Name *</label>
          <input id="fullName" name="fullName" type="text" autocomplete="name" minlength="2" maxlength="100" required placeholder="Your name">
          <span class="error" id="fullNameError" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="company">Company</label>
          <input id="company" name="company" type="text" autocomplete="organization" maxlength="120" placeholder="Your company">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input id="email" name="email" type="email" autocomplete="email" maxlength="160" required placeholder="you@example.com">
          <span class="error" id="emailError" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="30" required placeholder="+971 50 123 4567">
          <span class="error" id="phoneError" role="alert"></span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="eventType">Event Type *</label>
          <select id="eventType" name="eventType" required>
            <option value="">Select event type</option>
            <option>Sports / FIBA</option>
            <option>Music Concert</option>
            <option>Corporate Event</option>
            <option>Concert / Live Show</option>
            <option>Exhibition</option>
            <option>Conference</option>
            <option>Government Event</option>
            <option>Wedding / Private Event</option>
            <option>Other</option>
          </select>
          <span class="error" id="eventTypeError" role="alert"></span>
        </div>
        <div class="form-group">
          <label for="eventDate">Event Date</label>
          <input id="eventDate" name="eventDate" type="date">
        </div>
      </div>
      <div class="form-group">
        <label for="budget">Estimated Budget</label>
        <select id="budget" name="budget">
          <option value="">Select range (optional)</option>
          <option>Under AED 10,000</option>
          <option>AED 10,000 – 50,000</option>
          <option>AED 50,000 – 150,000</option>
          <option>AED 150,000 – 500,000</option>
          <option>AED 500,000+</option>
        </select>
      </div>
      <div class="form-group">
        <label for="details">Tell us about your event *</label>
        <textarea id="details" name="details" minlength="20" maxlength="3000" required placeholder="Date, venue, audience size, specific technical requirements, preferred vendors or riders…"></textarea>
        <span class="error" id="detailsError" role="alert"></span>
      </div>
      <div class="form-submit">
        <button id="submitBtn" class="btn-primary" type="submit">Send Inquiry <span style="margin-left:0.5rem">→</span></button>
        <p id="formStatus" class="form-status" role="status" aria-live="polite"></p>
      </div>
      <p class="privacy-note">By submitting this form, you agree that Dakia Events may use the provided information to respond to your enquiry. Read our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms &amp; Conditions</a>.</p>
    </form>
  </div>
</section>

</main>

<!-- FOOTER -->
<footer role="contentinfo">
  <div class="footer-main">
    <div class="footer-brand">
      <a href="#hero" class="nav-logo" aria-label="Dakia Events home">
        <img src="/assets/dakia-logo.webp" alt="" width="40" height="40" onerror="this.onerror=null;this.src='/assets/dakia-logo.png';">
        <span class="nav-logo-wordmark"><strong>DAKIA</strong><small>EVENTS</small></span>
      </a>
      <p>Professional arena operations and event production company based in Ajman, UAE. Delivering world-class LED, sound, lighting, staging and technical event production across the UAE and GCC — including FIBA and sports venue technology.</p>
      <div class="footer-social">
        <a class="social-btn" href="#" aria-label="LinkedIn" data-social="linkedin">IN</a>
        <a class="social-btn" href="#" aria-label="Instagram" data-social="instagram">IG</a>
        <a class="social-btn" href="#" aria-label="YouTube" data-social="youtube">YT</a>
        <a class="social-btn" href="https://wa.me/971525089299" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">WA</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Services</h4>
      <div class="footer-links">
        <a href="#services">LED Video Walls</a>
        <a href="#services">Sound Systems</a>
        <a href="#services">Lighting Design</a>
        <a href="#services">Stage &amp; Rigging</a>
        <a href="#services">Event Production</a>
        <a href="#services">AV Rental</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Events</h4>
      <div class="footer-links">
        <a href="#events">Sports &amp; FIBA</a>
        <a href="#events">Music Concerts</a>
        <a href="#events">Corporate Events</a>
        <a href="#events">Conferences</a>
        <a href="#events">Exhibitions</a>
        <a href="#events">Private Events</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <div class="footer-links">
        <a href="#about">About Dakia</a>
        <a href="#capabilities">Capabilities</a>
        <a href="#process">Our Process</a>
        <a href="#projects">Projects</a>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms &amp; Conditions</a>
        <a href="/intel">Sitemap</a>
        <a href="#contact">Contact Us</a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <div class="footer-copy">© 2026 Dakia Events · Ajman, UAE. All Rights Reserved.</div>
    <div class="footer-copy">LED · AV · SOUND · LIGHTING · STAGING · EVENT PRODUCTION</div>
  </div>
</footer>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://dakia-events.com/#organization",
  "name": "Dakia Events",
  "legalName": "Dakia Productions",
  "url": "https://dakia-events.com/",
  "logo": "/assets/dakia-logo.png",
  "email": "info@dakiaevents.com",
  "telephone": "+971545826560",
  "priceRange": "$$",
  "currenciesAccepted": "AED",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ajman",
    "addressRegion": "Ajman",
    "addressCountry": "AE"
  },
  "areaServed": ["Ajman", "Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"]
}
<\/script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": "https://dakia-events.com/#organization",
  "name": "Dakia Events",
  "legalName": "Dakia Productions",
  "url": "https://dakia-events.com/",
  "logo": "/assets/dakia-logo.png",
  "email": "info@dakiaevents.com",
  "telephone": "+971545826560",
  "priceRange": "$$",
  "currenciesAccepted": "AED",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ajman",
    "addressRegion": "Ajman",
    "addressCountry": "AE"
  },
  "areaServed": ["Ajman", "Dubai", "Abu Dhabi", "Sharjah", "United Arab Emirates"]
}
<\/script>
`;function ne(e){let t=e.toLowerCase();return t.includes(`led`)?`LED_VIDEO_WALL`:t.includes(`sound`)?`SOUND_SYSTEM`:t.includes(`light`)?`LIGHTING`:t.includes(`stage`)||t.includes(`rigging`)?`STAGE_RIGGING`:t.includes(`production`)?`EVENT_PRODUCTION`:t.includes(`rental`)||t.includes(`av`)?`AV_RENTAL`:`UNKNOWN`}function $(e){let t=e.toLowerCase();return t.includes(`sport`)||t.includes(`fiba`)?`SPORTS`:t.includes(`concert`)||t.includes(`music`)?`CONCERT`:t.includes(`exhibit`)?`EXHIBITION`:t.includes(`conference`)?`CONFERENCE`:t.includes(`corporate`)?`CORPORATE`:t.includes(`private`)?`PRIVATE`:`OTHER`}function re(e){let t=[],n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,r=e.querySelector(`#cursor`),i=e.querySelector(`#cursorRing`);if(r&&i&&window.matchMedia(`(pointer: fine)`).matches){let e=0,n=0,a=0,o=0,s=t=>{e=t.clientX,n=t.clientY,r.style.left=`${e-4}px`,r.style.top=`${n-4}px`};document.addEventListener(`mousemove`,s);let c=0,l=()=>{a+=(e-a)*.12,o+=(n-o)*.12,i.style.left=`${a-18}px`,i.style.top=`${o-18}px`,c=requestAnimationFrame(l)};c=requestAnimationFrame(l),t.push(()=>{document.removeEventListener(`mousemove`,s),cancelAnimationFrame(c)})}let a=e.querySelector(`#mainNav`),o=()=>a?.classList.toggle(`scrolled`,window.scrollY>60);window.addEventListener(`scroll`,o,{passive:!0}),o(),t.push(()=>window.removeEventListener(`scroll`,o));let s=[...e.querySelectorAll(`#desktopNav a[href^="#"], .mobile-nav a[href^="#"]`)],c=[...e.querySelectorAll(`main section[id]`)],l=new IntersectionObserver(e=>{e.forEach(e=>{if(!e.isIntersecting)return;let t=e.target.id;s.forEach(e=>e.classList.toggle(`active`,e.getAttribute(`href`)===`#${t}`))})},{rootMargin:`-35% 0px -55% 0px`,threshold:0});c.forEach(e=>l.observe(e)),t.push(()=>l.disconnect());let u=e.querySelector(`#mobileNav`),d=e.querySelector(`#hamburger`),f=e=>{!u||!d||(u.classList.toggle(`open`,e),u.hidden=!e,d.setAttribute(`aria-expanded`,String(e)),d.setAttribute(`aria-label`,e?`Close navigation`:`Open navigation`))};window.toggleMobile=()=>f(!u?.classList.contains(`open`)),window.closeMobile=()=>f(!1),u?.querySelectorAll(`a`).forEach(e=>e.addEventListener(`click`,()=>f(!1)));let p=e=>{e.key===`Escape`&&f(!1)};document.addEventListener(`keydown`,p),t.push(()=>document.removeEventListener(`keydown`,p));let m=e.querySelectorAll(`.reveal`),h=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.classList.add(`visible`),h.unobserve(e.target))})},{threshold:.12,rootMargin:`0px 0px -40px 0px`});m.forEach(e=>h.observe(e)),m.forEach((e,t)=>{let n=e.getBoundingClientRect();n.top<window.innerHeight&&n.bottom>0&&window.setTimeout(()=>e.classList.add(`visible`),t*60)}),t.push(()=>h.disconnect());let g=e.querySelector(`#eventsTrack`),_=e=>g?.scrollBy({left:e,behavior:n?`auto`:`smooth`}),v=e.querySelector(`#evPrev`),y=e.querySelector(`#evNext`),b=()=>{_(-380),H(`event_carousel_navigation`,{direction:`previous`})},x=()=>{_(380),H(`event_carousel_navigation`,{direction:`next`})};if(v?.addEventListener(`click`,b),y?.addEventListener(`click`,x),t.push(()=>{v?.removeEventListener(`click`,b),y?.removeEventListener(`click`,x)}),g&&window.matchMedia(`(pointer: fine)`).matches){let e=!1,n=0,r=0,i=t=>{e=!0,n=t.pageX-g.offsetLeft,r=g.scrollLeft},a=()=>{e=!1},o=t=>{if(!e)return;t.preventDefault();let i=t.pageX-g.offsetLeft;g.scrollLeft=r-(i-n)};g.addEventListener(`mousedown`,i),document.addEventListener(`mouseup`,a),document.addEventListener(`mousemove`,o),t.push(()=>{g.removeEventListener(`mousedown`,i),document.removeEventListener(`mouseup`,a),document.removeEventListener(`mousemove`,o)})}let S=()=>{if(n)return;let t=e.querySelector(`.hero-grid-lines`);t&&(t.style.transform=`translateY(${window.scrollY*.3}px)`)};window.addEventListener(`scroll`,S,{passive:!0}),t.push(()=>window.removeEventListener(`scroll`,S)),e.querySelectorAll(`[data-track]`).forEach(e=>{let n=()=>H(e.dataset.track||`click`,{label:(e.textContent||``).trim().slice(0,80)});e.addEventListener(`click`,n),t.push(()=>e.removeEventListener(`click`,n))}),e.querySelectorAll(`a[href^="tel:"]`).forEach(e=>{let n=()=>H(`phone_click`);e.addEventListener(`click`,n),t.push(()=>e.removeEventListener(`click`,n))}),e.querySelectorAll(`a[href^="mailto:"]`).forEach(e=>{let n=()=>H(`email_click`);e.addEventListener(`click`,n),t.push(()=>e.removeEventListener(`click`,n))}),e.querySelectorAll(`a[href*="wa.me"]`).forEach(e=>{let n=()=>H(`whatsapp_click`);e.addEventListener(`click`,n),t.push(()=>e.removeEventListener(`click`,n))}),e.querySelectorAll(`[data-social]`).forEach(e=>{let n=t=>{e.getAttribute(`href`)===`#`&&(t.preventDefault(),H(`social_placeholder_click`,{network:e.dataset.social}))};e.addEventListener(`click`,n),e.classList.add(`disabled`),e.setAttribute(`aria-disabled`,`true`),t.push(()=>e.removeEventListener(`click`,n))});let C=new IntersectionObserver(e=>{e.forEach(e=>{if(!e.isIntersecting)return;let t=e.target;if(t.classList.contains(`service-card`)){let e=t.querySelector(`.service-title`)?.textContent?.trim()||`service`,n=ne(e);H(`product_view`,{product_type:n,item_name:e,rental_or_sale:`RENTAL`}),n===`LED_VIDEO_WALL`&&H(`led_product_view`,{product_type:n,item_name:e})}if(t.classList.contains(`event-card`)){let e=t.querySelector(`.event-name`)?.textContent?.trim()||`event`,n=$(e);H(`project_view`,{project_type:n,item_name:e}),n===`SPORTS`&&H(`fiba_project_view`,{project_type:n,venue_type:`ARENA`}),n===`CONCERT`&&H(`concert_project_view`,{project_type:n}),n===`EXHIBITION`&&H(`exhibition_project_view`,{project_type:n}),H(`event_project_view`,{project_type:n})}if(t.classList.contains(`project-card`)){let e=t.querySelector(`b`)?.textContent?.trim()||`project`;H(`sports_project_view`,{project_type:$(e),item_name:e})}C.unobserve(t)})},{threshold:.45});e.querySelectorAll(`.service-card, .event-card, .project-card`).forEach(e=>C.observe(e)),t.push(()=>C.disconnect());let w=e.querySelector(`#quoteForm`),T=e.querySelector(`#formStatus`),E=e.querySelector(`#submitBtn`);if(w&&E&&T){let e=!1,n=()=>{e||(e=!0,H(`form_start`),H(`quotation_start`),H(`contact_form_start`))};w.addEventListener(`focusin`,n),t.push(()=>w.removeEventListener(`focusin`,n));let r={fullName:w.querySelector(`#fullName`),email:w.querySelector(`#email`),phone:w.querySelector(`#phone`),eventType:w.querySelector(`#eventType`),details:w.querySelector(`#details`)},i=e=>w.querySelector(`#${e}Error`),a=(e,t)=>{let n=r[e],a=i(e);n?.setAttribute(`aria-invalid`,t?`true`:`false`),a&&(a.textContent=t)},o=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e),s=e=>/^[+()\d\s.-]{7,30}$/.test(e),c=E.querySelector(`span`),l=async t=>{t.preventDefault(),Object.keys(r).forEach(e=>a(e,``)),T.textContent=``,T.className=`form-status`;let n=new FormData(w);if(String(n.get(`website`)||``).trim())return;let i=Object.fromEntries(n.entries()),l=!0;if((i.fullName||``).toString().trim().length<2&&(a(`fullName`,`Please enter your full name.`),l=!1),o((i.email||``).toString().trim())||(a(`email`,`Please enter a valid email.`),l=!1),s((i.phone||``).toString().trim())||(a(`phone`,`Please enter a valid phone number.`),l=!1),i.eventType||(a(`eventType`,`Please select an event type.`),l=!1),(i.details||``).toString().trim().length<20&&(a(`details`,`Please provide at least 20 characters about your event.`),l=!1),!l){H(`form_validation_error`);return}E.disabled=!0,c&&(c.textContent=`…`),T.textContent=`Sending your enquiry securely…`;let u={eventType:String(i.eventType),budget:String(i.budget||``),eventDate:String(i.eventDate||``),company:String(i.company||``).slice(0,120),fullName:String(i.fullName).slice(0,100),email:String(i.email).slice(0,160),phone:String(i.phone).slice(0,30),details:String(i.details).slice(0,3e3),website:``};try{let t=await fetch(`/api/contact`,{method:`POST`,headers:{"Content-Type":`application/json`,Accept:`application/json`},body:JSON.stringify(u),credentials:`same-origin`}),n=await t.json().catch(()=>({}));if(!t.ok)throw Error(n.message||`HTTP ${t.status}`);w.reset(),e=!1,T.textContent=`✓ ENQUIRY RECEIVED — Dakia will review your brief and respond soon.`,T.className=`form-status success`;let r=u.eventType;H(`form_submit`,{event_type:r}),H(`contact_form_submit`,{event_type:r}),H(`quotation_submit`,{event_type:r,rental_or_sale:`RENTAL`}),H(`lead_generated`,{event_type:r}),/fiba|sport/i.test(r)&&H(`led_quote_request`,{event_type:r,product_type:`LED_VIDEO_WALL`})}catch{T.textContent=`We could not submit the form. Please email info@dakiaevents.com or call +971 54 582 6560.`,T.className=`form-status error`,H(`form_submit_error`)}finally{E.disabled=!1,c&&(c.textContent=`→`)}};w.addEventListener(`submit`,l),t.push(()=>w.removeEventListener(`submit`,l))}return()=>{t.forEach(e=>e()),delete window.toggleMobile,delete window.closeMobile}}function ie(){let e=(0,l.useRef)(null);return(0,l.useEffect)(()=>{if(e.current)return re(e.current)},[]),(0,q.jsx)(`div`,{className:`dakia-root`,ref:e,suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:te}})}function ae(){return(0,q.jsx)(Q,{children:(0,q.jsx)(ie,{})})}export{ae as component};