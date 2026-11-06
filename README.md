# UiWorks

Waitlist landing page for **UiWorks** — centralized UI control for mobile and web teams. Ship instantly across platforms. Unleash AI safely.

Live domain: [https://uiworks.io](https://uiworks.io)

## Stack

| Piece | Detail |
| --- | --- |
| App | Vite + React + TypeScript |
| Styles | Tailwind CSS v4 |
| Hero visual | Responsive SVG design-system constellation |
| Hosting | Cloudflare Pages |
| Waitlist | Substack subscribe |

## Local development

```bash
cp .env.example .env
# set VITE_SUBSTACK_PUBLISHING_URL to your Substack publication URL
npm install
npm run dev
```

Build:

```bash
npm run build
# output → dist/
```

## Substack

1. Create a Substack publication for product updates / early access.
2. Set `VITE_SUBSTACK_PUBLISHING_URL` (e.g. `https://uiworks.substack.com`) — no trailing slash.
3. Form submit opens `{publication}/subscribe?email=…` for confirmation.

## Cloudflare Pages

| Setting | Value |
| --- | --- |
| Framework preset | Vite (or None) |
| Root directory | `/` (repo root) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Env var | `VITE_SUBSTACK_PUBLISHING_URL` |

SPA fallback: `public/_redirects`. Security headers: `public/_headers`.

`VITE_` vars are inlined at **build** time — redeploy after changing them. Attach `uiworks.io` under Pages → Custom domains (DNS at Cloudflare).
