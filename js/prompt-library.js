/* ============================================
   PROMPT LIBRARY — AI Gemini Presentation
   Filterable prompt grid
   ============================================ */

const PromptLibrary = {
  initialized: false,
  activeFilters: new Set(['all']),
  expandedCard: null,

  CATEGORIES: [
    { id: 'all', label: 'Tất cả', icon: '🌟' },
    { id: 'Realistic', label: 'Realistic', icon: '📷' },
    { id: 'Fashion', label: 'Fashion', icon: '👗' },
    { id: 'Food', label: 'Food', icon: '🍕' },
    { id: 'Architecture', label: 'Architecture', icon: '🏛️' },
    { id: 'Product', label: 'Product', icon: '📦' },
    { id: 'Marketing', label: 'Marketing', icon: '📢' },
    { id: 'Anime', label: 'Anime', icon: '🎌' },
    { id: '3D', label: '3D', icon: '🎮' },
    { id: 'Video', label: 'Video', icon: '🎬' },
    { id: 'Poster', label: 'Poster', icon: '🖼️' },
    { id: 'Education', label: 'Education', icon: '📚' },
    { id: 'Social Media', label: 'Social Media', icon: '📱' }
  ],

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
  },

  render() {
    const container = Utils.$('#section-prompts .section-content');
    if (!container) return;

    container.innerHTML = `
      <div class="search-box" style="max-width:500px;margin:0 auto var(--space-xl);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input type="text" class="search-input" id="prompt-search" placeholder="Tìm kiếm prompt..." aria-label="Tìm kiếm prompt">
      </div>
      
      <div class="filter-chips" id="prompt-filters" role="group" aria-label="Bộ lọc danh mục">
        ${this.CATEGORIES.map(cat => `
          <button class="chip ${cat.id === 'all' ? 'active' : ''}" data-filter="${cat.id}" aria-pressed="${cat.id === 'all'}" aria-label="${cat.label}">
            <span>${cat.icon}</span> ${cat.label}
          </button>
        `).join('')}
      </div>

      <div class="prompt-grid" id="prompt-grid" role="list" aria-label="Danh sách prompt">
      </div>

      <!-- Expanded Prompt Modal -->
      <div class="prompt-modal-overlay" id="prompt-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);z-index:var(--z-modal);align-items:center;justify-content:center;padding:var(--space-2xl);">
        <div class="card" style="max-width:700px;width:100%;max-height:80vh;overflow-y:auto;" id="prompt-modal-content">
        </div>
      </div>
    `;

    this.renderCards();
    this.bindEvents();
  },

  renderCards(filter = 'all', search = '') {
    const grid = Utils.$('#prompt-grid');
    if (!grid) return;

    let filtered = PROMPTS_DATA;

    if (filter !== 'all') {
      filtered = filtered.filter(p =>
        p.category === filter || p.tags.includes(filter)
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    grid.innerHTML = filtered.map(p => `
      <div class="prompt-card fade-up" data-id="${p.id}" role="listitem" tabindex="0" aria-label="${p.title}">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span class="prompt-card-title">${p.title}</span>
          <span class="badge ${p.level === 'Nâng cao' ? 'badge-accent' : p.level === 'Trung bình' ? 'badge-primary' : 'badge-secondary'}">${p.level}</span>
        </div>
        <p class="prompt-card-preview">${p.prompt}</p>
        <div class="prompt-card-footer">
          <div class="prompt-card-tags">
            ${p.tags.slice(0, 3).map(t => `<span class="badge badge-primary" style="font-size:0.6rem;padding:0.15rem 0.4rem;">${t}</span>`).join('')}
          </div>
          <div style="display:flex;gap:var(--space-xs);">
            <button class="copy-btn" onclick="event.stopPropagation();PromptLibrary.copyPrompt('${p.id}');" aria-label="Copy prompt ${p.title}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:var(--space-3xl);color:var(--text-muted);">
          <span style="font-size:3rem;display:block;margin-bottom:var(--space-md);">🔍</span>
          <p>Không tìm thấy prompt phù hợp.</p>
        </div>
      `;
    }

    // Card click to expand
    Utils.$$('.prompt-card', grid).forEach(card => {
      card.addEventListener('click', () => {
        this.expandPrompt(card.dataset.id);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.expandPrompt(card.dataset.id);
      });
    });

    // Trigger animations
    requestAnimationFrame(() => {
      Utils.$$('.fade-up', grid).forEach((el, i) => {
        setTimeout(() => el.classList.add('anim-visible'), i * 50);
      });
    });
  },

  bindEvents() {
    // Filters
    Utils.$$('.chip', Utils.$('#prompt-filters')).forEach(chip => {
      chip.addEventListener('click', () => {
        Utils.$$('.chip', Utils.$('#prompt-filters')).forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-pressed', 'false');
        });
        chip.classList.add('active');
        chip.setAttribute('aria-pressed', 'true');
        const search = Utils.$('#prompt-search').value;
        this.renderCards(chip.dataset.filter, search);
      });
    });

    // Search
    const searchInput = Utils.$('#prompt-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        const activeFilter = Utils.$('.chip.active', Utils.$('#prompt-filters'));
        const filter = activeFilter ? activeFilter.dataset.filter : 'all';
        this.renderCards(filter, e.target.value);
      }, 200));
    }

    // Modal close
    const modal = Utils.$('#prompt-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }
  },

  expandPrompt(id) {
    const p = PROMPTS_DATA.find(p => p.id === id);
    if (!p) return;

    const modal = Utils.$('#prompt-modal');
    const content = Utils.$('#prompt-modal-content');
    if (!modal || !content) return;

    content.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--space-xl);">
        <div>
          <h3 class="heading-3">${p.title}</h3>
          <div style="display:flex;gap:var(--space-xs);margin-top:var(--space-sm);">
            ${p.tags.map(t => `<span class="badge badge-primary">${t}</span>`).join('')}
          </div>
        </div>
        <button class="btn btn-icon btn-ghost" onclick="PromptLibrary.closeModal()" aria-label="Đóng">✕</button>
      </div>
      
      <div class="code-block" style="margin-bottom:var(--space-xl);">
        <div class="code-block-header">
          <span>📝 Prompt đầy đủ</span>
          <button class="copy-btn" onclick="PromptLibrary.copyPrompt('${p.id}')" aria-label="Copy prompt">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy
          </button>
        </div>
        <pre class="code-block-body" style="white-space:pre-wrap;font-size:var(--fs-sm);line-height:2;">${p.prompt}</pre>
      </div>

      <div style="display:flex;gap:var(--space-sm);flex-wrap:wrap;">
        <span class="badge ${p.level === 'Nâng cao' ? 'badge-accent' : p.level === 'Trung bình' ? 'badge-primary' : 'badge-secondary'}">
          📊 ${p.level}
        </span>
        <span class="badge badge-secondary">📂 ${p.category}</span>
      </div>
    `;

    modal.style.display = 'flex';
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });
  },

  closeModal() {
    const modal = Utils.$('#prompt-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  },

  copyPrompt(id) {
    const p = PROMPTS_DATA.find(p => p.id === id);
    if (p) {
      Utils.copyToClipboard(p.prompt);
      Utils.showToast('Đã copy prompt! 📋');
    }
  }
};

window.PromptLibrary = PromptLibrary;
