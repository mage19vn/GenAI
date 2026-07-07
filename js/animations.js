/* ============================================
   ANIMATIONS — AI Gemini Presentation
   IntersectionObserver + animation controller
   ============================================ */

const Animations = {
  observer: null,

  init() {
    this.setupObserver();
    this.observeElements();
  },

  setupObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('anim-visible');
            // Optionally unobserve after animation
            if (entry.target.dataset.animOnce !== 'false') {
              this.observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );
  },

  observeElements() {
    const animElements = Utils.$$('[class*="fade-"], [class*="scale-"]');
    animElements.forEach(el => {
      if (!el.classList.contains('anim-visible')) {
        this.observer.observe(el);
      }
    });
  },

  // Trigger animations for a specific slide
  // Double rAF ensures Edge/Chromium browsers complete layout before triggering transitions
  animateSlide(slideEl) {
    if (!slideEl) return;

    const elements = Utils.$$('.fade-up, .fade-down, .fade-left, .fade-right, .scale-in, .scale-up', slideEl);

    // Reset first — force reflow for Edge
    elements.forEach(el => {
      el.classList.remove('anim-visible');
      el.style.willChange = 'transform, opacity';
    });

    // Double rAF: first frame resets, second frame triggers — ensures Edge picks up transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elements.forEach((el, i) => {
          const delay = el.dataset.delay || (i * 100);
          setTimeout(() => {
            el.classList.add('anim-visible');
          }, delay);
        });
      });
    });
  },

  // Reset animations for a slide (when leaving)
  resetSlide(slideEl) {
    if (!slideEl) return;
    const elements = Utils.$$('.fade-up, .fade-down, .fade-left, .fade-right, .scale-in, .scale-up', slideEl);
    elements.forEach(el => el.classList.remove('anim-visible'));
  },

  // Stagger children animation
  staggerChildren(parentEl, childSelector, delayMs = 80) {
    if (!parentEl) return;
    const children = Utils.$$(childSelector, parentEl);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * delayMs}ms`;
      requestAnimationFrame(() => {
        child.classList.add('anim-visible');
      });
    });
  },

  // Counter animation for numbers
  animateCounters(container) {
    const counters = Utils.$$('[data-count]', container);
    counters.forEach(el => {
      const target = parseInt(el.dataset.count, 10);
      Utils.animateCounter(el, target);
    });
  }
};

window.Animations = Animations;
