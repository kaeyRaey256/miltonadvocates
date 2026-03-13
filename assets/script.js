/* ============================================================
   MILTON ADVOCATES — script.js  v5
   ============================================================ */

/* === NAVBAR HIDE ON FOOTER === */
(function () {
  const navbar = document.getElementById('navbar');
  const footer = document.getElementById('site-footer');
  if (!navbar || !footer) return;
  function checkFooter() {
    const footerTop = footer.getBoundingClientRect().top;
    const winH = window.innerHeight;
    // Hide navbar the moment footer enters the viewport
    if (footerTop < winH) {
      navbar.classList.add('hide');
    } else {
      navbar.classList.remove('hide');
    }
  }
  window.addEventListener('scroll', checkFooter, { passive: true });
  checkFooter();
})();

/* === MOBILE NAV — premium slide drawer === */
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const backdrop  = document.getElementById('mobileNavBackdrop');
  const closeBtn  = document.getElementById('mobileNavClose');
  if (!hamburger || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    backdrop && backdrop.classList.add('open');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeNav() {
    mobileNav.classList.remove('open');
    backdrop && backdrop.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openNav);
  closeBtn && closeBtn.addEventListener('click', closeNav);
  backdrop && backdrop.addEventListener('click', closeNav);
  document.querySelectorAll('.mobile-nav-link').forEach(l =>
    l.addEventListener('click', closeNav)
  );
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
});

/* === STICKY NAVBAR SCROLL STYLE === */
const navbar = document.getElementById('navbar');
if (navbar) window.addEventListener('scroll', () => {
  if (!navbar.classList.contains('hide')) {
    navbar.style.boxShadow = window.scrollY > 60
      ? '0 4px 32px rgba(0,0,128,0.55)'
      : '0 2px 20px rgba(0,0,128,0.4)';
  }
}, { passive: true });

/* === SCROLL REVEAL === */
const reveals = document.querySelectorAll('.scroll-reveal');
if (reveals.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        entry.target.style.transitionDelay = delay + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el, i) => {
    el.dataset.delay = i * 50;
    observer.observe(el);
  });
}

/* === SMOOTH SCROLL === */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* === PRACTICE / TEAM MODALS === */
function openModal(key) {
  const el = document.getElementById('modal-' + key);
  if (!el) return;
  document.body.style.overflow = 'hidden';
  el.classList.add('active');
}
function closeModal(key) {
  const el = document.getElementById('modal-' + key);
  if (!el) return;
  el.classList.remove('active');
  setTimeout(() => { document.body.style.overflow = ''; }, 360);
}
function closeModalOnOverlay(e, key) {
  if (e.target === e.currentTarget) closeModal(key);
}
function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 320);
}
function openAttorneyModal() { openModal('attorney'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(m => {
      const id = m.id.replace('modal-', '');
      closeModal(id);
    });
  }
});
/* === BIO TOGGLE === */
function toggleBio() {
  const extra  = document.getElementById('attorney-extra');
  const toggle = document.getElementById('bioToggle');
  const arrow  = document.getElementById('bioToggleArrow');
  if (!extra) return;
  const isOpen = extra.classList.toggle('expanded');
  toggle.childNodes[0].textContent = isOpen ? 'Read Less ' : 'Read More ';
  arrow.textContent = isOpen ? '↑' : '↓';
}

/* === TEAM EXPAND === */
function toggleTeamExpand() {
  const panel = document.getElementById('teamExpandPanel');
  const arrow = document.getElementById('teamExpandArrow');
  const bar = document.getElementById('teamExpandBar');
  if (!panel) return;
  const isOpen = panel.classList.toggle('open');
  arrow.classList.toggle('open', isOpen);
  if (bar) bar.setAttribute('aria-expanded', isOpen);
  // trigger scroll-reveal for newly visible cards
  if (isOpen) {
    panel.querySelectorAll('.scroll-reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }
}

/* === CONTACT FORM === */
function handleFormSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.ct-submit');
  const orig = btn.textContent;
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Sent ✓';
    btn.style.background = '#007a42';
    btn.style.borderColor = '#007a42';
    setTimeout(() => {
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      e.target.reset();
    }, 3000);
  }, 1200);
}

/* === NAVBAR ACTIVE LINK === */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
    const href = l.getAttribute('href') || '';
    if (path.endsWith('contact.html') && href.includes('contact')) l.classList.add('active');
    else if ((path.endsWith('index.html') || path.endsWith('/') || path === '') && href === 'index.html') l.classList.add('active');
  });
})();
