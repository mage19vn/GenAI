/* ============================================
   ACCESSIBILITY — AI Gemini Presentation
   ============================================ */

const Accessibility = {
  fontSizes: ['small', 'normal', 'large', 'xlarge'],
  currentFontIndex: 1,

  init() {
    this.loadSettings();
    this.bindEvents();
  },

  bindEvents() {
    // Theme toggle
    const themeBtn = Utils.$('#a11y-theme');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    // Font size buttons
    const fontUp = Utils.$('#a11y-font-up');
    const fontDown = Utils.$('#a11y-font-down');
    if (fontUp) fontUp.addEventListener('click', () => this.changeFontSize(1));
    if (fontDown) fontDown.addEventListener('click', () => this.changeFontSize(-1));

    // Reduced motion
    const motionBtn = Utils.$('#a11y-motion');
    if (motionBtn) {
      motionBtn.addEventListener('click', () => this.toggleReducedMotion());
    }
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    Utils.storage.set('theme', next);

    const btn = Utils.$('#a11y-theme');
    if (btn) {
      btn.textContent = next === 'dark' ? '🌙' : '☀️';
      btn.classList.toggle('active', next === 'light');
    }
  },

  changeFontSize(direction) {
    this.currentFontIndex = Math.max(0, Math.min(this.fontSizes.length - 1, this.currentFontIndex + direction));
    const size = this.fontSizes[this.currentFontIndex];
    document.documentElement.setAttribute('data-font-size', size);
    Utils.storage.set('fontSize', this.currentFontIndex);

    Utils.showToast(`Cỡ chữ: ${size === 'small' ? 'Nhỏ' : size === 'normal' ? 'Bình thường' : size === 'large' ? 'Lớn' : 'Rất lớn'}`);
  },

  toggleReducedMotion() {
    const current = document.documentElement.getAttribute('data-reduced-motion') === 'true';
    document.documentElement.setAttribute('data-reduced-motion', !current);
    Utils.storage.set('reducedMotion', !current);

    const btn = Utils.$('#a11y-motion');
    if (btn) btn.classList.toggle('active', !current);

    Utils.showToast(!current ? 'Đã tắt hiệu ứng' : 'Đã bật hiệu ứng');
  },

  loadSettings() {
    // Theme
    const theme = Utils.storage.get('theme', 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    const themeBtn = Utils.$('#a11y-theme');
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
      themeBtn.classList.toggle('active', theme === 'light');
    }

    // Font size
    this.currentFontIndex = Utils.storage.get('fontSize', 1);
    document.documentElement.setAttribute('data-font-size', this.fontSizes[this.currentFontIndex]);

    // Reduced motion
    const reduced = Utils.storage.get('reducedMotion', false);
    document.documentElement.setAttribute('data-reduced-motion', reduced);
    const motionBtn = Utils.$('#a11y-motion');
    if (motionBtn) motionBtn.classList.toggle('active', reduced);

    // Check system preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && !Utils.storage.get('reducedMotion')) {
      document.documentElement.setAttribute('data-reduced-motion', 'true');
    }
  }
};

window.Accessibility = Accessibility;
