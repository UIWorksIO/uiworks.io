# Agent instructions — uiworks.io

This repo is the **Vite + React** waitlist / marketing site for UiWorks, hosted on **Cloudflare Pages** at uiworks.io.

## Before changing anything

Prefer editing:

- `src/components/` — page sections (Hero, HeroVisual, Features, BottomCta, WaitlistForm)
- `src/lib/substack.ts` — waitlist subscribe helper
- `src/index.css` — Tailwind theme tokens (brand amber `#feb000`)
- `.env.example` / Cloudflare env — `VITE_SUBSTACK_PUBLISHING_URL`

## Hard rules

- **Do not revive Jekyll** unless the user explicitly asks.
- **Do not commit secrets.** `.env` is gitignored; only public Substack URLs belong in `VITE_` vars.
- Keep the dark, product-led visual language and amber brand `#feb000` unless redesign is requested.
- Keep “how it works” mysterious in copy — no JSON schema, SDUI, A2UI, middleware, or BaaS language.

## Layout

Single page composed in `src/App.tsx`:

1. `Hero` (+ `HeroVisual` design-system constellation)
2. `Features`
3. `BottomCta`
4. Footer

## Verify locally

```bash
npm install
npm run build
# or
npm run dev
```

## Scope discipline

- Change only files needed for the request.
- Do not expand into a full product app unless asked.
