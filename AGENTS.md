# Agent instructions — uiworks.io

This repo is the **Jekyll** marketing site for UiWorks (Apple-platform UI / Design-to-Code service), hosted on **GitHub Pages** at uiworks.io.

## Before changing anything

1. Read [docs/STRUCTURE.md](docs/STRUCTURE.md) for the folder map and homepage section order.
2. Read [docs/EDITING.md](docs/EDITING.md) for the “change X → edit Y” table.
3. Prefer editing **`_includes/`**, **`_data/`**, **`_config.yml`**, and **`_sass/`** over inventing a new stack.

## Hard rules

- **Do not rewrite this as React/Next/etc.** unless the user explicitly asks for a migration.
- **Do not edit `_site/`** — it is generated output.
- **Do not commit secrets.** Analytics IDs and public URLs are fine; never add private keys or payment credentials.
- Keep the existing visual language (Deneb-derived layout, `$theme_color` amber `#feb000`, Poppins/Montserrat) unless the user requests a redesign.
- Match existing markup patterns: Bootstrap grid, `deneb_*` class names, WOW/`wow fadeIn*` animation classes, `{% include %}` composition.

## Layout integrity

`_layouts/default.html` must include (uncommented):

- `{% include header.html %}`
- `{{ content }}`
- `{% include footer.html %}`

`portfolio_noheader.html` intentionally skips the header.

## Typical edit targets

| Request | Primary files |
| --- | --- |
| Homepage copy / section order | `index.html`, matching `_includes/*.html` |
| Pricing / CTAs | `_includes/pricing.html`, `_includes/enterprise.html` |
| Nav | `_data/navigation.yml` |
| Brand / meta | `_config.yml` |
| Colors / typography | `_sass/_variables.scss`, `_sass/custom.scss` |
| Portfolio projects | `portfolio.html` + `assets/images/` |
| Behavior / sliders | `assets/js/custom.js` |

## Verify locally when possible

```bash
bundle install
bundle exec jekyll build
# or
bundle exec jekyll serve --livereload
```

## Scope discipline

- Change only files needed for the request.
- Do not “clean up” unrelated typos, vendor bundles, or unused includes unless asked.
- When adding a section, wire it in `index.html` (or the relevant page) and give it an `id` if nav should deep-link to it.
