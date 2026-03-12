/* ============================================================
   MILTON ADVOCATES — script.js
   ============================================================ */

// === MODAL SYSTEM ===
function openModal(type) {
  const el = document.getElementById('modal-' + type);
  if (!el) return;
  document.body.style.overflow = 'hidden';
  el.style.display = 'flex';
  requestAnimationFrame(() => el.classList.add('active'));
}

function closeModal(type) {
  const el = document.getElementById('modal-' + type);
  if (!el) return;
  el.classList.remove('active');
  setTimeout(() => {
    el.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

function closeModalOnOverlay(e, type) {
  if (e.target === e.currentTarget) closeModal(type);
}

function switchModal(from, to) {
  closeModal(from);
  setTimeout(() => openModal(to), 320);
}

function openAttorneyModal() { openModal('attorney'); }

// === BIO TOGGLE ===
function toggleBio() {
  const extra  = document.getElementById('attorney-extra');
  const toggle = document.getElementById('bioToggle');
  const arrow  = document.getElementById('bioToggleArrow');
  if (!extra) return;
  const expanded = extra.classList.toggle('expanded');
  if (toggle) toggle.childNodes[0].textContent = expanded ? 'Read Less ' : 'Read More ';
  if (arrow)  arrow.textContent = expanded ? '↑' : '↓';
}

// === ESC KEY ===
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  ['construction','arbitration','commercial','litigation','attorney'].forEach(t => {
    const el = document.getElementById('modal-' + t);
    if (el && el.classList.contains('active')) closeModal(t);
  });
  closeMobileNav();
});

// === MOBILE NAV ===
const hamburger    = document.getElementById('hamburger');
const mobileNav    = document.getElementById('mobileNav');
const mobileClose  = document.getElementById('mobileNavClose');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function closeMobileNav() {
  if (!mobileNav) return;
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
document.querySelectorAll('.mobile-nav-link').forEach(l => l.addEventListener('click', closeMobileNav));

// === ACTIVE NAV ON SCROLL ===
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}, { passive: true });

// === FORM SUBMIT ===
function handleFormSubmit(e) {
  e.preventDefault();
  const btn  = e.target.querySelector('[type="submit"]');
  const orig = btn.textContent;
  btn.textContent = 'Message Sent ✓';
  btn.style.background   = '#00a878';
  btn.style.borderColor  = '#00a878';
  btn.style.color        = '#fff';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background  = '';
    btn.style.borderColor = '';
    btn.style.color       = '';
    e.target.reset();
  }, 3500);
}

// === SCROLL REVEAL ===
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay || 0;
    setTimeout(() => el.classList.add('visible'), Number(delay));
    revealObserver.unobserve(el);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.process-card, .practice-card, .team-card, .practice-list-item, .team-quote-card').forEach((el, i) => {
  el.classList.add('scroll-reveal');
  el.dataset.delay = i * 80;
  revealObserver.observe(el);
});
