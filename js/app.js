/* ============================================
   APP — AI Gemini Presentation
   Main entry point
   Author: Mage__08
   Easter Egg: 120408
   ============================================ */

const App = {
  easterEggBuffer: '',

  init() {
    // Initialize all modules in order
    Slides.init();
    Animations.init();
    Sidebar.init();
    Presenter.init();
    Accessibility.init();

    // Router last (triggers initial navigation)
    Router.init();

    // Particles for hero
    Particles.init('hero-slide');

    // Trigger initial slide animations
    const firstSlide = Utils.$('.slide.active');
    if (firstSlide) {
      setTimeout(() => Animations.animateSlide(firstSlide), 300);
    }

    // Easter egg listener
    this.initEasterEgg();

    // Initialize demo section content
    this.initDemoSection();

    console.log(
      '%c🎨 Author: Mage__08 Presentation %c by Mage__08',
      'background: linear-gradient(135deg, #6C63FF, #4FD1C5); color: white; padding: 8px 16px; border-radius: 8px 0 0 8px; font-weight: bold; font-size: 14px;',
      'background: #0F172A; color: #FFB84D; padding: 8px 16px; border-radius: 0 8px 8px 0; font-size: 14px;'
    );
  },

  initEasterEgg() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      this.easterEggBuffer += e.key;
      if (this.easterEggBuffer.length > 10) {
        this.easterEggBuffer = this.easterEggBuffer.slice(-10);
      }

      if (this.easterEggBuffer.includes('120408')) {
        this.triggerEasterEgg();
        this.easterEggBuffer = '';
      }
    });
  },

  triggerEasterEgg() {
    document.body.classList.add('easter-egg-active');
    Utils.showToast('🎉 120408 — Easter Egg by Mage__08! ✨');

    // Create sparkle effect
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const sparkle = Utils.createElement('div', {
          style: {
            position: 'fixed',
            left: Math.random() * 100 + 'vw',
            top: Math.random() * 100 + 'vh',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: ['#6C63FF', '#4FD1C5', '#FFB84D'][Math.floor(Math.random() * 3)],
            zIndex: '9999',
            pointerEvents: 'none',
            animation: 'scaleInCenter 0.5s ease forwards, float 2s ease-in-out infinite'
          }
        });
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 3000);
      }, i * 100);
    }

    setTimeout(() => {
      document.body.classList.remove('easter-egg-active');
    }, 4000);
  },

  initDemoSection() {
    // Add Demo slide as a section-like area within the slides
    // We'll add a demo button on the practice section
  }
};

// ==================== BOOT ====================
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
