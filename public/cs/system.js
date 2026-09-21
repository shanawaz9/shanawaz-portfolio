/* ===================================================================
   PORTFOLIO CASE-STUDY SYSTEM -- shared behaviour
   -------------------------------------------------------------------
   Every case study gets the same four behaviours:
     1. reading progress
     2. rail scrollspy (desktop)
     3. mobile section nav, which names the current section
     4. reveal-on-scroll, suppressed for reduced-motion

   Progressive enhancement throughout: with JS off the rail is still a
   working list of anchor links and the article still reads top to
   bottom.
   =================================================================== */
(function () {
  'use strict';

  /* `js-motion` is set by an inline script in <head> so the hidden state
     is in place before first paint; this file only advances it to `in`. */
  var toArray = function (nodes) { return Array.prototype.slice.call(nodes); };

  /* ---------- 1. reading progress ---------- */
  (function () {
    var fill = document.querySelector('.progress i');
    if (!fill) return;
    var bar = fill.parentElement;
    var ticking = false;
    function update() {
      ticking = false;
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (doc.scrollTop || document.body.scrollTop) / max * 100)) : 0;
      fill.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
  })();

  /* ---------- 2 + 3. section tracking, rail and mobile bar ----------
     One observer drives both, so the rail and the mobile bar can never
     disagree about which section you are in. */
  (function () {
    var railLinks = toArray(document.querySelectorAll('.rail a.raillink'));
    var mobLinks = toArray(document.querySelectorAll('.mobnav a[href^="#"]'));
    var links = railLinks.concat(mobLinks);
    var here = document.querySelector('.mobbar-here');
    if (!links.length) return;

    /* Build the ordered list of target sections from the rail (falling
       back to the mobile list), skipping anchors with no target. */
    var source = railLinks.length ? railLinks : mobLinks;
    var sections = [];
    source.forEach(function (l) {
      var id = l.getAttribute('href');
      if (!id || id.charAt(0) !== '#') return;
      var el = document.getElementById(id.slice(1));
      if (el && sections.indexOf(el) === -1) sections.push(el);
    });
    if (!sections.length) return;

    var labels = {};
    source.forEach(function (l) {
      var id = l.getAttribute('href');
      if (!id) return;
      var t = l.querySelector(".lbl");
      labels[id] = (t ? t.textContent : l.textContent).trim();
    });

    var current = null;
    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach(function (l) {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
      if (here) here.textContent = labels['#' + id] || '';
    }

    if (!('IntersectionObserver' in window)) {
      if (here) here.textContent = labels[source[0].getAttribute('href')] || '';
      return;
    }

    /* A band across the upper third of the viewport: the section whose
       heading has most recently crossed it is the one you are reading. */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-12% 0px -72% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });

    /* Before the first section scrolls in, the bar names the article
       itself rather than sitting empty. */
    if (here && !here.textContent) here.textContent = here.getAttribute('data-default') || 'Overview';
  })();

  /* ---------- mobile nav open / close ---------- */
  (function () {
    var toggle = document.querySelector('.mobbar-toggle');
    var panel = document.querySelector('.mobnav');
    if (!toggle || !panel) return;

    function setOpen(open) {
      panel.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-open', open);
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    /* Tapping a section closes the panel so the jump is visible. */
    panel.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('a[href^="#"]')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    /* Resizing past the breakpoint must not leave the body locked. */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 980 && panel.classList.contains('open')) setOpen(false);
    });
  })();

  /* ---------- scrolling screenshot frames ----------
     The "scroll" hint retires as soon as the reader has taken the point. */
  (function () {
    toArray(document.querySelectorAll('.scrollshot-frame')).forEach(function (frame) {
      frame.addEventListener('scroll', function () {
        if (frame.scrollTop > 24) frame.classList.add('is-scrolled');
        else frame.classList.remove('is-scrolled');
      }, { passive: true });
    });
  })();

  /* ---------- 4. reveal on scroll ---------- */
  (function () {
    if (!document.documentElement.classList.contains('js-motion')) return;
    var scope = document.querySelector('.article-in');
    if (!scope) return;

    /* Must stay in step with the hidden-state selector in system.css.
       A page with components of its own adds them via data-reveal on
       <body>, and declares their hidden state in its project layer. */
    var sel = 'h1,.standfirst,.lead,.meta,.facts,.disclosure,.nda-line,.chips,.chapter > *,' +
              'figure,.hero-shot,.showcase,.pull,blockquote,.notes,.spec,.plain,.terms,' +
              '.stats,.ba,.band,.shifts,.asks,.seq,.inline-note,.colophon,.authorbox';
    var extra = document.body.getAttribute('data-reveal');
    if (extra) sel += ',' + extra;
    var els = toArray(scope.querySelectorAll(sel));
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });

    /* Stagger only what is already on screen at load; everything below
       the fold reveals as it arrives, with no delay stacking up. */
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var n = 0;
    els.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh) {
        el.style.transitionDelay = (Math.min(n, 8) * 0.045) + 's';
        n++;
      }
      io.observe(el);
    });
  })();
})();
