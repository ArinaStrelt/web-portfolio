// script.js

/* Portfolio website recreated from the Figma file. Vanilla HTML, CSS and JS. */
(() => {
  "use strict";

  const app = document.getElementById("app");
  const pages = new Map(
    [...document.querySelectorAll("template[data-title]")].map(template => [
      template.id.replace("page-", ""),
      template
    ])
  );
  const sections = [...pages.keys()].filter(route => route !== "home");

  const dialog = document.getElementById("art-dialog");
  const dialogImg = document.getElementById("dialog-image");
  const dialogCaption = document.getElementById("dialog-caption");
  const dialogControls = dialog.querySelector(".dialog-controls");

  let currentRoute = null;
  let gallery = [];
  let galleryIndex = 0;
  let highlightFrame = 0;
  let swipeStartX = null;
  let menuListenerAbort = new AbortController();

  // Clone shared markup without adding layout wrappers.
  function cloneTemplate(id) {
    const fragment = document.getElementById(id).content.cloneNode(true);

    fragment.querySelectorAll("template[data-include]").forEach(placeholder => {
      placeholder.replaceWith(cloneTemplate(placeholder.dataset.include));
    });

    return fragment;
  }

  // Image paths, captions and available widths live in index.html.
  function prepareImages(fragment) {
    fragment.querySelectorAll("img").forEach(img => {
      img.decoding = "async";

      if (!img.hasAttribute("loading")) {
        img.loading = "lazy";
      }

      if (img.dataset.widths) {
        const source = img.getAttribute("src");
        const widths = img.dataset.widths.trim().split(/\s+/);

        if (!img.hasAttribute("sizes")) {
          img.sizes = "100vw";
        }

        img.srcset = widths.map(width =>
          `${source.replace(/-\d+w\.webp$/, `-${width}w.webp`)} ${width}w`
        ).join(", ");
      }

      const button = img.closest("button[data-art]");
      if (button) {
        button.setAttribute("aria-label", `Enlarge ${img.alt}`);
      }
    });
  }

  function prepareNavigation(fragment, route) {
    const header = fragment.querySelector(".site-header");
    header.classList.toggle("header-on-image", route !== "home");

    fragment.querySelectorAll(".desktop-nav a, .mobile-nav a").forEach(link => {
      if (link.getAttribute("href") === `#${route}`) {
        link.setAttribute("aria-current", "page");
      }
    });

    const index = Math.max(0, sections.indexOf(location.hash.slice(1)));

    fragment.querySelectorAll(".section-switcher a").forEach(link => {
      const direction = Number(link.dataset.direction);
      const target = sections[(index + direction + sections.length) % sections.length];

      link.href = `#${target}`;
      link.querySelector("[data-label]").textContent =
        pages.get(target).dataset.title.toUpperCase();
    });
  }

  function routeFromHash() {
    const route = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    return pages.has(route) ? route : "home";
  }

  function render() {
    const route = routeFromHash();
    if (route === currentRoute && app.children.length) return;

    menuListenerAbort.abort();
    menuListenerAbort = new AbortController();
    currentRoute = route;

    const template = pages.get(route);
    const fragment = cloneTemplate(template.id);

    prepareImages(fragment);
    prepareNavigation(fragment, route);
    app.replaceChildren(fragment);

    document.title = `${template.dataset.title} | Arina Doležalová`;
    document.body.dataset.route = route;

    scheduleHighlight();
    window.scrollTo({ top: 0, behavior: "instant" });
    bindMenu(route);
  }

  function bindMenu(route) {
    const button = app.querySelector(".menu-toggle");
    const menu = app.querySelector("#mobile-nav");

    const setExpanded = expanded => {
      button.setAttribute("aria-expanded", String(expanded));
      button.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
      menu.hidden = !expanded;
    };

    const closeMenu = () => {
      if (!menu.hidden) setExpanded(false);
    };

    button.addEventListener("click", () => {
      setExpanded(button.getAttribute("aria-expanded") !== "true");
    });

    menu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("pointerdown", event => {
      if (
        currentRoute === route &&
        !menu.hidden &&
        !menu.contains(event.target) &&
        !button.contains(event.target)
      ) {
        closeMenu();
      }
    }, { signal: menuListenerAbort.signal });
  }

  // Extend a highlighted line only into empty space. Text before/after a
  // <mark> may share its line after wrapping: a full-width stripe must never
  // turn unmarked words into red-backed words when the viewport is resized.
  function drawHighlightExtensions() {
    document.querySelectorAll(".highlight-extension").forEach(el => el.remove());

    const mark = document.querySelector("mark[data-highlight]");
    if (!mark) return;

    const mode = mark.dataset.highlight;
    const container = mark.closest(mode === "home" ? ".home-grid" : ".game-layout");
    const column = mark.closest(mode === "home" ? ".about-panel" : ".game-aside");
    if (!container || !column) return;

    const containerRect = container.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    const canvasRect = container.closest(".page-frame").getBoundingClientRect();
    const rects = [...mark.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0);
    if (!rects.length) return;

    const textRects = node => {
      if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) {
        return [];
      }

      const range = document.createRange();
      range.selectNodeContents(node);
      return [...range.getClientRects()].filter(rect => rect.width > 0 && rect.height > 0);
    };

    const beforeRects = textRects(mark.previousSibling);
    const afterRects = textRects(mark.nextSibling);
    const sameLine = (rect, others) => others.some(other =>
      Math.abs(other.top - rect.top) < Math.max(4, rect.height * 0.3)
    );

    const leftEdge = Math.max(canvasRect.left, 0);
    const rightEdge = Math.min(canvasRect.right, window.innerWidth);
    const layer = document.createElement("div");

    layer.className = "highlight-extensions";
    layer.setAttribute("aria-hidden", "true");

    const isMobile = window.matchMedia("(max-width: 760px)").matches;
    const textRight = isMobile && mode === "home"
      ? mark.closest(".about-copy").getBoundingClientRect().right
      : columnRect.right;

    rects.forEach((rect, index) => {
      const hasBefore = sameLine(rect, beforeRects);
      const hasAfter = sameLine(rect, afterRects);
      let from = rect.left;
      let to = rect.right;

      if (mode === "home") {
        // First line reaches the end of the text column, never into the icons.
        if (index === 0 && !hasAfter) {
          to = Math.max(to, Math.min(textRight, rightEdge));
        }

        // The last wrapped line can reach the left edge if it starts the line.
        if (index === rects.length - 1 && index > 0 && !hasBefore) {
          from = leftEdge;
        }
      } else {
        // Godot engine (or any other unmarked words) must stay on white.
        if (index === 0 && !hasBefore) {
          from = leftEdge;
        }

        if (index < rects.length - 1 && !hasAfter) {
          to = Math.max(to, Math.min(columnRect.right, rightEdge));
        }
      }

      if (to <= from) return;

      const stripe = document.createElement("span");
      stripe.className = "highlight-extension";

      Object.assign(stripe.style, {
        left: `${from - containerRect.left}px`,
        top: `${rect.top - containerRect.top}px`,
        width: `${to - from}px`,
        height: `${rect.height}px`
      });

      layer.appendChild(stripe);
    });

    container.prepend(layer);
  }

  // The Victorian blockout image and Walkthrough button share a bottom edge.
  // Measure the actual wrapped text so alignment survives intermediate widths.
  function alignVictorianStudy() {
    const image = app.querySelector(".victorian-blockout");
    const button = app.querySelector(".victorian-study .walkthrough-btn");
    if (!image || !button) return;

    image.style.height = "";
    if (window.innerWidth <= 1100) return;

    const imageBox = image.getBoundingClientRect();
    const buttonBox = button.getBoundingClientRect();
    const targetHeight = Math.max(imageBox.height, buttonBox.bottom - imageBox.top);

    image.style.height = `${Math.ceil(targetHeight)}px`;
  }

  function scheduleHighlight() {
    cancelAnimationFrame(highlightFrame);

    highlightFrame = requestAnimationFrame(() => {
      drawHighlightExtensions();
      alignVictorianStudy();
    });
  }

  function openZoom(image) {
    if (!image) return;

    // Use the full-size source, not the responsive thumbnail's currentSrc.
    dialogImg.src = image.src;
    dialogImg.alt = image.alt;
    dialogCaption.textContent = image.alt;
    dialogControls.hidden = gallery.length < 2;

    if (!dialog.open) dialog.showModal();
  }

  function stepArtwork(delta) {
    if (!dialog.open || gallery.length < 2) return;

    galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length;
    openZoom(gallery[galleryIndex]);
  }

  app.addEventListener("click", event => {
    const button = event.target.closest("button[data-art]");
    if (!button) return;

    const image = button.querySelector("img");
    gallery = [...app.querySelectorAll("button[data-art] img")];
    galleryIndex = gallery.indexOf(image);
    openZoom(image);
  });

  document.getElementById("dialog-prev").addEventListener("click", () => stepArtwork(-1));
  document.getElementById("dialog-next").addEventListener("click", () => stepArtwork(1));

  dialogImg.addEventListener("touchstart", event => {
    if (event.touches.length === 1) {
      swipeStartX = event.touches[0].clientX;
    }
  }, { passive: true });

  dialogImg.addEventListener("touchend", event => {
    if (swipeStartX === null || event.changedTouches.length !== 1) return;

    const distance = event.changedTouches[0].clientX - swipeStartX;
    swipeStartX = null;

    if (Math.abs(distance) > 55) {
      stepArtwork(distance < 0 ? 1 : -1);
    }
  }, { passive: true });

  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", event => {
    if (dialog.open && gallery.length >= 2) {
      if (event.key === "ArrowRight") stepArtwork(1);
      if (event.key === "ArrowLeft") stepArtwork(-1);
    }

    if (event.key === "Escape") {
      const menu = app.querySelector("#mobile-nav");
      const button = app.querySelector(".menu-toggle");

      if (menu && !menu.hidden) {
        menu.hidden = true;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-label", "Open navigation");
        button.focus();
      }
    }
  });

  document.querySelector(".skip-link").addEventListener("click", event => {
    event.preventDefault();

    const main = document.getElementById("page-content");
    if (!main) return;

    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
    main.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  window.addEventListener("resize", scheduleHighlight, { passive: true });
  window.addEventListener("hashchange", render);

  if (document.fonts?.ready) {
    document.fonts.ready.then(scheduleHighlight);
  }

  render();
})();