/* ============================================
   DOCS — AI Gemini Presentation
   Documentation section
   ============================================ */

const Docs = {
  initialized: false,

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
  },

  render() {
    const container = Utils.$('#section-docs .section-content');
    if (!container) return;

    container.innerHTML = `
      <div class="docs-layout">
        <!-- Table of Contents -->
        <aside class="docs-toc glass" style="padding:var(--space-lg);" aria-label="Mục lục">
          <h4 class="heading-4" style="margin-bottom:var(--space-md);font-size:var(--fs-sm);">📑 Mục lục</h4>
          <nav class="docs-toc-list">
            ${DOCS_DATA.map(doc => `
              <a href="#${doc.id}" class="docs-toc-link" data-target="${doc.id}" role="link">
                <span>${doc.icon}</span> ${doc.title}
              </a>
            `).join('')}
          </nav>
        </aside>

        <!-- Content -->
        <div class="docs-body">
          <!-- Search -->
          <div class="search-box" style="margin-bottom:var(--space-2xl);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input type="text" class="search-input" id="docs-search" placeholder="Tìm kiếm trong tài liệu..." aria-label="Tìm kiếm tài liệu">
          </div>

          <!-- Print button -->
          <div style="display:flex;justify-content:flex-end;margin-bottom:var(--space-lg);">
            <button class="btn btn-sm btn-secondary" onclick="window.print()" aria-label="In tài liệu">
              🖨️ In tài liệu
            </button>
          </div>

          <!-- Accordion -->
          <div class="accordion" id="docs-accordion" role="list">
            ${DOCS_DATA.map((doc, i) => `
              <div class="accordion-item ${i === 0 ? 'active' : ''}" id="${doc.id}" data-doc-id="${doc.id}" role="listitem">
                <button class="accordion-header" aria-expanded="${i === 0}" aria-controls="doc-body-${doc.id}">
                  <div style="display:flex;align-items:center;gap:var(--space-sm);">
                    <span>${doc.icon}</span>
                    <span class="heading-4" style="font-size:var(--fs-md);">${doc.title}</span>
                  </div>
                  <span class="accordion-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </button>
                <div class="accordion-body" id="doc-body-${doc.id}" role="region">
                  <div class="accordion-content doc-content">${doc.content}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
    this.addDocStyles();
  },

  bindEvents() {
    // Accordion toggle
    Utils.$$('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.closest('.accordion-item');
        const wasActive = item.classList.contains('active');
        
        // Close all
        Utils.$$('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked
        if (!wasActive) {
          item.classList.add('active');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // TOC links
    Utils.$$('.docs-toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const targetEl = Utils.$(`#${targetId}`);
        if (targetEl) {
          // Open accordion
          Utils.$$('.accordion-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
          });
          targetEl.classList.add('active');
          targetEl.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Update active TOC
        Utils.$$('.docs-toc-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Search
    const searchInput = Utils.$('#docs-search');
    if (searchInput) {
      searchInput.addEventListener('input', Utils.debounce((e) => {
        this.search(e.target.value);
      }, 200));
    }

    // Copy code blocks in docs
    Utils.$$('.doc-code-block pre').forEach(pre => {
      const copyBtn = Utils.createElement('button', {
        className: 'copy-btn',
        style: { position: 'absolute', top: '0.5rem', right: '0.5rem' },
        innerHTML: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg> Copy`,
        onClick: () => {
          Utils.copyToClipboard(pre.textContent);
          Utils.showToast('Đã copy! 📋');
        }
      });
      pre.parentElement.style.position = 'relative';
      pre.parentElement.appendChild(copyBtn);
    });
  },

  search(query) {
    const q = query.toLowerCase().trim();
    const items = Utils.$$('.accordion-item');

    if (!q) {
      items.forEach(item => {
        item.style.display = '';
        // Remove highlights
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.innerHTML = content.innerHTML.replace(/<mark class="search-highlight">/g, '').replace(/<\/mark>/g, '');
        }
      });
      return;
    }

    items.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(q)) {
        item.style.display = '';
        item.classList.add('active');
        item.querySelector('.accordion-header').setAttribute('aria-expanded', 'true');
      } else {
        item.style.display = 'none';
      }
    });
  },

  addDocStyles() {
    if (Utils.$('#doc-extra-styles')) return;
    const style = document.createElement('style');
    style.id = 'doc-extra-styles';
    style.textContent = `
      .doc-content h3 { font-size: var(--fs-xl); margin-bottom: var(--space-md); color: var(--text); }
      .doc-content h4 { font-size: var(--fs-lg); margin: var(--space-xl) 0 var(--space-md); color: var(--text); }
      .doc-content p { margin-bottom: var(--space-md); color: var(--text-secondary); line-height: 1.8; }
      .doc-content ul, .doc-content ol { margin-bottom: var(--space-md); padding-left: var(--space-xl); }
      .doc-content li { margin-bottom: var(--space-sm); color: var(--text-secondary); line-height: 1.7; }
      .doc-content li strong { color: var(--text); }
      .doc-content code { 
        background: rgba(108,99,255,0.1); padding: 0.15rem 0.4rem; border-radius: 4px; 
        font-family: var(--font-mono); font-size: 0.85em; color: var(--primary-light); 
      }
      .doc-content em { color: var(--accent); font-style: italic; }
      .doc-highlight {
        background: rgba(108,99,255,0.08); border: 1px solid rgba(108,99,255,0.2);
        border-radius: var(--radius-md); padding: var(--space-lg); margin: var(--space-lg) 0;
        line-height: 1.8;
      }
      .doc-code-block {
        background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06);
        border-radius: var(--radius-md); margin: var(--space-lg) 0; overflow: hidden; position: relative;
      }
      .doc-code-block .doc-code-header {
        padding: 0.5rem var(--space-lg); background: rgba(255,255,255,0.03);
        border-bottom: 1px solid rgba(255,255,255,0.06); font-size: var(--fs-xs); color: var(--text-muted);
      }
      .doc-code-block pre {
        padding: var(--space-lg); font-family: var(--font-mono); font-size: var(--fs-sm);
        line-height: 1.8; white-space: pre-wrap; color: var(--text-secondary);
      }
      .search-highlight { background: rgba(255,184,77,0.3); padding: 1px 2px; border-radius: 2px; }

      @media print {
        .sidebar, .nav-controls, .slide-counter, .fullscreen-btn, .a11y-controls, .progress-bar { display: none !important; }
        .main-content { margin-left: 0 !important; }
        .section-screen { position: static !important; opacity: 1 !important; visibility: visible !important; overflow: visible !important; height: auto !important; }
        .accordion-item { break-inside: avoid; }
        .accordion-body { max-height: none !important; }
        body { background: white !important; color: black !important; overflow: auto !important; }
      }
    `;
    document.head.appendChild(style);
  }
};

window.Docs = Docs;
