# AK Systems website

Company website for AK Systems, live at **https://ak-systems.in**.
Plain HTML and CSS with no dependencies, built from the approved mockups
(`/designs/ak-systems-website/` in the project files).

## Change content

| What | Where |
|---|---|
| Company details, email, phone, people, outside links, contact form endpoint | `site.config.mjs` |
| Page text | `src/pages.mjs` (one function per page) |
| Styles | `src/assets/site.css` |
| Mobile menu and contact form | `src/assets/site.js` |
| Screenshots | `src/assets/img/*.webp` |

Build: `node build.mjs` (Node 18 or newer) writes the site to `dist/`.
Preview: `npm start`, then open http://localhost:8080.

Pages: `/`, `/products/`, `/services/`, `/quality/`, `/about/`, `/contact/`,
`/privacy/`, `/terms/`, `/refund-policy/`, `/grievance/`, plus `404.html`, `sitemap.xml`, `robots.txt`.

## Contact form

By default the form opens the visitor's email app with the message filled in, addressed to
`support@chennaitreat.com`. To receive messages directly, create a free form at
https://formspree.io (sign up with support@chennaitreat.com), then put its URL in `formEndpoint`
in `site.config.mjs`.

GitHub Pages (below) is the chosen host. Cloudflare Pages is an alternative.

## Publish on GitHub Pages (free), domain at Zoho

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

1. **Make the repo public** (Settings > General > Danger Zone > Change visibility). GitHub Pages
   is free only for public repos; a private repo needs the paid GitHub Team plan. The site has
   no secrets, so public is fine.
2. **Turn on Pages:** Settings > Pages > Build and deployment > Source: **GitHub Actions**.
3. **Run the deploy:** merge to `main`, or Actions > Deploy to GitHub Pages > Run workflow.
4. **Add DNS records in Zoho** (Domains > ak-systems.in > DNS / Manage DNS). Keep the Zoho Mail
   MX and TXT records as they are.

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | ak-systems-chennai-treat.github.io |

   Delete any other A or CNAME record on `@` or `www` (for example Zoho's parking page).
5. **Custom domain:** Settings > Pages > Custom domain: `ak-systems.in` > Save. When the DNS
   check turns green (minutes to a few hours), tick **Enforce HTTPS**.
6. Optional, recommended: verify the domain under the organisation's Settings > Pages so no one
   else can claim it.

`public/_headers` is only used by Cloudflare; GitHub Pages ignores it.

## Alternative: Cloudflare Pages (free)

One-time setup, about 20 minutes:

1. **Cloudflare account:** sign up free at https://dash.cloudflare.com.
2. **Create the Pages project:** Workers & Pages > Create > Pages > Connect to Git, pick
   `AK-Systems-Chennai-Treat/ak-systems-website`, branch `main`.
   - Framework preset: None
   - Build command: `node build.mjs`
   - Build output directory: `dist`

   Save and deploy. The site is then live at `ak-systems-website.pages.dev`.
3. **Add the domain to Cloudflare:** Websites > Add a site > `ak-systems.in` > Free plan.
   Cloudflare copies your existing DNS records. Check that any Zoho Mail records (MX, SPF TXT,
   DKIM TXT) are in the list, and add them if not.
4. **Point the domain at Cloudflare:** Cloudflare shows 2 nameservers. In Zoho
   (Domains > ak-systems.in > Nameservers), replace Zoho's nameservers with those 2.
   This can take a few hours to a day.
5. **Connect the domain to the site:** in the Pages project > Custom domains, add
   `ak-systems.in` and `www.ak-systems.in`. Cloudflare creates the records and the free HTTPS
   certificate.
6. **Redirect www:** Rules > Redirect Rules > "Redirect from WWW to root" template.

After that, every merge to `main` goes live automatically within a minute or two.

## Any other host (GoDaddy, Zoho, cPanel)

Run `node build.mjs` and upload the **contents** of `dist/` to the host's web root
(`public_html` on cPanel). `_headers` is only used by Cloudflare and can be ignored elsewhere.

## Logo and icons

The master logo is `brand/ak-systems-logo.png`. To change the logo, replace that file and run
`python3 tools/make-logo.py brand/ak-systems-logo.png` (needs `pip install pillow numpy scipy`).
It rebuilds the header mark, footer logo, favicons, app icons and the link preview image in `src/assets/`.
