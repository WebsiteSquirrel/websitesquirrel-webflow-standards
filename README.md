# How This Site Works

_Meta_

No build step, no CMS, no dependencies to install. It's plain HTML/CSS/JS — open a file in any editor, save, refresh the browser.

## File structure

```
/ (site root)
├── index.html                 → homepage
├── README.md                  → this page
├── assets/
│   ├── style.css              → all styling, tokens at the top
│   ├── nav-data.js             → sidebar structure (single source of truth)
│   └── site.js                 → renders sidebar, TOC, mobile menu, prev/next
├── docs/
│   └── *.html                 → Project Structure SOP pages
└── starter-template/
    └── *.html                 → Starter Template pages
```

## Two workflows for work-in-progress content

### 1. Status tags — for pages you know you'll need

If you already know a page needs to exist (e.g. a Starter Template page for CMS setup), create it now with placeholder content and mark it with a status tag, instead of leaving it out of the sidebar entirely. That keeps the sidebar as your real, complete outline.

`Status: Planned` · `Status: Draft` · `Status: Complete`

```html
<span class="tag status-planned">Status: Planned</span>
```

### 2. Ideas & Backlog — for anything not ready to be a page yet

Half-formed thoughts, questions to resolve, or things to write up "eventually" go on the [Ideas & Backlog](notes/ideas.html) page instead of a real doc page. When an idea is solid, give it its own page and move it to "Promoted" on that page. Nothing there is an authoritative rule — it's just a place so ideas don't get lost between sessions.

## Adding a new page

1. Copy an existing page in `/docs` or `/starter-template` that's closest to what you need.
2. Update its `<title>` and the visible `<h1>`/lede.
3. Give `<body data-page="…">` a unique id.
4. Add a matching entry to `assets/nav-data.js` under the right group (or create a new group).
5. Write your content inside `<main class="content" id="content">…</main>`, using the existing headings, tables, lists, and `.callout` boxes as patterns.

The sidebar, active-page highlight, "on this page" right-hand TOC, and Previous/Next footer links are all generated automatically from `nav-data.js` and the headings on the page — you don't edit those by hand.

## Content building blocks you can reuse

| Block | Use it for |
| --- | --- |
| `<div class="callout">` | A neutral/positive note or reference link |
| `<div class="callout warn">` | A warning or "don't skip this" note |
| `<table class="doc-table">` | Convention tables (What / Convention / Example, etc.) |
| `<div class="card-grid">` + `<div class="card">` | Short scannable groupings (page types, section names) |
| `<span class="tag">` | Small status labels like "Placeholder" or "Updated" |
| Inline `<code>` | Any literal class name, slug, or file name |

## Changing the look

Every color, font, and spacing token lives at the top of `assets/style.css` in the `:root` block. Change a value there and it updates across every page — no hunting through individual files.

## Deploying / sharing it

- **Just looking locally:** double-click `index.html` to open it in a browser. Everything works offline except the Google Fonts (falls back to system fonts).
- **Free hosting:** drag the whole folder into [Netlify Drop](https://app.netlify.com/drop), or push it to a GitHub repo and enable GitHub Pages.
- **Inside Webflow:** the content patterns here can be ported into a real Webflow "Docs" page set later if you want it to live alongside the marketing site — this static version is the fast way to start writing today.
