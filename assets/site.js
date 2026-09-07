/**
 * Renders the sidebar nav, the on-page TOC, and small interactions.
 * Reads NAV / NAV_FLAT from nav-data.js. Uses the per-page `BASE` string
 * (set inline in each html file, e.g. "" at the root or "../" one level down)
 * to turn root-relative hrefs from nav-data.js into working links.
 */

(function () {
  const currentId = document.body.getAttribute("data-page");
  const base = typeof BASE !== "undefined" ? BASE : "";

  // ---- sidebar ----
  const navList = document.getElementById("navList");
  if (navList) {
    NAV.forEach((group) => {
      const groupEl = document.createElement("div");
      groupEl.className = "nav-group";

      const title = document.createElement("p");
      title.className = "nav-group-title";
      title.textContent = group.group;
      groupEl.appendChild(title);

      const ul = document.createElement("ul");
      group.items.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = base + item.href;
        a.textContent = item.title;
        a.dataset.navFilterText = item.title.toLowerCase();
        if (item.id === currentId) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
        li.appendChild(a);
        ul.appendChild(li);
      });
      groupEl.appendChild(ul);
      navList.appendChild(groupEl);
    });
  }

  // ---- sidebar filter ----
  const filterInput = document.getElementById("navFilter");
  if (filterInput) {
    filterInput.addEventListener("input", () => {
      const q = filterInput.value.trim().toLowerCase();
      document.querySelectorAll("#navList li").forEach((li) => {
        const a = li.querySelector("a");
        const match = !q || a.dataset.navFilterText.includes(q);
        li.classList.toggle("hidden", !match);
      });
    });
  }

  // ---- mobile menu toggle ----
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => sidebar.classList.toggle("open"));
    document.addEventListener("click", (e) => {
      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        e.target !== menuToggle
      ) {
        sidebar.classList.remove("open");
      }
    });
  }

  // ---- prev / next footer ----
  const prevLink = document.getElementById("prevLink");
  const nextLink = document.getElementById("nextLink");
  if (prevLink || nextLink) {
    const idx = NAV_FLAT.findIndex((i) => i.id === currentId);
    if (prevLink) {
      if (idx > 0) {
        prevLink.href = base + NAV_FLAT[idx - 1].href;
        prevLink.textContent = "← " + NAV_FLAT[idx - 1].title;
      } else {
        prevLink.style.visibility = "hidden";
      }
    }
    if (nextLink) {
      if (idx >= 0 && idx < NAV_FLAT.length - 1) {
        nextLink.href = base + NAV_FLAT[idx + 1].href;
        nextLink.textContent = NAV_FLAT[idx + 1].title + " →";
      } else {
        nextLink.style.visibility = "hidden";
      }
    }
  }

  // ---- right-hand "on this page" TOC, built from h2/h3 in .content ----
  const tocList = document.getElementById("tocList");
  const content = document.getElementById("content");
  if (tocList && content) {
    const headings = content.querySelectorAll("h2, h3");
    if (headings.length === 0) {
      const tocWrap = document.getElementById("toc");
      if (tocWrap) tocWrap.style.display = "none";
    } else {
      const links = [];
      headings.forEach((h, i) => {
        if (!h.id) h.id = "section-" + i;
        const li = document.createElement("li");
        if (h.tagName === "H3") li.className = "toc-h3";
        const a = document.createElement("a");
        a.href = "#" + h.id;
        a.textContent = h.textContent;
        li.appendChild(a);
        tocList.appendChild(li);
        links.push({ id: h.id, a });
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const link = links.find((l) => l.id === entry.target.id);
            if (!link) return;
            if (entry.isIntersecting) {
              links.forEach((l) => l.a.classList.remove("active"));
              link.a.classList.add("active");
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      headings.forEach((h) => observer.observe(h));
    }
  }
})();
