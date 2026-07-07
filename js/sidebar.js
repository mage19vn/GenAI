/* ============================================
   SIDEBAR — AI Gemini Presentation
   ============================================ */

const Sidebar = {
  el: null,
  isCollapsed: false,
  isMobileOpen: false,
  activeItem: null,

  NAV_ITEMS: [
    { id: 'home', icon: '🏠', label: 'Giới thiệu', target: 'hero' },
    { id: 'ai-intro', icon: '💡', label: 'AI là gì', target: 'slide-magic' },
    { id: 'mindset', icon: '🧠', label: 'Tư duy Prompt', target: 'slide-mindset' },
    { id: 'ai-write', icon: '✍️', label: 'AI viết Prompt', target: 'slide-ai-writes' },
    { id: 'ai-optimize', icon: '🚀', label: 'AI tối ưu Prompt', target: 'slide-optimize' },
    { id: 'create-image', icon: '🎨', label: 'Tạo hình ảnh', target: 'slide-create-image' },
    { id: 'create-video', icon: '🎬', label: 'Tạo Video', target: 'slide-create-video' },
    { id: 'edit', icon: '🖌️', label: 'Chỉnh sửa', target: 'slide-edit' },
    { id: 'canva', icon: '🎯', label: 'Canva', target: 'slide-canva' },
    { id: 'practice', icon: '🧪', label: 'Thực hành', target: 'practice', isSection: true },
    { id: 'prompts', icon: '📚', label: 'Prompt mẫu', target: 'prompts', isSection: true },
    { id: 'docs', icon: '📄', label: 'Tài liệu', target: 'docs', isSection: true }
  ],

  init() {
    this.el = Utils.$('.sidebar');
    if (!this.el) return;

    this.render();
    this.bindEvents();
    this.loadState();
  },

  render() {
    const navList = Utils.$('.sidebar-nav-list', this.el);
    if (!navList) return;

    navList.innerHTML = '';
    this.NAV_ITEMS.forEach(item => {
      const navItem = Utils.createElement('button', {
        className: 'sidebar-nav-item',
        dataset: { section: item.id, target: item.target, isSection: item.isSection || false },
        'aria-label': item.label,
        'role': 'tab'
      }, [
        Utils.createElement('span', { className: 'sidebar-nav-icon', textContent: item.icon }),
        Utils.createElement('span', { className: 'sidebar-nav-label', textContent: item.label })
      ]);
      navList.appendChild(navItem);
    });
  },

  bindEvents() {
    // Toggle button
    const toggleBtn = Utils.$('.sidebar-toggle', this.el);
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }

    // Nav items
    const navItems = Utils.$$('.sidebar-nav-item', this.el);
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const target = item.dataset.target;
        const isSection = item.dataset.isSection === 'true';

        if (isSection) {
          Router.showSection(target);
        } else {
          Router.goToSlide(target);
        }

        // Close mobile sidebar
        if (window.innerWidth <= 480) {
          this.closeMobile();
        }
      });
    });

    // Mobile menu button
    const mobileBtn = Utils.$('.mobile-menu-btn');
    if (mobileBtn) {
      mobileBtn.addEventListener('click', () => this.toggleMobile());
    }

    // Mobile overlay
    const overlay = Utils.$('.mobile-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => this.closeMobile());
    }
  },

  toggle() {
    this.isCollapsed = !this.isCollapsed;
    document.body.classList.toggle('sidebar-collapsed', this.isCollapsed);
    Utils.storage.set('sidebarCollapsed', this.isCollapsed);
  },

  toggleMobile() {
    this.isMobileOpen = !this.isMobileOpen;
    this.el.classList.toggle('mobile-open', this.isMobileOpen);
  },

  closeMobile() {
    this.isMobileOpen = false;
    this.el.classList.remove('mobile-open');
  },

  setActive(sectionId) {
    const items = Utils.$$('.sidebar-nav-item', this.el);
    items.forEach(item => {
      const isActive = item.dataset.section === sectionId || item.dataset.target === sectionId;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', isActive);
    });
    this.activeItem = sectionId;
  },

  loadState() {
    const collapsed = Utils.storage.get('sidebarCollapsed', false);
    if (collapsed) {
      this.isCollapsed = true;
      document.body.classList.add('sidebar-collapsed');
    }
  }
};

window.Sidebar = Sidebar;
