# Editing guide

Practical “I want to change X → edit Y” for [uiworks.io](https://uiworks.io).

After edits, refresh `bundle exec jekyll serve` (or rely on `--livereload`).

---

## Site identity & SEO

| Goal | File | Fields / notes |
| --- | --- | --- |
| Title, meta description | `_config.yml` | `title`, `description` |
| Canonical URL / domain | `_config.yml` + `CNAME` | `url`, `baseurl`; CNAME host |
| Logo in header/footer | `_config.yml` | `site_logo` (path under `/assets/images/`) |
| Favicon | `assets/images/favicon.ico` | Referenced in layouts |
| Google Analytics ID | `_config.yml` | `google_analytics` (loads only when `JEKYLL_ENV=production`) |
| Contact email (footer) | `_includes/footer.html` | Also `email` in `_config.yml` for site-wide use |
| Social links | `_config.yml` | `twitter_url`, `facebook_url`, `instagram_url` |

Restart Jekyll after `_config.yml` changes (config is not hot-reloaded reliably).

---

## Navigation

Edit **`_data/navigation.yml`**.

```yaml
- text: My Work
  url: /#mywork
- text: Products
  url: /#products
  submenu:
  - text: XCLOC Transalator
    url: https://www.producthunt.com/products/UiWorks#xcloc-translator
```

- Homepage anchors must match section `id`s in `_includes/` (see [STRUCTURE.md](STRUCTURE.md)).
- `#products` is linked in nav but **no homepage section currently has `id="products"`** — either add that id to a section or change the nav URL.
- CTA “See Plans” is hard-coded in `navigation.html` / `header.html` as `#seeplans`.

---

## Homepage copy & sections

Homepage order is controlled only by **`index.html`**. To reorder or remove a block, add/remove/move `{% include … %}` lines there.

| Edit | File |
| --- | --- |
| Hero headlines / slides | `_includes/slider.html` |
| Achievement strip (“My Work”) | `_includes/achivement.html` |
| Featured / latest projects strip | `_includes/latest_projects.html` |
| Press logos (CNET, TechCrunch, …) | `_includes/news.html` |
| Services tabs & tab content | `_includes/services_2.html` |
| Workflow steps | `_includes/workflow.html` |
| Pricing cards & checkout links | `_includes/pricing.html` |
| Enterprise CTA + Calendly | `_includes/enterprise.html` |
| FAQ accordion | `_includes/faq.html` |
| About text | `_includes/aboutus.html` |
| Bottom CTA | `_includes/hire_us_area.html` |

### Pricing (common change)

Open `_includes/pricing.html`:

- Plan name → `.title` / `.title2` headings  
- Features → `<ul>` lists  
- Price → `.price` (`$499`, `$799`, …)  
- Checkout → `href` on `.deneb_btn` (currently Nas.io links)  
- Enterprise blurb / Calendly → `_includes/enterprise.html`

---

## Portfolio page

**`portfolio.html`** is self-contained (not split into includes). Each project is a grid card:

1. Image under `assets/images/` (e.g. `portfolio_*.jpg`)
2. Title, category, description
3. App Store / Play Store links

To add a project: copy an existing `col-md-6 col-lg-4` card block, update image + text + store URLs, place a matching image in `assets/images/`.

Layout: `portfolio_noheader` (footer only, no site header).

---

## Alternate landing & legal

| Page | Includes |
| --- | --- |
| `update_to_latest.html` | `slider2`, `enterprise2`, `services_2`, `faq2` |
| `terms_and_condition.html` | `page_header`, `terms_service` |

Legal copy lives in `_includes/terms_service.html` (sections `#contact`, `#terms`, `#privacy`, `#cancel`).

---

## Images

- Put new files in **`assets/images/`** (subfolders like `shape/` already used for decorative SVGs/PNGs).
- Prefer absolute site paths in markup: `/assets/images/….png` (matches existing includes).
- Optimize large photos before commit; GitHub Pages serves them as-is.
- Logo: keep dimensions suitable for header; update `site_logo` if you rename the file.

---

## Styles

| Goal | File |
| --- | --- |
| Brand color (`#feb000`), fonts, text colors | `_sass/_variables.scss` |
| Small overrides | `_sass/custom.scss` |
| Header / footer / pricing / etc. | `_sass/_header.scss`, `_footer.scss`, `_pricing.scss`, … |
| New partial | Create `_sass/_name.scss` and `@import` it in `_sass/style.scss` |

Theme accent: `$theme_color: #feb000`. Fonts: Poppins / Montserrat (`$font1`, `$font2`).

Vendor CSS (Bootstrap, Slick, Animate, Font Awesome) lives under `assets/css/` and `assets/fonts/` — avoid editing minified vendor files.

---

## JavaScript

| File | Role |
| --- | --- |
| `assets/js/custom.js` | Site behavior (preloader, sliders, WOW, menus) |
| `assets/js/vendor/*` | Third-party — leave alone unless upgrading |

---

## Adding a new page

1. Create `my-page.html` at the repo root with front matter:

```yaml
---
layout: default
title: My Page
---
```

2. Add content or `{% include … %}`.
3. Link it from `_data/navigation.yml` or an in-page CTA.
4. Permalink defaults to `/:title` from `_config.yml` (e.g. title `My Page` → path depends on slug; prefer a clear `permalink:` in front matter if needed).

---

## Local check before push

```bash
bundle exec jekyll build
# optional: open _site/index.html via serve
bundle exec jekyll serve --livereload
```

Confirm:

- [ ] Homepage sections render (header + content + footer visible)
- [ ] Nav anchors scroll to the right blocks
- [ ] Pricing / Calendly / checkout links work
- [ ] New images load (no 404 in Network tab)
- [ ] Mobile menu still opens (`header.html` sidenav)

---

## Known gotchas

1. **`_config.yml` changes need a server restart.**
2. **Do not edit `_site/`** — it is overwritten on every build.
3. **`default.html` must not comment out** `{% include header.html %}`, `{{ content }}`, or the footer include.
4. Nav item **Products → `/#products`** has no matching section id yet.
5. Some relative image paths in includes use `../assets/...` (e.g. `news.html`); prefer `/assets/...` for consistency with GitHub Pages.
