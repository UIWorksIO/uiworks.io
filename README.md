# uiworks.io

Marketing website for **UiWorks** — Design-to-Code (UI) development and bug-fix services for Apple platforms (iOS, visionOS, iPadOS, macOS, watchOS, tvOS).

Live site: [https://uiworks.io](https://uiworks.io)  
Repo: [UIWorksIO/uiworks.io](https://github.com/UIWorksIO/uiworks.io)

## Stack

| Piece | Detail |
| --- | --- |
| Static site | [Jekyll](https://jekyllrb.com/) via `github-pages` gem |
| Theme base | Minima (layout is custom; Deneb-derived HTML/CSS) |
| Styles | SCSS in `_sass/` → compiled through `assets/css/style.scss` |
| Hosting | GitHub Pages (`CNAME` → `uiworks.io`) |
| Analytics | Google Analytics `G-8YYYLHRFST` (production only) |

## Quick start (local)

Requirements: Ruby 2.7+ / 3.x, Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Open [http://localhost:4000](http://localhost:4000).

Useful flags:

```bash
# Live reload while editing
bundle exec jekyll serve --livereload

# Force production plugins/analytics behavior
JEKYLL_ENV=production bundle exec jekyll serve
```

Built output lands in `_site/` (do not edit that folder by hand).

## Docs for editing later

| Doc | Use when |
| --- | --- |
| [docs/STRUCTURE.md](docs/STRUCTURE.md) | You need a map of folders, pages, and section includes |
| [docs/EDITING.md](docs/EDITING.md) | You want to change copy, pricing, nav, images, or styles |
| [AGENTS.md](AGENTS.md) | Cursor / AI agents should follow project conventions |

## Site map (pages)

| URL | Source file | Notes |
| --- | --- | --- |
| `/` | `index.html` | Homepage — assembles sections from `_includes/` |
| `/portfolio` | `portfolio.html` | Portfolio grid (self-contained markup) |
| `/terms_and_condition` | `terms_and_condition.html` | Terms / privacy / cancel |
| `/update_to_latest` | `update_to_latest.html` | Alternate landing (OS update pitch) |
| `/404.html` | `404.html` | Not found |

## Deploy

Push to the GitHub Pages branch/source configured for this repo. The custom domain is set in `CNAME` (`uiworks.io`). Site settings live in `_config.yml`.

## License

MIT — see [LICENSE](LICENSE).
