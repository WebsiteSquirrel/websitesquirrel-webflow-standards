/**
 * Single source of truth for the sidebar navigation.
 *
 * HOW TO ADD A PAGE:
 * 1. Copy an existing .html file in /docs or /starter-template as a starting point.
 * 2. Set <body data-page="your-page-id"> to a unique id.
 * 3. Add an entry below with that same id, a title, and the path from the site root
 *    (no leading slash).
 * That's it — the sidebar, active-state highlighting, and prev/next footer links
 * on every page update automatically because they all read from this one file.
 */

const NAV = [
  {
    group: "Getting Started",
    items: [
      { id: "overview", title: "Overview", href: "index.html" },
      { id: "how-this-site-works", title: "How This Site Works", href: "README.html" },
    ],
  },
  {
    group: "Project Structure SOP",
    items: [
      { id: "naming-conventions", title: "Naming Conventions", href: "docs/naming-conventions.html" },
      { id: "required-pages", title: "Required Pages", href: "docs/required-pages.html" },
      { id: "component-organization", title: "Component & Section Organization", href: "docs/component-organization.html" },
      { id: "definition-of-done", title: "Definition of Done", href: "docs/definition-of-done.html" },
      { id: "project-setup-checklist", title: "New Project Setup Checklist", href: "docs/project-setup-checklist.html" },
      { id: "qa-and-golive", title: "QA & Go-Live Connection", href: "docs/qa-and-golive.html" },
    ],
  },
  {
    group: "Starter Template",
    items: [
      { id: "starter-template-overview", title: "Overview", href: "starter-template/overview.html" },
    ],
  },
  {
    group: "Working Notes",
    items: [
      { id: "ideas-backlog", title: "Ideas & Backlog", href: "notes/ideas.html" },
    ],
  },
];

// Flat ordered list, used to compute Previous/Next footer links.
const NAV_FLAT = NAV.flatMap((g) => g.items);
