(function () {
  'use strict';

  // --- Mobile Nav Toggle ----------------------------------
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('is-open');
      nav.classList.toggle('is-open');
      const expanded = toggle.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', expanded);
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('is-open');
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Header shadow on scroll ----------------------------
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Scroll-triggered Animations ------------------------
  const animatedNodes = document.querySelectorAll('[data-animate], [data-stagger]');
  if (animatedNodes.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    animatedNodes.forEach(function (node) { observer.observe(node); });
  } else {
    animatedNodes.forEach(function (node) { node.classList.add('is-visible'); });
  }

  // --- Contact Form (mock submit → complete) --------------
  const form = document.querySelector('form[data-mock-submit]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = form.dataset.completeUrl || './complete/';
    });
  }
})();
