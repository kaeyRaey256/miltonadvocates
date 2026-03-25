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
(function initMobileNav() {
  function setup() {
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');
    var backdrop  = document.getElementById('mobileNavBackdrop');
    var closeBtn  = document.getElementById('mobileNavClose');

    if (!hamburger || !mobileNav) {
      // retry once if DOM not yet ready
      setTimeout(setup, 100);
      return;
    }

    function openNav() {
      mobileNav.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      hamburger.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeNav() {
      mobileNav.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Use both click and touchend for maximum mobile compatibility
    function addTap(el, fn) {
      if (!el) return;
      el.addEventListener('click', fn);
      el.addEventListener('touchend', function(e) {
        e.preventDefault();
        fn();
      }, { passive: false });
    }

    addTap(hamburger, openNav);
    addTap(closeBtn,  closeNav);
    addTap(backdrop,  closeNav);

    document.querySelectorAll('.mobile-nav-link').forEach(function(l) {
      l.addEventListener('click', closeNav);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup);
  } else {
    setup();
  }
})();

/* === STICKY NAVBAR SCROLL STYLE === */
(function() {
  var nb = document.getElementById('navbar');
  if (!nb) return;
  window.addEventListener('scroll', function() {
    if (!nb.classList.contains('hide')) {
      nb.style.boxShadow = window.scrollY > 60
        ? '0 4px 32px rgba(0,0,77,0.55)'
        : '0 2px 20px rgba(0,0,77,0.4)';
    }
  }, { passive: true });
})();

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
    if (!el.dataset.delay) el.dataset.delay = i * 50;
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
  // close any open modal first
  document.querySelectorAll('.modal-overlay.is-open').forEach(m => {
    m.classList.remove('is-open');
    m.style.display = 'none';
  });
  document.body.style.overflow = 'hidden';
  el.style.display = 'flex';
  // force reflow so opacity transition fires
  void el.offsetWidth;
  el.classList.add('is-open');
}
function closeModal(key) {
  const el = document.getElementById('modal-' + key);
  if (!el) return;
  el.classList.remove('is-open');
  setTimeout(() => {
    el.style.display = 'none';
    document.body.style.overflow = '';
  }, 320);
}
function closeModalOnOverlay(e, key) {
  if (e.target === e.currentTarget) closeModal(key);
}
function switchModal(from, to) {
  const fromEl = document.getElementById('modal-' + from);
  const toEl   = document.getElementById('modal-' + to);
  if (!fromEl || !toEl) return;
  // Fade out current
  fromEl.style.opacity = '0';
  setTimeout(function() {
    fromEl.classList.remove('is-open');
    fromEl.style.display = 'none';
    fromEl.style.opacity = '';
    // Fade in next
    toEl.style.display = 'flex';
    toEl.style.opacity = '0';
    void toEl.offsetWidth;
    toEl.classList.add('is-open');
    toEl.style.opacity = '';
  }, 220);
}
function openAttorneyModal() { openModal('attorney'); }

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.is-open').forEach(m => {
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
  const bar   = document.getElementById('teamExpandBar');
  if (!panel) return;
  const isOpen = panel.classList.toggle('open');
  if (arrow) arrow.classList.toggle('open', isOpen);
  if (bar)   bar.setAttribute('aria-expanded', String(isOpen));
  if (isOpen) {
    // stagger-reveal the position cards
    panel.querySelectorAll('.position-card, .scroll-reveal').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = `opacity 0.4s ease ${i*0.08}s, transform 0.4s ease ${i*0.08}s`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    });
  }
}


/* === ATTORNEY CARD AUTO-REVEAL on tablet/phone === */
(function() {
  function tryAutoReveal() {
    // Only on touch/small screens
    if (window.innerWidth > 900) return;
    var card = document.querySelector('.team-card');
    if (!card) return;
    var img = card.querySelector('img');
    function reveal() {
      setTimeout(function() {
        card.classList.add('auto-reveal');
      }, 700); // 0.7s after image ready
    }
    if (img && img.complete) {
      reveal();
    } else if (img) {
      img.addEventListener('load', reveal);
      // fallback if load already fired
      setTimeout(reveal, 1000);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryAutoReveal);
  } else {
    tryAutoReveal();
  }
  // Re-check on resize
  window.addEventListener('resize', function() {
    var card = document.querySelector('.team-card');
    if (!card) return;
    if (window.innerWidth > 900) {
      card.classList.remove('auto-reveal');
    } else {
      card.classList.add('auto-reveal');
    }
  }, { passive: true });
})();


/* === PUBLICATIONS DROPDOWN === */
function togglePublications() {
  var wrap  = document.getElementById('pubDropdown');
  var panel = document.getElementById('pubDropdownPanel');
  var btn   = wrap ? wrap.querySelector('.pub-dropdown-trigger') : null;
  if (!wrap || !panel) return;
  var isOpen = wrap.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
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

/* === NEWSLETTER FORM === */
function handleNewsletterSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.newsletter-btn');
  const orig = btn.textContent;
  btn.textContent = 'Subscribed ✓';
  btn.style.background = '#007a42';
  btn.style.borderColor = '#007a42';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.borderColor = '';
    e.target.reset();
  }, 3000);
}

/* === NAVBAR ACTIVE LINK === */
(function () {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(l => {
    const href = l.getAttribute('href') || '';
    if (path.endsWith('contact.html') && href.includes('contact')) {
      l.classList.add('active');
    } else if (path.endsWith('about.html') && href.includes('about')) {
      l.classList.add('active');
    } else if (path.endsWith('careers.html') && href.includes('careers')) {
      l.classList.add('active');
    } else if (path.endsWith('legal.html') && href.includes('legal')) {
      l.classList.add('active');
    } else if ((path.endsWith('index.html') || path.endsWith('/') || path === '') && href === 'index.html') {
      l.classList.add('active');
    }
  });
})();
