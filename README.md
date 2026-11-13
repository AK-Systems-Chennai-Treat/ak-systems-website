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

## Publish on Cloudflare Pages (free), domain at Zoho

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

## Images

`og-image.png` (link previews) and `apple-touch-icon.png` were made with
`node tools/make-images.cjs` (needs Playwright). Re-run only if the logo changes.
