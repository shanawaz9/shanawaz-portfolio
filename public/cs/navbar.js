/* ===================================================================
   SITE NAVBAR behaviour (case-study pages)
   Mirrors the app's <Navbar> interactions: the hamburger toggles the
   drop panel, and the panel closes on link click, Escape, or once the
   viewport is wide enough for the inline links again.
   =================================================================== */
(function () {
  var nav = document.querySelector('.site-nav');
  if (!nav) return;

  var burger = nav.querySelector('.nav-hamburger');
  var menu = document.querySelector('.site-mobile-menu');
  if (!burger || !menu) return;

  function setOpen(open) {
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.style.display = open ? 'flex' : 'none';
    // let the panel paint at its start position before transitioning in
    if (open) {
      requestAnimationFrame(function () {
        menu.classList.add('open');
      });
    } else {
      menu.classList.remove('open');
    }
  }

  function isOpen() {
    return burger.classList.contains('open');
  }

  burger.addEventListener('click', function () {
    setOpen(!isOpen());
  });

  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      setOpen(false);
      burger.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (isOpen() && window.innerWidth > 768) setOpen(false);
  });

  setOpen(false);
})();
