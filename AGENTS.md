# Agent instructions — uiworks.io

This repo is the **Vite + React** waitlist / marketing site for UiWorks, hosted on **Cloudflare Pages** at uiworks.io.

## Before changing anything

Prefer editing:

- `src/components/` — page sections (Hero, HeroDecor, Features, Surfaces, BottomCta, WaitlistForm)
- `src/lib/substack.ts` — waitlist subscribe helper
- `src/index.css` — Tailwind theme tokens (cream + orange brand `#f15a24`)
- `wrangler.jsonc` — Cloudflare Workers static assets config
- `.env.example` / Cloudflare build env — `VITE_SUBSTACK_PUBLISHING_URL`

## Hard rules

- **Do not revive Jekyll** unless the user explicitly asks.
- **Do not commit secrets.** `.env` is gitignored; only public Substack URLs belong in `VITE_` vars.
- Keep the light cream / orange product aesthetic unless redesign is requested.
- Keep “how it works” mysterious in copy — no JSON schema, SDUI, A2UI, middleware, or BaaS language.
- For AI/agent positioning, prefer **“Agent interaction layer”** / **“Governed generative UI”** over protocol names.

## Layout

Single page composed in `src/App.tsx`:

1. `Hero` (+ ambient canvas, GSAP)
2. `Marquee`
3. `Features`
4. `ProductDemo`
5. `Agents`
6. `Surfaces`
7. `BottomCta`
8. Footer

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
