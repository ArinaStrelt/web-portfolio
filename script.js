/* Portfolio website recreated from the Figma file. Vanilla HTML, CSS and JS. */
(() => {
  'use strict';
  const A = window.PORTFOLIO_ASSETS || {};
  const app = document.getElementById('app');
  const routes = ['home', 'game-art', 'illustrations', 'concepts'];
  const routeLabels = { home: 'Home', 'game-art': 'Game Art', illustrations: 'Illustrations', concepts: 'Design Concepts' };
  const IMAGESETS = window.PORTFOLIO_IMAGESETS || {};
  const image = (key, alt = '', cls = '', eager = false) => {
    const src = A[key] || '';
    const variants = IMAGESETS[key];
    const sizes = key === 'portrait' ? '(max-width: 760px) 100vw, 46vw'
      : key.startsWith('card') ? '(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw'
      : key.startsWith('gameSmall') || key.startsWith('conceptsSketch') ? '(max-width: 760px) 50vw, 25vw'
      : key === 'conceptsVictorianBlockout' ? '(max-width: 760px) 100vw, 45vw'
      : '100vw';
    return `<img src="${src}"${variants ? ` srcset="${variants}" sizes="${sizes}"` : ''} alt="${alt}" class="${cls}" ${eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async">`;
  };
  const zoom = (key, alt, cls = '') => `<button type="button" class="artwork-zoom ${cls}" data-art="${key}" data-caption="${alt.replace(/"/g, '&quot;')}" aria-label="Enlarge ${alt}">${image(key, alt)}</button>`;

  const icon = (type) => {
    const shapes = {
      mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/>',
      globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 2.7 4.5 5.7 4.5 9S15 18.3 12 21M12 3C9 5.7 7.5 8.7 7.5 12S9 18.3 12 21"/>',
      instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/>',
      gamepad: '<path d="M6.8 8h10.4a4 4 0 0 1 3.9 3.2l1.1 5.1a2.4 2.4 0 0 1-3.6 2.5l-3.3-2H8.7l-3.3 2a2.4 2.4 0 0 1-3.6-2.5l1.1-5.1A4 4 0 0 1 6.8 8Z"/><path d="M7.5 11v5m-2.5-2.5h5m6.3-1.2h.1m2 2h.1"/>'
    };
    return `<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[type]}</svg>`;
  };

  const header = (route, light = false) => `
    <header class="site-header ${light ? 'header-on-image' : ''}">
      <a href="#home" class="site-signature" aria-label="Arina Doležalová — Home">ARINA DOLEŽALOVÁ</a>
      <nav class="desktop-nav" aria-label="Main navigation">
        ${routes.map(r => `<a href="#${r}" ${r === route ? 'aria-current="page"' : ''}>${routeLabels[r]}</a>`).join('')}
      </nav>
      <a class="header-email" href="mailto:aristrela.art@gmail.com">aristrela.art@gmail.com</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-label="Toggle navigation" aria-controls="mobile-nav"><span></span><span></span><span></span></button>
    </header>
    <nav id="mobile-nav" class="mobile-nav" aria-label="Mobile navigation" hidden>
      ${routes.map(r => `<a href="#${r}" ${r === route ? 'aria-current="page"' : ''}>${routeLabels[r]}</a>`).join('')}
    </nav>`;

  const footer = () => `
    <footer class="contact-footer" id="contact">
      <div class="contact-wrap">
        <h2>LET’S CHAT!</h2>
        <div class="contact-links">
          <a href="mailto:aristrela.art@gmail.com">${icon('mail')}<span>aristrela.art@gmail.com</span></a>
          <a href="https://aristrela.artstation.com/" target="_blank" rel="noopener noreferrer">${icon('globe')}<span>aristrela.artstation.com</span></a>
          <a href="https://www.instagram.com/aristrela.art/" target="_blank" rel="noopener noreferrer">${icon('instagram')}<span>@aristrela.art</span></a>
          <a href="https://aristrela.itch.io/" target="_blank" rel="noopener noreferrer">${icon('gamepad')}<span>aristrela.itch.io</span></a>
        </div>
      </div>
    </footer>`;

  const sectionNav = (left, right) => `
    <nav class="section-switcher" aria-label="Explore other sections">
      <a href="#${left}"><span aria-hidden="true" class="nav-arrow">←</span><span>${routeLabels[left].toUpperCase()}</span></a>
      <a href="#${right}"><span>${routeLabels[right].toUpperCase()}</span><span aria-hidden="true" class="nav-arrow">→</span></a>
    </nav>`;

  const home = () => `
    <section class="home-page page-frame" id="page-content" aria-label="Home">
      <div class="home-hero">
        ${image('portrait', 'Painted portrait of the artist', 'artist-portrait', true)}
        <div class="hero-type"><h1><span>PORT -</span><span>FOLIO</span></h1><p>2D GAME &amp; CONCEPT ARTIST</p></div>
        <a href="mailto:aristrela.art@gmail.com" class="hero-chat">LET’S CHAT <span aria-hidden="true">↗</span></a>
        ${header('home', false)}
      </div>
      <div class="home-grid">
        <section class="about-panel" aria-labelledby="who-heading">
          <h2 id="who-heading">WHO?!</h2>
          <p class="about-name">I’M ARINA</p>
          <div class="about-copy">
            <h3>2D game &amp; concept artist<br>based in Prague!</h3>
            <p>I work in game development, creating concepts, illustrations, and overall visual direction.</p>
            <p class="highlight-paragraph"><mark data-highlight="home">I specialize in environment, character, and asset design.</mark> My visual style ranges from realistic visuals using 3D bases and photobashing to cartoon-like designs with bright colors.</p>
          </div>
          <h3 class="tools-heading">My tools</h3>
          <div class="tools-icons" aria-label="Creative tools">
            ${['toolIllustrator', 'toolPhotoshop', 'toolProcreate', 'toolFigma', 'toolOther', 'toolUnreal', 'toolGodot'].map((key, i) => {
              const logo = image(key, ['Adobe Illustrator', 'Adobe Photoshop', 'Procreate', 'Figma', 'Creative software', 'Unreal Engine', 'Godot'][i], key === 'toolProcreate' ? 'tool-icon tool-icon-procreate' : 'tool-icon');
              return key === 'toolProcreate' ? `<span class="tool-icon-procreate-frame">${logo}</span>` : logo;
            }).join('')}
          </div>
        </section>
        <a href="#game-art" class="category-tile tile-game" aria-label="Explore game art">
          ${image('cardGame', 'Alien administration office game illustration', 'category-image')}
          <span class="tile-number">1</span><span class="tile-bottom"><strong>GAME ART</strong><small>GAMES MADE WITH JAM AND LOVE</small></span>
        </a>
        <a href="#illustrations" class="category-tile tile-illustration" aria-label="Explore illustrations">
          ${image('cardIllustrations', 'Forest illustration with a little white figure', 'category-image')}
          <span class="tile-number">2</span><span class="tile-bottom"><strong>ILLUSTRATIONS</strong><small>LET MY IMAGINATION FLY</small></span>
        </a>
        <a href="#concepts" class="category-tile tile-concepts" aria-label="Explore design concepts">
          ${image('cardConcepts', 'Victorian room concept artwork', 'category-image')}
          <span class="tile-number">3</span><span class="tile-bottom"><strong>CONCEPTS</strong><small>DESIGN THINKING AND CREATING</small></span>
        </a>
      </div>
      ${footer()}
    </section>`;

  const workHero = (route, asset, subtitle, heading) => `
    <section class="work-hero" aria-label="${heading}">
      ${image(asset, `${heading} cover artwork`, 'work-hero-image', true)}
      <div class="work-hero-titles"><p>${subtitle}</p><h1>${heading}</h1></div>
      ${header(route, true)}
    </section>`;

  const gameArt = () => `
    <main class="work-page page-frame" id="page-content">
      ${workHero('game-art', 'gameHero', 'The power of making', 'GAME ART')}
      <div class="game-content">
        <h2 class="project-title">YOUR FORM...INCOMPLORBED</h2>
        <div class="game-layout">
          <div class="game-aside">
            <a class="red-action" href="https://twafla.itch.io/oh-my-glurp" target="_blank" rel="noopener noreferrer" title="Play Oh My Glurp on itch.io">PLAAAY <span aria-hidden="true">↗</span></a>
            <div class="game-small-images">
              ${zoom('gameSmallOne', 'Your Form Incomplorbed — in-game desk screenshot')}
              ${zoom('gameSmallTwo', 'Your Form Incomplorbed — game environment screenshot')}
            </div>
            <div class="game-description">
              <h3>Matfyz Game Jam<br>Spring 2026</h3>
              <p class="highlight-paragraph">The game was created during a three-day Game Jam using the Godot engine. <mark data-highlight="game">I was responsible for the game’s overall visual style, “2.5D” environment and sound design.</mark></p>
              <p>The art style reflects the game’s humorous and absurd narrative. It combines an alien setting with the familiar atmosphere of an old city administration office.</p>
              <p>The visual storytelling highlights closed system discrimination against humans through an outdated manual, the robot Bob, and mistakes in human language.</p>
            </div>
          </div>
          <div class="game-screens">
            ${zoom('gameMainOne', 'Your Form Incomplorbed — alien administration game environment')}
            ${zoom('gameMainTwo', 'Your Form Incomplorbed — illustrated desk and application form')}
          </div>
          ${image('gameHand', '', 'game-hand')}
        </div>
      </div>
      ${sectionNav('illustrations', 'concepts')}
      ${footer()}
    </main>`;

  const illustrations = () => `
    <main class="work-page page-frame" id="page-content">
      ${workHero('illustrations', 'illustrationForest', 'Free spirit of creating', 'ILLUSTRATIONS')}
      <section class="illustration-gallery" aria-label="Illustration gallery">
        ${zoom('illustrationCity', 'City nested in orange rocky cliffs', 'illustration-panel illustration-city')}
        ${zoom('illustrationBirch', 'Small white figure in an autumn birch forest', 'illustration-panel illustration-birch')}
        ${zoom('illustrationSnow', 'Snowy forest, stone arch and crimson river', 'illustration-panel illustration-snow')}
      </section>
      ${sectionNav('game-art', 'concepts')}
      ${footer()}
    </main>`;

  const concepts = () => `
    <main class="work-page page-frame" id="page-content">
      ${workHero('concepts', 'conceptsHero', 'Thinking my way into', 'DESIGN CONCEPTS')}
      <section class="concept-gallery" aria-label="Concept art gallery">
        ${zoom('conceptsVictorianHero', 'The Victorian bride’s room — atmospheric environment', 'wide-art victorian-scene')}
        <div class="victorian-study">
          <div class="sketch-stack">
            ${zoom('conceptsSketch1', 'Victorian room — development sketch 1')}
            ${zoom('conceptsSketch2', 'Victorian room — development sketch 2')}
            ${zoom('conceptsSketch3', 'Victorian room — development sketch 3')}
          </div>
          ${zoom('conceptsVictorianBlockout', 'The Victorian bride’s room — 3D blockout', 'victorian-blockout')}
          <div class="concept-description">
            <h2>The Victorian bride’s room</h2>
            <p>The room contains key narrative elements (indexical storytelling) that allow the player or viewer to piece together the story.</p>
            <p>Additional personal belongings reflect the main character’s habits, identity, and behavioral residue, such as romantic novels scattered across the floor, jewelry, and paintings of nature.</p>
            <p>To ensure an authentic Victorian-era setting, historical references were thoroughly researched and collected.</p>
            <a class="red-action walkthrough-btn" href="https://youtu.be/tzF9FmW5yhQ" target="_blank" rel="noopener noreferrer">WALKTHROUGH <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div class="art-separator"></div>
        ${zoom('conceptsPotionTop', 'Five variants of fantasy health potion bottles', 'wide-art potion-top')}
        <div class="potion-row">
          ${zoom('conceptsPotionLeft', 'Fantasy health potion iterations and glass details')}
          ${zoom('conceptsPotionRight', 'Fantasy health potion bottle variations')}
        </div>
        <div class="art-separator"></div>
        <div class="hunters-row">
          <div class="hunter-art">${zoom('conceptsHunterOne', 'Hunter’s room — concept painting')}<span>HUNTER’S ROOM</span></div>
          <div class="hunter-art">${zoom('conceptsHunterTwo', 'Hunter’s room — 3D concept')}<span>HUNTER’S ROOM</span></div>
        </div>
        <div class="art-separator"></div>
        <div class="cave-intro">
          ${zoom('conceptsHouse', 'Cave village concept — sculptural cliff-side houses')}
          <div class="concept-description cave-copy">
            <h2>Cave village<br>(work in progress)</h2>
            <p>The concept made as a personal project.</p>
            <p>A special cave that makes “white clay” formations from the top to bottom adapted by the living creatures of the said cave.</p>
            <p>The formations are transformed into houses with additional wooden support for stability.</p>
          </div>
        </div>
        ${zoom('conceptsHouseVariations', 'Cave village — sketches and house variations', 'wide-art house-variations')}
      </section>
      ${sectionNav('game-art', 'illustrations')}
      ${footer()}
    </main>`;

  const templates = { home, 'game-art': gameArt, illustrations, concepts };
  let currentRoute = null;
  let gallery = [];
  let galleryIndex = 0;
  let menuListenerAbort = new AbortController();
  const dialog = document.getElementById('art-dialog');
  const dialogImg = document.getElementById('dialog-image');
  const dialogCaption = document.getElementById('dialog-caption');
  const dialogPrevious = document.getElementById('dialog-prev');
  const dialogNext = document.getElementById('dialog-next');

  function routeFromHash() {
    const route = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    return routes.includes(route) ? route : 'home';
  }
  // Extend a highlighted line only into empty space. Text before/after a
  // <mark> may share its line after wrapping: a full-width stripe must never
  // turn unmarked words into red-backed words when the viewport is resized.
  let highlightFrame = 0;
  function drawHighlightExtensions() {
    document.querySelectorAll('.highlight-extension').forEach(el => el.remove());
    const mark = document.querySelector('mark[data-highlight]');
    if (!mark) return;
    const mode = mark.dataset.highlight;
    const container = mark.closest(mode === 'home' ? '.home-grid' : '.game-layout');
    const column = mark.closest(mode === 'home' ? '.about-panel' : '.game-aside');
    if (!container || !column) return;
    const containerRect = container.getBoundingClientRect();
    const columnRect = column.getBoundingClientRect();
    const canvasRect = container.closest('.page-frame').getBoundingClientRect();
    const rects = [...mark.getClientRects()].filter(r => r.width > 0 && r.height > 0);
    if (!rects.length) return;
    const textRects = (node) => {
      if (!node || node.nodeType !== Node.TEXT_NODE || !node.textContent.trim()) return [];
      const range = document.createRange();
      range.selectNodeContents(node);
      return [...range.getClientRects()].filter(r => r.width > 0 && r.height > 0);
    };
    const beforeRects = textRects(mark.previousSibling);
    const afterRects = textRects(mark.nextSibling);
    const sameLine = (rect, otherRects) => otherRects.some(other =>
      Math.abs(other.top - rect.top) < Math.max(4, rect.height * .3)
    );
    const leftEdge = Math.max(canvasRect.left, 0);
    const rightEdge = Math.min(canvasRect.right, window.innerWidth);
    const layer = document.createElement('div');
    layer.className = 'highlight-extensions';
    layer.setAttribute('aria-hidden', 'true');
    const isMobile = window.matchMedia('(max-width: 760px)').matches;
    const textRight = isMobile && mode === 'home'
      ? mark.closest('.about-copy').getBoundingClientRect().right
      : columnRect.right;
    rects.forEach((rect, i) => {
      const hasBefore = sameLine(rect, beforeRects);
      const hasAfter = sameLine(rect, afterRects);
      let from = rect.left;
      let to = rect.right;
      if (mode === 'home') {
        // First line reaches the end of the text column, never into the icons.
        if (i === 0 && !hasAfter) to = Math.max(to, Math.min(textRight, rightEdge));
        // The last wrapped line can reach the left edge if it starts the line.
        if (i === rects.length - 1 && i > 0 && !hasBefore) from = leftEdge;
      } else {
        // Godot engine (or any other unmarked words) must stay on white.
        if (i === 0 && !hasBefore) from = leftEdge;
        if (i < rects.length - 1 && !hasAfter) to = Math.max(to, Math.min(columnRect.right, rightEdge));
      }
      if (to <= from) return;
      const stripe = document.createElement('span');
      stripe.className = 'highlight-extension';
      stripe.style.left = `${from - containerRect.left}px`;
      stripe.style.top = `${rect.top - containerRect.top}px`;
      stripe.style.width = `${to - from}px`;
      stripe.style.height = `${rect.height}px`;
      layer.appendChild(stripe);
    });
    container.prepend(layer);
  }
  // The Victorian blockout image and Walkthrough button share a bottom edge.
  // Measure the actual wrapped text so alignment survives intermediate widths.
  function alignVictorianStudy() {
    const image = app.querySelector('.victorian-blockout');
    const button = app.querySelector('.victorian-study .walkthrough-btn');
    if (!image || !button) return;
    image.style.height = '';
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
  window.addEventListener('resize', scheduleHighlight, { passive: true });
  if (document.fonts?.ready) document.fonts.ready.then(scheduleHighlight);

  function render() {
    const route = routeFromHash();
    if (route === currentRoute && app.children.length) return;
    menuListenerAbort.abort();
    menuListenerAbort = new AbortController();
    currentRoute = route;
    app.innerHTML = templates[route]();
    document.title = `${routeLabels[route]} | Arina Doležalová`;
    document.body.dataset.route = route;
    scheduleHighlight();
    window.scrollTo({ top: 0, behavior: 'instant' });
    const menuButton = app.querySelector('.menu-toggle');
    const mobileNav = app.querySelector('#mobile-nav');
    menuButton?.addEventListener('click', () => {
      const expanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!expanded));
      menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
      mobileNav.hidden = expanded;
    });
    const closeMenu = () => {
      if (mobileNav?.hidden) return;
      mobileNav.hidden = true;
      menuButton?.setAttribute('aria-expanded', 'false');
      menuButton?.setAttribute('aria-label', 'Open navigation');
    };
    mobileNav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('pointerdown', event => {
      if (currentRoute === route && !mobileNav?.hidden && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    }, { signal: menuListenerAbort.signal });
  }
  function openZoom(key, caption) {
    if (!A[key]) return;
    dialogImg.src = A[key];
    dialogImg.alt = caption;
    dialogCaption.textContent = caption;
    document.querySelector('.dialog-controls').hidden = gallery.length < 2;
    if (!dialog.open) dialog.showModal();
  }
  app.addEventListener('click', event => {
    const artButton = event.target.closest('[data-art]');
    if (artButton) {
      const key = artButton.dataset.art;
      gallery = [...app.querySelectorAll('[data-art]')].map(el => ({ key: el.dataset.art, caption: el.dataset.caption }));
      galleryIndex = gallery.findIndex(item => item.key === key);
      openZoom(key, artButton.dataset.caption);
    }

  });
  function stepArtwork(delta) {
    if (!dialog.open || gallery.length < 2) return;
    galleryIndex = (galleryIndex + delta + gallery.length) % gallery.length;
    openZoom(gallery[galleryIndex].key, gallery[galleryIndex].caption);
  }
  dialogPrevious.addEventListener('click', () => stepArtwork(-1));
  dialogNext.addEventListener('click', () => stepArtwork(1));
  let swipeStartX = null;
  dialogImg.addEventListener('touchstart', event => {
    if (event.touches.length === 1) swipeStartX = event.touches[0].clientX;
  }, {passive: true});
  dialogImg.addEventListener('touchend', event => {
    if (swipeStartX === null || event.changedTouches.length !== 1) return;
    const dx = event.changedTouches[0].clientX - swipeStartX;
    swipeStartX = null;
    if (Math.abs(dx) > 55) stepArtwork(dx < 0 ? 1 : -1);
  }, {passive: true});
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  document.addEventListener('keydown', e => {
    if (!dialog.open || gallery.length < 2) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      stepArtwork(e.key === 'ArrowRight' ? 1 : -1);
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const menu = document.getElementById('mobile-nav');
      if (menu && !menu.hidden) {
        menu.hidden = true;
        const toggle = document.querySelector('.menu-toggle');
        toggle?.setAttribute('aria-expanded', 'false');
        toggle?.setAttribute('aria-label', 'Open navigation');
        toggle?.focus();
      }
    }
  });
  document.querySelector('.skip-link')?.addEventListener('click', event => {
    event.preventDefault();
    const main = document.getElementById('page-content');
    if (!main) return;
    main.setAttribute('tabindex', '-1');
    main.focus({preventScroll: true});
    main.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
  window.addEventListener('hashchange', render);
  render();
})();
