# Project structure

UiWorks.io is a **Jekyll** site. Pages are thin wrappers; most homepage content lives in **`_includes/`** partials.

```
uiworks.io/
├── _config.yml          # Site title, URL, social, analytics, Sass
├── _data/
│   └── navigation.yml   # Main menu + Products submenu
├── _includes/           # Reusable HTML sections (homepage building blocks)
├── _layouts/
│   ├── default.html              # Standard layout (header + content + footer)
│   └── portfolio_noheader.html   # Portfolio layout (no header)
├── _sass/               # SCSS partials (variables, sections, custom)
├── assets/
│   ├── css/             # Vendor CSS + entry `style.scss`
│   ├── fonts/           # Font Awesome
│   ├── images/          # Logos, banners, portfolio, icons
│   └── js/              # custom.js + vendor (jQuery, Bootstrap, Slick, WOW…)
├── index.html           # Homepage section order
├── portfolio.html
├── terms_and_condition.html
├── update_to_latest.html
├── 404.html
├── CNAME                # uiworks.io
├── Gemfile              # github-pages + plugins
└── _site/               # Generated output — never edit manually
```

## How a page is built

1. Page front matter picks a layout, e.g. `layout: default`.
2. Layout (`_layouts/default.html`) loads CSS/JS, optional preloader, header, `{{ content }}`, footer.
3. Page body uses `{% include foo.html %}` to pull sections from `_includes/`.

Example — homepage (`index.html`):

```
slider → achivement → latest_projects → news → services_2
→ workflow → pricing → enterprise → faq → aboutus → hire_us_area
```

## Homepage section → file → anchor

| On-page section | Include file | Anchor `id` (for nav `#…`) |
| --- | --- | --- |
| Hero / banner slider | `slider.html` | — |
| Achievements / “My Work” | `achivement.html` | `#mywork` |
| Latest projects | `latest_projects.html` | `#projects` |
| Press logos | `news.html` | — |
| Services tabs | `services_2.html` | `#services` |
| How it works | `workflow.html` | `#workflow` |
| Pricing plans | `pricing.html` | `#seeplans` |
| Enterprise CTA | `enterprise.html` | — |
| FAQ | `faq.html` | `#faq` |
| About | `aboutus.html` | `#aboutus` |
| Bottom hire CTA | `hire_us_area.html` | — |

Shared chrome:

| Piece | File |
| --- | --- |
| Header / logo / desktop menu | `header.html` → `navigation.html` |
| Mobile sidenav | inside `header.html` |
| Footer | `footer.html` |
| Analytics snippet | `analytics.html` |
| Breadcrumb-style page header | `page_header.html` |

Unused / alternate includes (kept in repo, not all wired on homepage):  
`benefits.html`, `enterprise2.html`, `faq2.html`, `slider2.html`, `support.html`, `testimonials.html`, `sidebar.html`.

## Config vs content

| Change | Where |
| --- | --- |
| Site title, description, URL, logo path | `_config.yml` |
| Email / social URLs | `_config.yml` (`email`, `twitter_url`, …) |
| Nav labels and links | `_data/navigation.yml` |
| Brand colors / fonts | `_sass/_variables.scss` |
| Small one-off CSS tweaks | `_sass/custom.scss` |
| Section styles | matching `_sass/_*.scss` (imported from `_sass/style.scss`) |

Sass pipeline: `_sass/*` ← imported by `assets/css/style.scss` (front matter `---` only) → Jekyll emits `assets/css/style.css` (+ `custom.css` from `custom.scss` import).

## Layouts note

`_layouts/default.html` must render header, `{{ content }}`, and footer. If those Liquid tags are inside an HTML comment, **no page body will appear**. Prefer the portfolio layout only when you intentionally want no top nav.

## Tech leftovers

The UI started from a **Deneb** Jekyll agency template (comments in `_sass/style.scss`, Disqus script `deneb-1.disqus.com` in layouts). Treat those as legacy; product identity is UiWorks.
