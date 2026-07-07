/* ============================================
   PRESENTER — AI Gemini Presentation
   Fullscreen & presenter mode
   ============================================ */

const Presenter = {
  isFullscreen: false,
  isPresenterMode: false,
  timerInterval: null,
  startTime: null,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    const fsBtn = Utils.$('.fullscreen-btn');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => this.toggleFullscreen());
    }

    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      document.body.classList.toggle('fullscreen-mode', this.isFullscreen);
    });
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  },

  togglePresenterMode() {
    if (this.isPresenterMode) {
      this.exitPresenterMode();
    } else {
      this.enterPresenterMode();
    }
  },

  enterPresenterMode() {
    this.isPresenterMode = true;
    const overlay = Utils.$('.presenter-overlay');
    if (overlay) {
      overlay.classList.add('active');
      this.startTimer();
    }
  },

  exitPresenterMode() {
    this.isPresenterMode = false;
    const overlay = Utils.$('.presenter-overlay');
    if (overlay) overlay.classList.remove('active');
    this.stopTimer();
  },

  exit() {
    if (this.isPresenterMode) this.exitPresenterMode();
  },

  startTimer() {
    this.startTime = Date.now();
    const timerEl = Utils.$('.presenter-timer');
    if (!timerEl) return;

    this.timerInterval = setInterval(() => {
      const elapsed = Date.now() - this.startTime;
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
  },

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = null;
  }
};

window.Presenter = Presenter;
