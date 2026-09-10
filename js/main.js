// PathSoft — main.js
// Vanilla JS only. Each behavior here maps to a native Elementor widget's
// built-in interaction (Nav Menu dropdown/toggle, Accordion, Counter, Gallery filter),
// so none of this needs to survive the Elementor conversion as custom code.

document.addEventListener('DOMContentLoaded', () => {

  /* Mobile menu toggle */
  const menuBtn = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', mobileNav.classList.contains('hidden') ? 'false' : 'true');
    });
  }

  /* Highlight active nav link based on current page */
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('[data-nav]').forEach(link => {
      if (link.dataset.nav === page) {
        link.classList.add('text-[#1857C4]');
        link.classList.remove('text-[#0B1B3B]');
      }
    });
  }

  /* Animated stat counters (Elementor: native Counter widget) */
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.counter, 10);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const step = Math.max(1, Math.ceil(target / 60));
          const tick = () => {
            current += step;
            if (current >= target) {
              el.textContent = target + suffix;
            } else {
              el.textContent = current + suffix;
              requestAnimationFrame(tick);
            }
          };
          tick();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => observer.observe(c));
  }

  /* Gallery filter (Elementor: native Gallery widget filter tabs) */
  const filterPills = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('[data-category]');
  if (filterPills.length && galleryItems.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        const filter = pill.dataset.filter;
        galleryItems.forEach(item => {
          const show = filter === 'all' || item.dataset.category === filter;
          item.style.display = show ? '' : 'none';
        });
      });
    });
  }

  /* Simple lightbox for gallery (Elementor: native Lightbox on Image/Gallery widget) */
  const lightboxTriggers = document.querySelectorAll('[data-lightbox]');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  if (lightboxTriggers.length && lightbox) {
    lightboxTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        lightboxImg.src = trigger.dataset.lightbox;
        lightboxCaption.textContent = trigger.dataset.caption || '';
        lightbox.classList.remove('hidden');
      });
    });
    lightbox.addEventListener('click', () => lightbox.classList.add('hidden'));
  }

  /* Contact form — front-end only stub (Elementor: native Form widget handles submission) */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = document.getElementById('formStatus');
      if (msg) msg.textContent = 'Thanks — your message has been sent. We\'ll be in touch shortly.';
      form.reset();
    });
  }
});
