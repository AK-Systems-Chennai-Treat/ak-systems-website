import { SITE } from '../site.config.mjs';
import { I, CTMARK, mapSvg } from './icons.mjs';

const CT = SITE.chennaitreat;
const NAV = [['/', 'Home'], ['/products', 'Products'], ['/services', 'Services'], ['/quality', 'Quality'], ['/about', 'About'], ['/contact', 'Contact']];
const href = p => (p === '/' ? '/' : p + '/');
const ext = (url, label, cls) => `<a class="btn ${cls}" href="${url}" target="_blank" rel="noopener">${label}</a>`;

const logo = () => `<a class="logo" href="/" aria-label="AK Systems home"><picture><source srcset="/assets/logo-mark.webp" type="image/webp"><img class="mk" src="/assets/logo-mark.png" alt="AK" width="235" height="96"></picture><span class="wm">Systems</span></a>`;
const logoFull = () => `<a class="logo-full" href="/" aria-label="AK Systems home"><picture><source srcset="/assets/logo-full.webp" type="image/webp"><img src="/assets/logo-full.png" alt="AK Systems" width="600" height="407" loading="lazy"></picture></a>`;

function header(path, inHero) {
  return `<header class="hdr dark ${inHero ? '' : 'solid'}"><div class="wrap">${logo()}
<nav class="nav" aria-label="Main">${NAV.map(([p, l]) => `<a href="${href(p)}" class="${p === path ? 'on' : ''}"${p === path ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
<a class="btn d cta" href="/contact/">Start a project ${I.arrow}</a>
<button class="burger" type="button" aria-label="Open menu" aria-controls="mmenu" aria-expanded="false" data-menu-open>${I.menu}</button></div></header>`;
}

function mobileMenu(path) {
  return `<div class="mmenu" id="mmenu" role="dialog" aria-modal="true" aria-label="Menu"><div class="top">${logo()}<button class="x" type="button" aria-label="Close menu" data-menu-close>${I.x}</button></div>
<nav>${NAV.map(([p, l]) => `<a href="${href(p)}" class="${p === path ? 'on' : ''}">${l} ${I.arrow}</a>`).join('')}</nav>
<div style="margin-top:auto;padding:24px 0 32px;display:grid;gap:10px"><a class="btn p" style="justify-content:center" href="/contact/">Start a project</a>${ext(CT.site, 'Visit ChennaiTreat', 'o" style="justify-content:center')}<div style="color:#7F88B0;font-size:13px;text-align:center;margin-top:8px"><a href="tel:${SITE.phoneHref}">${SITE.phone}</a> · <a href="mailto:${SITE.email}">${SITE.email}</a></div></div></div>`;
}

function footer() {
  return `<footer class="ftr"><div class="wrap"><div class="top">
<div class="about">${logoFull()}<p>AK Systems builds quality software products and services, and operates ChennaiTreat, a local deals and voucher platform for Tamil Nadu.</p>
<div style="color:#7F88B0;font-size:13px;line-height:1.7">GSTIN <span class="mono" style="color:#C9CFF0">${SITE.gstin}</span><br>Tiruchirappalli, Tamil Nadu</div></div>
<div><h4>Company</h4><ul><li><a href="/about/">About</a></li><li><a href="/quality/">Quality approach</a></li><li><a href="/contact/?topic=Careers">Careers</a></li><li><a href="/contact/">Contact</a></li></ul></div>
<div><h4>What we do</h4><ul><li><a href="/products/">Products</a></li><li><a href="/services/">Software services</a></li><li><a href="/services/">Mobile apps</a></li><li><a href="/quality/">QA &amp; testing</a></li></ul></div>
<div><h4>ChennaiTreat</h4><ul><li><a href="${CT.site}" target="_blank" rel="noopener">chennaitreat.com</a></li><li><a href="/products/#customer-app">Customer app</a></li><li><a href="${CT.storePartner}" target="_blank" rel="noopener">Become a store partner</a></li><li><a href="/products/#store-app">Store partner app</a></li></ul></div>
<div><h4>Legal</h4><ul><li><a href="/privacy/">Privacy policy</a></li><li><a href="/terms/">Terms of use</a></li><li><a href="/refund-policy/">Refund &amp; cancellation</a></li><li><a href="/grievance/">Grievance officer</a></li></ul></div>
</div><div class="bottom"><span>© ${new Date().getFullYear()} ${SITE.name}. A sole proprietorship of ${SITE.proprietor}.</span><span>ChennaiTreat is a product of ${SITE.name}.</span></div></div></footer>`;
}

const ctaBand = () => `<section class="sec" style="padding-top:0"><div class="wrap"><div class="band"><div><h2>Have a product in mind?</h2><p>Tell us what you want to build. We reply within one working day with next steps and a mockup plan.</p></div><div class="btns"><a class="btn d" href="/contact/">Start a project ${I.arrow}</a><a class="btn o" href="mailto:${SITE.email}">Email us</a></div></div></div></section>`;
const phero = (crumb, h, lead) => `<section class="phero"><div class="wrap"><div class="crumb"><a href="/">Home</a> / ${crumb}</div><h1>${h}</h1><p class="lead">${lead}</p></div></section>`;
const img = (src, alt, w, h, extra = '') => `<img src="/assets/img/${src}.webp" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"${extra}>`;
const PH = 909; // phone screenshot height at 420 wide
const phone = (src, alt, cls = '', style = '') => `<div class="phone ${cls}"${style ? ` style="${style}"` : ''}>${img(src, alt, 420, PH)}</div>`;
const storeBtns = () => [CT.playStore && ext(CT.playStore, 'Get it on Google Play', 's'), CT.appStore && ext(CT.appStore, 'Download on the App Store', 's')].filter(Boolean).join('');

function layout({ path, title, description, body, darkHero = false }) {
  const canonical = SITE.url + (path === '/' ? '/' : path + '/');
  const fullTitle = path === '/' ? `${SITE.name} | Quality software products and services` : `${title} | ${SITE.name}`;
  const org = {
    '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url, logo: SITE.url + '/assets/icon-512.png',
    email: SITE.email, telephone: SITE.phoneHref, taxID: SITE.gstin,
    address: { '@type': 'PostalAddress', streetAddress: 'B3J, Rangakavery Apartment, Chockalingapuram, Edamalaipatty Pudur', addressLocality: 'Tiruchirappalli', addressRegion: 'Tamil Nadu', postalCode: '620012', addressCountry: 'IN' },
    brand: { '@type': 'Brand', name: 'ChennaiTreat', url: CT.site },
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${fullTitle}</title>
<meta name="description" content="${description}">
<link rel="canonical" href="${canonical}">
<meta name="theme-color" content="#0B1230">
<link rel="icon" href="/assets/favicon-32.png" type="image/png" sizes="32x32">
<link rel="icon" href="/assets/icon-192.png" type="image/png" sizes="192x192">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE.name}">
<meta property="og:title" content="${fullTitle}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE.url}/assets/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
${path === '/' ? `<script type="application/ld+json">${JSON.stringify(org)}</script>` : ''}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${mobileMenu(path)}
${darkHero ? '' : header(path)}
<main id="main">${body}</main>
${footer()}
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/* ---------------- pages ---------------- */

const home = () => `
<section class="hero">${header('/', true)}<div class="wrap"><div class="hero-in"><div>
<a class="pill" href="${CT.storePartner}" target="_blank" rel="noopener"><i>LIVE</i> ChennaiTreat is now open for store partners</a>
<h1>Quality software, <em>designed, built and run</em> by AK Systems.</h1>
<p class="lead">We build web and mobile products for businesses in Tamil Nadu and beyond, and we run our own: ChennaiTreat, where local stores publish deals and customers redeem vouchers.</p>
<div class="btns" style="display:flex;gap:12px"><a class="btn p" href="/products/">Explore our products ${I.arrow}</a><a class="btn o" href="/contact/">Talk to us</a></div></div>
<div class="hero-art" aria-hidden="true"><div class="desk"><div class="bar"><i></i><i></i><i></i></div>${img('admin-home', '', 1200, 750, ' loading="eager"')}</div>
${phone('cust-home', '')}
<div class="badge"><span class="dot"></span><div><b>3 apps, one platform</b><small>Customer · Store partner · Admin</small></div></div></div>
</div></div></section>
<section class="facts"><div class="wrap">
<div class="fact"><small>Registered</small><b>GST registered business</b></div>
<div class="fact"><small>Based in</small><b>Tiruchirappalli, TN</b></div>
<div class="fact"><small>Live product</small><b>ChennaiTreat</b></div>
<div class="fact"><small>Platforms</small><b>Web · Android · iOS</b></div></div></section>

<section class="sec"><div class="wrap"><div class="sec-h"><span class="eyebrow">What we do</span><h2>Products we own, and software we build for you</h2><p class="lead">The same team, process and quality checks go into our own platform and into client work.</p></div>
<div class="grid g3">
<div class="card"><div class="ic">${I.box}</div><h3>Software products</h3><p>We design and operate our own products end to end, from first mockup to app store release and day to day support.</p><ul class="ticks"><li>ChennaiTreat deals platform</li><li>Subscription billing and GST invoices</li><li>Admin, audit and reporting tools</li></ul></div>
<div class="card"><div class="ic">${I.code}</div><h3>Software services</h3><p>Custom web portals, Android and iOS apps, and backend APIs built for your business and handed over with full source.</p><ul class="ticks"><li>Web and mobile apps</li><li>Microservice backends and APIs</li><li>Cloud deployment and support</li></ul></div>
<div class="card"><div class="ic">${I.shield}</div><h3>Quality engineering</h3><p>Design reviews, automated tests, code review on every change and a release checklist before anything goes live.</p><ul class="ticks"><li>Mockups approved before code</li><li>Automated and manual testing</li><li>Security and privacy checks</li></ul></div>
</div></div></section>

<section class="sec soft"><div class="wrap"><div class="ct"><div>
<span class="eyebrow c">Our product</span>
<div class="ct-logo">${CTMARK}<span>Chennai<b>Treat</b></span></div>
<p class="lead" style="color:#5B6382">Local deals, simple vouchers. Customers find offers from nearby stores, claim a voucher in one tap and show the QR code at the counter. Stores scan it and the redemption is recorded.</p>
<div class="apps"><div class="app"><b>Customer app</b><small>Browse deals, claim and redeem vouchers, rate stores.</small></div><div class="app"><b>Store partner app</b><small>Publish offers, scan vouchers, manage branches and staff.</small></div><div class="app"><b>Admin portal</b><small>Approvals, billing, audit trail and support.</small></div></div>
<div class="btns" style="display:flex;gap:12px">${ext(CT.site, `Visit chennaitreat.com ${I.arrow}`, 'c')}${ext(CT.storePartner, 'Become a store partner', 's')}</div></div>
<div class="ct-phones" aria-hidden="true">${phone('cust-qr', '', 'p1')}${phone('store-offers', '', 'p2')}</div>
</div></div></section>

<section class="sec"><div class="wrap"><div class="sec-h"><span class="eyebrow">How we work</span><h2>You see it before we build it</h2><p class="lead">Every project follows the same four steps. Nothing is coded until you have approved the screens.</p></div>
<div class="steps">
<div class="step"><div class="n">1</div><div><h3>Discover</h3><p>We agree the goal, users, must-have features and budget in a short written plan.</p></div></div>
<div class="step"><div class="n">2</div><div><h3>Design</h3><p>Clickable mockups for web and mobile. You approve them before any code is written.</p></div></div>
<div class="step"><div class="n">3</div><div><h3>Build and test</h3><p>Small reviewed changes, automated tests and a demo build you can try each week.</p></div></div>
<div class="step"><div class="n">4</div><div><h3>Launch and support</h3><p>Release to cloud and app stores, then monitoring, fixes and improvements.</p></div></div>
</div></div></section>

<section class="sec soft"><div class="wrap grid g2" style="align-items:center;gap:56px"><div><span class="eyebrow">Technology</span><h2 style="margin:10px 0 14px">Proven, open technology</h2><p class="lead">We use mainstream tools so your product is easy to hire for, host and maintain. No lock-in to us.</p></div>
<div class="stack">${['Angular', 'Ionic + Capacitor', 'Android', 'iOS', 'Java 21', 'Spring Boot', 'Microservices', 'Apache Kafka', 'PostgreSQL', 'Flyway', 'REST APIs', 'Razorpay', 'Firebase push', 'AWS / DigitalOcean', 'GitHub'].map(s => `<span>${s}</span>`).join('')}</div></div></section>
${ctaBand()}`;

const products = () => `${phero('Products', 'Products we build and run', 'AK Systems owns and operates its products end to end. Our first product is ChennaiTreat, a deals and voucher redemption platform for local stores.')}
<section class="sec" style="padding-top:64px"><div class="wrap">
<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;margin-bottom:8px"><div class="ct-logo" style="margin:0">${CTMARK}<span>Chennai<b>Treat</b></span></div><span class="chip" style="background:#E7F7F1;color:#0B7A5B">● Live</span>${ext(CT.site, `Visit chennaitreat.com ${I.arrow}`, 'c" style="margin-left:auto')}</div>
<p class="lead" style="max-width:760px">One platform with three apps. Stores publish offers, customers claim vouchers, and every redemption is checked and recorded.</p>

<div class="appblk" id="customer-app"><div class="txt"><span class="tag">FOR CUSTOMERS</span><h2>Customer app</h2><p class="lead" style="margin:12px 0">Find deals from stores near you, claim a voucher and show the QR at the counter.</p>
<ul class="ticks c"><li>Deals by category, area and distance</li><li>One tap claim with OTP sign in</li><li>Voucher wallet with QR codes</li><li>Save favourite stores and rate visits</li></ul>
<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">${ext(CT.site, 'Open web app', 'c')}${storeBtns()}</div></div>
<div class="shot-ph">${phone('cust-home', 'ChennaiTreat customer app home screen with nearby deals', '', 'left:12%')}${phone('cust-qr', 'Voucher with QR code in the ChennaiTreat customer app', '', 'left:54%;top:80px')}</div></div>

<div class="appblk rev" id="store-app"><div class="txt"><span class="tag">FOR STORES</span><h2>Store partner app</h2><p class="lead" style="margin:12px 0">Everything a shop owner needs to run offers, on phone or web.</p>
<ul class="ticks c"><li>Create offers with price, timings and limits</li><li>Scan and redeem customer vouchers</li><li>Branches, opening hours and shop location</li><li>Staff accounts and monthly subscription</li></ul>
<div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">${ext(CT.storePartner, `Register your store ${I.arrow}`, 'c')}</div></div>
<div class="shot-ph">${phone('store-home', 'ChennaiTreat store partner app home screen', '', 'left:12%')}${phone('store-offers', 'Offers list in the store partner app', '', 'left:54%;top:80px')}</div></div>

<div class="appblk" id="admin"><div class="txt"><span class="tag">FOR OUR TEAM</span><h2>Admin portal</h2><p class="lead" style="margin:12px 0">The control room that keeps the platform trustworthy.</p>
<ul class="ticks c"><li>Store, offer, photo and location approvals</li><li>Subscription plans, payments and GST invoices</li><li>Full audit trail and security events</li><li>App settings, themes and support tools</li></ul></div>
<div class="shot-ph"><div class="desk">${img('admin-audit', 'ChennaiTreat admin portal audit dashboard', 1200, 750)}</div></div></div>
</div></section>

<section class="sec soft"><div class="wrap"><div class="sec-h"><span class="eyebrow">Under the hood</span><h2>Built to grow, run by a small team</h2><p class="lead">ChennaiTreat runs on independent services that talk through events, so each part can grow and be fixed on its own.</p></div>
<div class="arch">${[['API gateway', 'Single secure entry'], ['User service', 'Accounts, OTP, roles'], ['Store service', 'Stores, branches, billing'], ['Offer service', 'Offers and banners'], ['Voucher service', 'Claims and redemptions'], ['Rating service', 'Reviews and replies'], ['Location service', 'Areas and distance'], ['Category service', 'Categories and icons'], ['Notification service', 'SMS, email, push'], ['Audit service', 'Who did what, when']].map(([a, b]) => `<div class="svc">${a}<small>${b}</small></div>`).join('')}</div>
<div class="next" style="margin-top:40px"><div class="ic" style="margin:0">${I.box}</div><div><h3>More products are on the way</h3><p style="color:var(--muted);margin-top:4px">We are exploring tools for small retailers and service businesses. Want early access or have an idea? Tell us.</p></div><a class="btn s" style="margin-left:auto" href="/contact/?topic=Other">Share an idea</a></div>
</div></section>${ctaBand()}`;

const services = () => `${phero('Services', 'Software services, built with the same care as our own products', 'We design, build, test and run web and mobile software for businesses. You get working software, the full source code and a team that answers the phone.')}
<section class="sec"><div class="wrap"><div class="grid g3">
${[[I.phone, 'Mobile apps', 'Android and iOS apps from one codebase, published to Play Store and App Store under your name.'],
[I.code, 'Web portals and dashboards', 'Customer portals, admin panels and internal tools that work on every screen size.'],
[I.server, 'Backend and APIs', 'Secure microservices, payments, OTP sign in, notifications and integrations.'],
[I.pen, 'UI and UX design', 'Mockups and clickable prototypes you approve before development starts.'],
[I.test, 'QA and test automation', 'Test plans, automated tests and release checks for new or existing software.'],
[I.cloud, 'Cloud and DevOps', 'Hosting on AWS or DigitalOcean in India, backups, monitoring and automated deploys.']].map(([i, h, p]) => `<div class="card"><div class="ic">${i}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}
</div></div></section>
<section class="sec soft"><div class="wrap"><div class="sec-h"><span class="eyebrow">Ways to work with us</span><h2>Pick the model that fits</h2></div>
<div class="grid g3">
<div class="model"><span class="eyebrow">Fixed scope</span><h3>Project</h3><p class="when">Best when the requirement is clear.</p><ul class="ticks"><li>Written scope and fixed quote</li><li>Approved mockups before build</li><li>30 days of free fixes after launch</li></ul></div>
<div class="model hl"><span class="eyebrow">Most flexible</span><h3>Dedicated team</h3><p class="when">Best for products that keep growing.</p><ul class="ticks"><li>Monthly plan, change priorities anytime</li><li>Weekly demo builds</li><li>Developers plus QA from one team</li></ul></div>
<div class="model"><span class="eyebrow">After launch</span><h3>Support and care</h3><p class="when">Best for live apps that must stay healthy.</p><ul class="ticks"><li>Monitoring, backups and updates</li><li>Agreed response times</li><li>Small changes every month</li></ul></div>
</div></div></section>
<section class="sec"><div class="wrap grid g2" style="gap:56px;align-items:center"><div><span class="eyebrow">Proof, not promises</span><h2 style="margin:10px 0 14px">Our own platform is our portfolio</h2><p class="lead">ChennaiTreat covers what most businesses need: OTP sign in, maps, payments, subscriptions, GST invoices, push notifications, admin approvals and an audit trail. We bring the same building blocks to your project.</p><a class="btn s" style="margin-top:24px" href="/products/">See ChennaiTreat ${I.arrow}</a></div>
<div class="shot-ph" style="background:var(--sky)" aria-hidden="true"><div class="desk" style="left:40px">${img('admin-home', '', 1200, 750)}</div>${phone('store-home', '', '', 'left:auto;right:30px;top:120px;width:170px')}</div></div></section>
${ctaBand()}`;

const quality = () => `${phero('Quality approach', 'Quality is a process, not a promise', 'Every product and project at AK Systems goes through the same checks. Here is exactly what we do, so you know what to expect.')}
<section class="sec" style="padding-top:64px"><div class="wrap grid qgrid" style="grid-template-columns:1.5fr 1fr;gap:56px;align-items:start">
<div>${[['Design approved before code', 'Screens are drawn and shared as mockups for web and mobile. Development starts only after you approve them, so there are no surprises at the end.'],
['Every change is reviewed', 'All code goes through a pull request and is reviewed before it is merged. Nothing reaches the main branch unchecked.'],
['Automated tests on every build', 'Unit and integration tests run on each change. Bugs found once get a test so they cannot return.'],
['Security by default', 'OTP sign in, short lived access tokens, role based access, encrypted connections and an audit log of every important action.'],
['Privacy by design', 'We collect only what is needed, follow the Digital Personal Data Protection Act 2023 and let users delete their account.'],
['Release checklist', 'Before each release we check builds, data migrations, store listings, legal pages and rollback steps, and test on real phones.']].map(([h, p], i) => `<div class="qrow"><div class="num">0${i + 1}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div>
<div style="position:sticky;top:20px"><div class="gate"><div style="font-weight:700;color:#fff;margin-bottom:6px;font-size:15px">Release gate · example</div><div style="color:#7F88B0;font-size:12px;margin-bottom:10px" class="mono">release/v1.4.0</div>
${['Mockups approved', 'Code reviewed and merged', 'Automated tests passed', 'Database migration checked', 'Security checks passed', 'Tested on Android and iOS', 'Legal pages up to date', 'Rollback plan ready'].map(t => `<div class="ln"><span class="ok">✓</span><span>${t}</span></div>`).join('')}
<div class="btn p" style="margin-top:20px;width:100%;justify-content:center">Ready to release</div></div></div>
</div></section>
<section class="sec soft"><div class="wrap"><div class="sec-h"><span class="eyebrow">What you get</span><h2>Visible quality at every step</h2></div><div class="grid g4">
${[[I.eye, 'Weekly demo', 'A working build you can try every week.'], [I.doc, 'Written plans', 'Scope, decisions and changes are always written down.'], [I.lock, 'Your code, your data', 'Full source and data handed over. No lock-in.'], [I.life, 'Support after launch', 'Fixes and updates with agreed response times.']].map(([i, h, p]) => `<div class="card"><div class="ic">${i}</div><h3>${h}</h3><p>${p}</p></div>`).join('')}
</div></div></section>${ctaBand()}`;

const about = () => `${phero('About', 'A small team that builds software properly', 'AK Systems is a software company from Tiruchirappalli, Tamil Nadu. We build products we are proud to run ourselves, and we build the same way for our clients.')}
<section class="sec" style="padding-top:64px"><div class="wrap grid g2" style="gap:56px">
<div><span class="eyebrow">Our story</span><h2 style="margin:10px 0 16px">From one local idea to a full platform</h2>
<p class="lead" style="margin-bottom:14px">We started AK Systems to build useful, honest software for local businesses. Our first product, ChennaiTreat, helps neighbourhood stores bring in customers with simple deals and vouchers.</p>
<p class="lead">Building and running our own platform taught us what good software needs: clear design, careful testing, strong security and real support. Those lessons now go into every client project.</p></div>
<div class="grid" style="gap:16px">
<div class="card"><div class="ic">${I.users}</div><h3>Mission</h3><p>Make reliable, affordable software for businesses in Tamil Nadu and beyond.</p></div>
<div class="card"><div class="ic">${I.shield}</div><h3>Values</h3><p>Be clear about scope and cost. Show work early. Never ship without testing. Respect user data.</p></div></div>
</div></section>
<section class="sec soft"><div class="wrap grid g2" style="gap:24px;align-items:stretch">
<div class="entity"><span class="eyebrow">Company details</span><h3 style="margin:8px 0 20px">${SITE.name}</h3><dl>
<dt>Legal form</dt><dd>${SITE.legalForm}</dd><dt>Proprietor</dt><dd>${SITE.proprietor}</dd><dt>GSTIN</dt><dd class="mono">${SITE.gstin}</dd>
<dt>Registered office</dt><dd>${SITE.address}</dd><dt>Brands</dt><dd>ChennaiTreat</dd></dl></div>
<div class="map">${mapSvg()}</div></div></section>
<section class="sec"><div class="wrap"><div class="sec-h"><span class="eyebrow">People</span><h2>Who you will work with</h2></div><div class="grid g2">
${SITE.people.map(p => `<div class="card person"><div class="av">${p.initials}</div><div><h3>${p.name}</h3><p style="margin-top:2px">${p.role}</p></div></div>`).join('')}
</div></div></section>${ctaBand()}`;

const TOPICS = ['New project', 'ChennaiTreat store partner', 'Support', 'Careers', 'Other'];
const contact = () => `${phero('Contact', 'Let’s talk', 'Tell us about your project, ask about ChennaiTreat, or get support. We reply within one working day.')}
<section class="sec" style="padding-top:56px"><div class="wrap grid cgrid" style="grid-template-columns:1.4fr 1fr;gap:48px;align-items:start">
<form class="form" id="contact-form" data-endpoint="${SITE.formEndpoint}" data-email="${SITE.email}" novalidate><h3 style="margin-bottom:18px">Send us a message</h3>
<fieldset class="fld" style="border:0"><legend style="font-size:13px;font-weight:700;margin-bottom:6px">What is it about?</legend><div class="seg">${TOPICS.map((t, i) => `<label><input type="radio" name="topic" value="${t}"${i === 0 ? ' checked' : ''}><span>${t}</span></label>`).join('')}</div></fieldset>
<div class="f2"><div class="fld"><label for="f-name">Your name</label><input id="f-name" name="name" required autocomplete="name" placeholder="Full name"></div><div class="fld"><label for="f-company">Company (optional)</label><input id="f-company" name="company" autocomplete="organization" placeholder="Business name"></div></div>
<div class="f2"><div class="fld"><label for="f-email">Email</label><input id="f-email" name="email" type="email" required autocomplete="email" placeholder="you@example.com"></div><div class="fld"><label for="f-phone">Mobile</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" placeholder="+91 98765 43210"></div></div>
<div class="fld"><label for="f-msg">Message</label><textarea id="f-msg" name="message" required placeholder="What do you want to build, and by when?"></textarea></div>
<input class="hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off" aria-hidden="true">
<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"><button class="btn p" type="submit">Send message ${I.arrow}</button><small style="color:var(--muted);font-size:13px">By sending, you agree to our <a href="/privacy/" style="text-decoration:underline">privacy policy</a>.</small></div>
<div class="form-msg" role="status" aria-live="polite"></div></form>
<div class="cinfo"><div class="row"><div class="ic">${I.mail}</div><div><small>Projects, ChennaiTreat stores and support</small><b><a href="mailto:${SITE.email}">${SITE.email}</a></b></div></div>
<div class="row"><div class="ic">${I.call}</div><div><small>Phone and WhatsApp, ${SITE.hours}</small><b><a href="tel:${SITE.phoneHref}">${SITE.phone}</a></b> · <a href="${SITE.whatsapp}" target="_blank" rel="noopener" style="color:var(--blue);font-weight:600;font-size:14px">WhatsApp</a></div></div>
<div class="row"><div class="ic">${I.pin}</div><div><small>Registered office</small><b style="font-weight:600">${SITE.address}</b></div></div>
<div class="row" style="border:0"><div class="ic">${I.shield}</div><div><small>Grievance officer</small><b>${SITE.grievance.name}</b><br><a href="mailto:${SITE.grievance.email}" style="font-size:14px;color:var(--muted)">${SITE.grievance.email}</a></div></div>
<div class="map" style="min-height:220px;margin-top:8px">${mapSvg()}</div></div>
</div></section>`;

/* ---------------- legal ---------------- */
const LEGAL = [['/privacy', 'Privacy policy'], ['/terms', 'Terms of use'], ['/refund-policy', 'Refund & cancellation'], ['/grievance', 'Grievance officer']];
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
function legalPage(path, title, intro, sections) {
  return `<section class="phero" style="padding-bottom:40px"><div class="wrap"><div class="crumb"><a href="/">Home</a> / Legal</div><h1>${title}</h1><p class="lead">${intro}</p>
<nav class="ltabs" aria-label="Legal pages">${LEGAL.map(([p, l]) => `<a href="${p}/" class="${p === path ? 'on' : ''}">${l.replace('&', '&amp;')}</a>`).join('')}</nav></div></section>
<div class="wrap legal"><aside class="toc"><b>On this page</b>${sections.map(([h]) => `<a href="#${slug(h)}">${h}</a>`).join('')}</aside>
<article class="doc">${sections.map(([h, body], i) => `<h2 id="${slug(h)}">${i + 1}. ${h}</h2>${body}`).join('\n')}</article></div>`;
}
const who = `<p>This website, <a href="${SITE.url}">ak-systems.in</a>, is run by <b>${SITE.name}</b>, a sole proprietorship of ${SITE.proprietor}, GSTIN ${SITE.gstin}, with its registered office at ${SITE.address}. ChennaiTreat is a product of ${SITE.name}.</p>`;
const contactLine = `<p>Email <a href="mailto:${SITE.email}">${SITE.email}</a> or call <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> (${SITE.hours}).</p>`;

const privacy = () => legalPage('/privacy', 'Privacy policy', `Last updated ${SITE.updated}. Applies to ak-systems.in. The ChennaiTreat apps have their own <a href="${CT.site}/privacy" style="color:var(--blue);text-decoration:underline">privacy policy</a>.`, [
  ['Who we are', who],
  ['What we collect', `<p>When you use the contact form, email or call us, we collect:</p><ul><li>Your name, email address and mobile number</li><li>Your company name and the message you send</li><li>The topic you choose, such as a new project or support</li></ul><p>Like most websites, our hosting provider keeps basic technical logs (IP address, browser type, pages visited and time) for security. This website does not use advertising or tracking cookies.</p>`],
  ['How we use it', `<p>We use your details only to reply to you, prepare quotes, deliver services you asked for, send invoices, and meet our legal and tax duties. We do not sell your data and we do not send marketing messages unless you ask for them.</p>`],
  ['Sharing', `<p>We share data only with service providers that help us run this website and our business, such as our website host, email provider and form service, and only as needed for that purpose. We may share data when the law requires it.</p>`],
  ['How long we keep it', `<p>We keep enquiries for up to 2 years, and project and billing records for as long as tax law requires (currently 8 years). After that we delete them.</p>`],
  ['Your rights', `<p>Under the Digital Personal Data Protection Act 2023 you can ask us to see, correct or delete your personal data, and withdraw consent you gave us. Write to <a href="mailto:${SITE.email}">${SITE.email}</a> and we will reply within 30 days.</p>`],
  ['Security', `<p>This website is served only over HTTPS. Access to enquiries and client data is limited to the people who need it.</p>`],
  ['Contact and grievance', `<p>For any privacy question or complaint, contact our grievance officer, ${SITE.grievance.name}, at <a href="mailto:${SITE.grievance.email}">${SITE.grievance.email}</a>. ${''}See the <a href="/grievance/">grievance officer</a> page for details.</p>`],
]);

const terms = () => legalPage('/terms', 'Terms of use', `Last updated ${SITE.updated}. These terms cover this website. Software projects are governed by the written proposal or agreement for each project. ChennaiTreat has its own <a href="${CT.site}/terms" style="color:var(--blue);text-decoration:underline">terms</a>.`, [
  ['About these terms', who + `<p>By using this website you agree to these terms. If you do not agree, please do not use it.</p>`],
  ['Use of this website', `<p>You may browse and share pages from this website for personal and business information. You must not misuse it, try to break its security, or send unlawful or harmful content through the contact form.</p>`],
  ['Content and trademarks', `<p>The text, design, logos and screenshots on this website, including the AK Systems and ChennaiTreat names and logos, belong to ${SITE.name}. Please ask before reusing them.</p>`],
  ['Projects and quotes', `<p>Information on this website is a general description of our services. It is not an offer. Scope, price, timelines and warranty for any project are agreed in writing before work starts, and that written agreement takes priority over this website.</p>`],
  ['Links to other sites', `<p>This website links to other sites, such as chennaitreat.com and app stores. We are not responsible for the content of sites we do not run.</p>`],
  ['Liability', `<p>We work to keep this website accurate and available, but it is provided as is. To the extent the law allows, ${SITE.name} is not liable for any loss caused by using this website.</p>`],
  ['Governing law', `<p>These terms are governed by the laws of India. Courts at Tiruchirappalli, Tamil Nadu have jurisdiction.</p>`],
  ['Contact', contactLine],
]);

const refund = () => legalPage('/refund-policy', 'Refund and cancellation policy', `Last updated ${SITE.updated}. This policy covers payments to ${SITE.name} for software services. ChennaiTreat store subscriptions follow the <a href="${CT.site}/refund-policy" style="color:var(--blue);text-decoration:underline">ChennaiTreat refund policy</a>.`, [
  ['What this covers', `<p>${SITE.name} sells software services: design, development, testing, hosting setup and support. We do not sell or ship physical goods. Everything we deliver is delivered digitally, such as source code, app builds, documents and access to hosted software.</p>`],
  ['Quotes and advance payments', `<p>Each project starts with a written quote that lists the milestones, the amount for each milestone and what is delivered. Any advance payment is listed in that quote.</p>`],
  ['Cancelling a project', `<ul><li><b>Before work starts:</b> you can cancel and get a full refund of any advance paid.</li><li><b>After work starts:</b> you can cancel at any time. You pay for work done up to the cancellation date, and we refund the rest of any advance. You receive everything made up to that date.</li><li><b>Completed and accepted milestones</b> are not refundable.</li></ul>`],
  ['Monthly plans', `<p>Dedicated team and support plans are billed monthly in advance. You can cancel with 15 days written notice. The current month is not refunded, and no further months are charged.</p>`],
  ['If something is wrong', `<p>If a delivery does not match what was agreed in writing, tell us within 30 days of delivery and we will fix it at no extra cost. If we cannot fix it, we will refund the amount paid for that milestone.</p>`],
  ['How refunds are paid', `<p>Approved refunds are paid to the original payment method or by bank transfer within 7 working days of approval. GST is adjusted with a credit note as the law requires.</p>`],
  ['Contact', contactLine],
]);

const grievance = () => legalPage('/grievance', 'Grievance officer', `As required by the Information Technology Act 2000 and the Digital Personal Data Protection Act 2023.`, [
  ['Grievance officer', `<p><b>${SITE.grievance.name}</b><br>${SITE.name}, ${SITE.address}<br>Email: <a href="mailto:${SITE.grievance.email}">${SITE.grievance.email}</a><br>Phone: <a href="tel:${SITE.phoneHref}">${SITE.phone}</a> (${SITE.hours})</p>`],
  ['How to raise a complaint', `<p>Email the grievance officer with your name, contact details, a description of the issue and any screenshots or reference numbers. This covers ak-systems.in and all AK Systems products, including ChennaiTreat.</p>`],
  ['What happens next', `<ul><li>We acknowledge your complaint within 24 hours.</li><li>We resolve it within 15 days, and tell you what we did.</li><li>If you are not satisfied, you can approach the Data Protection Board of India once it is in operation.</li></ul>`],
]);

const notFound = () => `<section class="err404"><div class="wrap"><div class="big">404</div><h1 style="font-size:36px;margin:12px 0">This page could not be found</h1><p class="lead" style="margin:0 auto 28px">The link may be old or mistyped.</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap"><a class="btn p" href="/">Go to home</a><a class="btn s" href="/contact/">Contact us</a></div></div></section>`;

export const pages = [
  { path: '/', title: 'Home', description: 'AK Systems designs, builds and runs quality web and mobile software, and operates ChennaiTreat, a local deals and voucher platform in Tamil Nadu.', body: home(), darkHero: true },
  { path: '/products', title: 'Products', description: 'ChennaiTreat by AK Systems: a customer app, store partner app and admin portal for local deals and voucher redemption.', body: products() },
  { path: '/services', title: 'Software services', description: 'Mobile apps, web portals, backend APIs, UI design, QA and cloud hosting from AK Systems, Tiruchirappalli.', body: services() },
  { path: '/quality', title: 'Quality approach', description: 'How AK Systems builds quality software: approved designs, code review, automated tests, security and a release checklist.', body: quality() },
  { path: '/about', title: 'About', description: 'AK Systems is a GST registered software company from Tiruchirappalli, Tamil Nadu, and the company behind ChennaiTreat.', body: about() },
  { path: '/contact', title: 'Contact', description: 'Contact AK Systems about a software project, ChennaiTreat or support. We reply within one working day.', body: contact() },
  { path: '/privacy', title: 'Privacy policy', description: 'How AK Systems collects, uses and protects personal data on ak-systems.in.', body: privacy() },
  { path: '/terms', title: 'Terms of use', description: 'Terms of use for the AK Systems website.', body: terms() },
  { path: '/refund-policy', title: 'Refund and cancellation policy', description: 'Refund and cancellation policy for AK Systems software services.', body: refund() },
  { path: '/grievance', title: 'Grievance officer', description: 'Grievance officer contact details for AK Systems and ChennaiTreat.', body: grievance() },
  { path: '/404', title: 'Page not found', description: 'Page not found.', body: notFound() },
].map(p => ({ ...p, html: layout(p) }));
