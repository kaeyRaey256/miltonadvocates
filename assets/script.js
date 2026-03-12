// === MODAL SYSTEM ===
    function openModal(type) {
      const overlay = document.getElementById('modal-' + type);
      if (!overlay) return;
      document.body.style.overflow = 'hidden';
      overlay.style.display = 'flex';
      requestAnimationFrame(() => {
        overlay.classList.add('active');
      });
    }

    function closeModal(type) {
      const overlay = document.getElementById('modal-' + type);
      if (!overlay) return;
      overlay.classList.remove('active');
      setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 300);
    }

    function closeModalOnOverlay(event, type) {
      if (event.target === event.currentTarget) {
        closeModal(type);
      }
    }

    function switchModal(fromType, toType) {
      closeModal(fromType);
      setTimeout(() => openModal(toType), 320);
    }

    function openAttorneyModal() {
      openModal('attorney');
    }

    // === BIO TOGGLE (Fenwick Elliott style) ===
    function toggleBio() {
      const extra = document.getElementById('attorney-extra');
      const toggle = document.getElementById('bioToggle');
      const arrow = document.getElementById('bioToggleArrow');
      if (extra.classList.contains('expanded')) {
        extra.classList.remove('expanded');
        toggle.childNodes[0].textContent = 'Read More ';
        arrow.textContent = '↓';
      } else {
        extra.classList.add('expanded');
        toggle.childNodes[0].textContent = 'Read Less ';
        arrow.textContent = '↑';
      }
    }

    // === KEYBOARD CLOSE ===
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        ['construction','arbitration','commercial','litigation','attorney'].forEach(t => {
          const el = document.getElementById('modal-' + t);
          if (el && el.classList.contains('active')) closeModal(t);
        });
        closeMobileNav();
      }
    });

    // === MOBILE NAV ===
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');

    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }

    mobileNavClose.addEventListener('click', closeMobileNav);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // === ACTIVE NAV ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    });

    // === FORM SUBMIT ===
    function handleFormSubmit(e) {
      e.preventDefault();
      const btn = e.target.querySelector('button[type="submit"]');
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#00a878';
      btn.style.borderColor = '#00a878';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.borderColor = '';
        e.target.reset();
      }, 3000);
    }

    // === SCROLL ANIMATIONS ===
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.process-card, .practice-card, .team-card, .practice-list-item, .team-quote-card').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = `opacity 0.55s ease ${i * 0.08}s, transform 0.55s cubic-bezier(0.4,0,0.2,1) ${i * 0.08}s`;
      observer.observe(el);
    });
