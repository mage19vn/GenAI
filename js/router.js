/* ============================================
   ROUTER — AI Gemini Presentation
   Slide navigation & URL sync
   ============================================ */

const Router = {
  currentSlide: 0,
  totalSlides: 0,
  currentSection: null, // 'slides' | 'practice' | 'prompts' | 'docs'
  isTransitioning: false,

  init() {
    this.totalSlides = SLIDES_DATA.length;
    this.bindEvents();
    this.handleInitialRoute();
    this.updateUI();
  },

  bindEvents() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Don't navigate if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          this.prev();
          break;
        case 'Home':
          e.preventDefault();
          this.goToIndex(0);
          break;
        case 'End':
          e.preventDefault();
          this.goToIndex(this.totalSlides - 1);
          break;
        case 'Escape':
          if (this.currentSection) {
            this.showSlides();
          }
          Presenter.exit();
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            Presenter.toggleFullscreen();
          }
          break;
        case 'p':
        case 'P':
          if (!e.ctrlKey && !e.metaKey) {
            Presenter.togglePresenterMode();
          }
          break;
      }
    });

    // Mouse wheel navigation (debounced)
    const wheelHandler = Utils.debounce((e) => {
      if (this.currentSection) return; // Don't wheel-navigate in sections
      if (e.deltaY > 30) this.next();
      else if (e.deltaY < -30) this.prev();
    }, 150);

    Utils.addPassiveEvent(document, 'wheel', wheelHandler);

    // Touch swipe
    let touchStartX = 0;
    let touchStartY = 0;

    Utils.addPassiveEvent(document, 'touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    });

    Utils.addPassiveEvent(document, 'touchend', (e) => {
      if (this.currentSection) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
        if (dx < 0) this.next();
        else this.prev();
      }
    });

    // Nav buttons
    const prevBtn = Utils.$('#nav-prev');
    const nextBtn = Utils.$('#nav-next');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    // Hash change
    window.addEventListener('hashchange', () => this.handleHash());
  },

  handleInitialRoute() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      this.handleHash();
    } else {
      this.currentSection = null;
      this.goToIndex(0, false);
    }
  },

  handleHash() {
    const hash = window.location.hash.slice(1);

    if (['practice', 'prompts', 'docs'].includes(hash)) {
      this.showSection(hash, false);
      return;
    }

    // Find slide by id
    const idx = SLIDES_DATA.findIndex(s => s.id === hash);
    if (idx !== -1) {
      this.currentSection = null;
      this.hideSections();
      this.goToIndex(idx, false);
    }
  },

  next() {
    if (this.currentSection) return;
    if (this.currentSlide < this.totalSlides - 1) {
      this.goToIndex(this.currentSlide + 1);
    }
  },

  prev() {
    if (this.currentSection) return;
    if (this.currentSlide > 0) {
      this.goToIndex(this.currentSlide - 1);
    }
  },

  goToIndex(index, animate = true) {
    if (index < 0 || index >= this.totalSlides) return;
    if (this.isTransitioning && animate) return;

    this.isTransitioning = true;

    const prevSlideEl = Utils.$(`.slide[data-index="${this.currentSlide}"]`);
    const nextSlideEl = Utils.$(`.slide[data-index="${index}"]`);

    // Deactivate previous
    if (prevSlideEl && prevSlideEl !== nextSlideEl) {
      prevSlideEl.classList.remove('active');
      Animations.resetSlide(prevSlideEl);
    }

    // Activate next
    this.currentSlide = index;

    if (nextSlideEl) {
      nextSlideEl.classList.add('active');
      // Trigger animations after transition
      setTimeout(() => {
        Animations.animateSlide(nextSlideEl);
        this.isTransitioning = false;
      }, animate ? 400 : 50);
    } else {
      this.isTransitioning = false;
    }

    // Update URL
    const slideData = SLIDES_DATA[index];
    if (slideData) {
      history.replaceState(null, '', `#${slideData.id}`);
    }

    // Update sidebar
    if (slideData) {
      Sidebar.setActive(slideData.section || slideData.id);
    }

    // Manage particles
    if (slideData && slideData.type === 'hero') {
      Particles.resume();
    } else {
      Particles.pause();
    }

    this.updateUI();

    // ARIA announcement
    const liveRegion = Utils.$('#slide-announcement');
    if (liveRegion && slideData) {
      liveRegion.textContent = `Slide ${index + 1} trên ${this.totalSlides}: ${slideData.title.replace(/<[^>]*>/g, '')}`;
    }
  },

  goToSlide(slideId) {
    // First, make sure sections are hidden
    this.hideSections();
    this.currentSection = null;

    const idx = SLIDES_DATA.findIndex(s => s.id === slideId);
    if (idx !== -1) {
      this.goToIndex(idx);
    }
  },

  showSection(name, updateHash = true) {
    this.currentSection = name;

    // Hide all slides
    Utils.$$('.slide').forEach(s => s.classList.remove('active'));

    // Hide all sections, show target
    Utils.$$('.section-screen').forEach(s => s.classList.remove('active'));
    const section = Utils.$(`#section-${name}`);
    if (section) section.classList.add('active');

    // Update sidebar
    Sidebar.setActive(name);

    // Update URL
    if (updateHash) {
      history.replaceState(null, '', `#${name}`);
    }

    // Hide nav controls
    const navControls = Utils.$('.nav-controls');
    if (navControls) navControls.style.display = 'none';

    const slideCounter = Utils.$('.slide-counter');
    if (slideCounter) slideCounter.style.display = 'none';

    // Initialize section-specific modules
    if (name === 'practice') Practice.init();
    if (name === 'prompts') PromptLibrary.init();
    if (name === 'docs') Docs.init();

    // Pause particles
    Particles.pause();
  },

  hideSections() {
    Utils.$$('.section-screen').forEach(s => s.classList.remove('active'));
    this.currentSection = null;

    // Show nav controls
    const navControls = Utils.$('.nav-controls');
    if (navControls) navControls.style.display = '';

    const slideCounter = Utils.$('.slide-counter');
    if (slideCounter) slideCounter.style.display = '';
  },

  showSlides() {
    this.hideSections();
    const slideEl = Utils.$(`.slide[data-index="${this.currentSlide}"]`);
    if (slideEl) {
      slideEl.classList.add('active');
      Animations.animateSlide(slideEl);
    }

    const slideData = SLIDES_DATA[this.currentSlide];
    if (slideData) {
      Sidebar.setActive(slideData.section || slideData.id);
      history.replaceState(null, '', `#${slideData.id}`);
    }

    this.updateUI();
  },

  updateUI() {
    // Progress bar
    const progress = Utils.$('.progress-bar-fill');
    if (progress) {
      const pct = ((this.currentSlide + 1) / this.totalSlides) * 100;
      progress.style.width = `${pct}%`;
    }

    // Counter
    const currentEl = Utils.$('.slide-counter-current');
    const totalEl = Utils.$('.slide-counter-total');
    if (currentEl) currentEl.textContent = String(this.currentSlide + 1).padStart(2, '0');
    if (totalEl) totalEl.textContent = String(this.totalSlides).padStart(2, '0');

    // Nav buttons
    const prevBtn = Utils.$('#nav-prev');
    const nextBtn = Utils.$('#nav-next');
    if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
    if (nextBtn) nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
  }
};

window.Router = Router;
