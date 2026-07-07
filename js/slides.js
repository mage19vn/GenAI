/* ============================================
   SLIDES — AI Gemini Presentation
   Slide rendering engine
   ============================================ */

const Slides = {
  container: null,

  init() {
    this.container = Utils.$('.slides-container');
    if (!this.container) return;
    this.renderAll();
  },

  renderAll() {
    SLIDES_DATA.forEach((slide, index) => {
      const el = this.renderSlide(slide, index);
      this.container.appendChild(el);
    });
  },

  renderSlide(data, index) {
    const slide = Utils.createElement('section', {
      className: `slide slide-${data.type} ${index === 0 ? 'active' : ''}`,
      id: data.id,
      dataset: { index },
      'role': 'tabpanel',
      'aria-label': data.title ? data.title.replace(/<[^>]*>/g, '') : ''
    });

    switch (data.type) {
      case 'hero': this.renderHero(slide, data); break;
      case 'split': this.renderSplit(slide, data); break;
      case 'center': this.renderCenter(slide, data); break;
      case 'comparison': this.renderComparison(slide, data); break;
      default: this.renderCenter(slide, data);
    }

    return slide;
  },

  // ==================== HERO ====================
  renderHero(slide, data) {
    slide.id = 'hero-slide';

    // Background glows
    slide.innerHTML += `
      <div class="hero-glow-1"></div>
      <div class="hero-glow-2"></div>
      <div class="hero-glow-3"></div>
    `;

    const content = Utils.createElement('div', { className: 'hero-content' });

    // Badge
    content.innerHTML += `
      <div class="hero-badge fade-up">
        ${data.badge}
      </div>
    `;

    // Title
    content.innerHTML += `
      <h1 class="hero-title fade-up delay-2">${data.title}</h1>
    `;

    // Subtitle
    content.innerHTML += `
      <p class="hero-subtitle fade-up delay-3">${data.subtitle}</p>
    `;

    // CTA
    content.innerHTML += `
      <div class="hero-cta fade-up delay-4">
        <button class="btn btn-primary btn-lg" id="hero-cta-btn" aria-label="Bắt đầu">
          ${data.cta}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
        <button class="btn btn-secondary" onclick="Router.showSection('docs')" aria-label="Xem tài liệu">
          📄 Tài liệu
        </button>
      </div>
    `;

    // Scroll indicator
    content.innerHTML += `
      <div class="scroll-indicator fade-up delay-5">
        <span>Vuốt để tiếp tục</span>
        <div class="scroll-indicator-line"></div>
      </div>
    `;

    slide.appendChild(content);

    // CTA click handler
    setTimeout(() => {
      const ctaBtn = Utils.$('#hero-cta-btn');
      if (ctaBtn) ctaBtn.addEventListener('click', () => Router.next());
    }, 100);
  },

  // ==================== SPLIT ====================
  renderSplit(slide, data) {
    const wrapper = Utils.createElement('div', { className: 'slide-layout-split' });

    // Left side
    const left = Utils.createElement('div', { className: 'slide-split-left' });

    // Header
    left.innerHTML += `
      <div class="slide-header fade-up">
        <span class="slide-number">${data.number}</span>
        <h2 class="slide-title">${data.title}</h2>
        <p class="slide-subtitle">${data.subtitle}</p>
      </div>
    `;

    // Left content based on type
    if (data.content && data.content.type === 'ai-writes') {
      left.innerHTML += this.renderAIWrites(data.content);
    } else if (data.content && data.content.left) {
      left.innerHTML += this.renderComparisonList(data.content.left);
    }

    wrapper.appendChild(left);

    // Right side
    const right = Utils.createElement('div', { className: 'slide-split-right' });

    if (data.content && data.content.type === 'ai-writes') {
      right.innerHTML += this.renderAIOutput(data.content);
    } else if (data.content && data.content.right) {
      right.innerHTML += this.renderImageShowcase(data.content.right);
    } else if (data.content && data.content.type === 'image-creation') {
      right.innerHTML += this.renderImageCreation(data.content);
    }

    wrapper.appendChild(right);
    slide.appendChild(wrapper);
  },

  // ==================== CENTER ====================
  renderCenter(slide, data) {
    const wrapper = Utils.createElement('div', { className: 'slide-layout-center' });

    // Header
    wrapper.innerHTML += `
      <div class="slide-header slide-header-center fade-up">
        <span class="slide-number">${data.number || ''}</span>
        <h2 class="slide-title">${data.title}</h2>
        <p class="slide-subtitle">${data.subtitle}</p>
      </div>
    `;

    // Content based on type
    if (data.content) {
      const body = Utils.createElement('div', { className: 'slide-body' });

      switch (data.content.type) {
        case 'timeline':
          body.innerHTML = this.renderTimeline(data.content);
          break;
        case 'infographic':
          body.innerHTML = this.renderInfographic(data.content);
          break;
        case 'raw-idea':
          body.innerHTML = this.renderRawIdea(data.content);
          break;
        case 'workflow':
          body.innerHTML = this.renderWorkflow(data.content);
          break;
        case 'edit-showcase':
          body.innerHTML = this.renderEditShowcase(data.content);
          break;
        case 'video-creation':
          body.innerHTML = this.renderVideoCreation(data.content);
          break;
        case 'canva-flow':
          body.innerHTML = this.renderCanvaFlow(data.content);
          break;
        case 'mindmap':
          body.innerHTML = this.renderMindmap(data.content);
          break;
        case 'image-creation':
          body.innerHTML = this.renderImageCreationCenter(data.content);
          break;
      }

      wrapper.appendChild(body);
    }

    slide.appendChild(wrapper);
  },

  // ==================== COMPARISON ====================
  renderComparison(slide, data) {
    const wrapper = Utils.createElement('div', { className: 'slide-layout-wide' });

    // Header
    wrapper.innerHTML += `
      <div class="slide-header slide-header-center fade-up">
        <span class="slide-number">${data.number}</span>
        <h2 class="slide-title">${data.title}</h2>
        <p class="slide-subtitle">${data.subtitle}</p>
      </div>
    `;

    if (data.content && data.content.type === 'optimize') {
      wrapper.innerHTML += this.renderOptimize(data.content);
    }

    slide.appendChild(wrapper);
  },

  // ==================== COMPONENT RENDERERS ====================

  renderComparisonList(data) {
    return `
      <div class="fade-up delay-3">
        <div class="comparison-side comparison-before" style="margin-bottom: var(--space-lg);">
          <div class="comparison-label"><span>${data.before.icon}</span> ${data.before.label}</div>
          <ul style="display:flex;flex-direction:column;gap:0.5rem;">
            ${data.before.items.map(item => `
              <li style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);">
                <span style="color:#FF6B6B;">✕</span> ${item}
              </li>
            `).join('')}
          </ul>
        </div>
        <div class="comparison-side comparison-after">
          <div class="comparison-label"><span>${data.after.icon}</span> ${data.after.label}</div>
          <ul style="display:flex;flex-direction:column;gap:0.5rem;">
            ${data.after.items.map(item => `
              <li style="display:flex;align-items:center;gap:0.5rem;color:var(--text-secondary);">
                <span style="color:var(--secondary);">✓</span> ${item}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `;
  },

  renderImageShowcase(data) {
    return `
      <div class="grid-2 fade-up delay-4">
        ${data.images.map((img, i) => `
          <div class="card card-compact scale-in delay-${i + 4}" style="text-align:center;padding:0;overflow:hidden;">
            <div class="img-placeholder" style="${img.src ? `background:url('${img.src}') center/cover no-repeat;` : `background:${img.gradient};`}aspect-ratio:1;">
              ${!img.src ? `<span style="font-size:2.5rem;display:flex;align-items:center;justify-content:center;height:100%;">${img.icon}</span>` : ''}
            </div>
            <span class="body-sm text-secondary" style="display:block;padding:0.75rem;">${img.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderTimeline(data) {
    return `
      <div class="timeline fade-up delay-2" style="max-width:600px;margin:0 auto;">
        ${data.items.map((item, i) => `
          <div class="timeline-item fade-up delay-${i + 3}">
            <div class="timeline-dot" style="background:${item.color};box-shadow:0 0 0 3px ${item.color}33;"></div>
            <div class="card card-no-hover" style="display:flex;align-items:center;gap:var(--space-lg);">
              <span style="font-size:2rem;">${item.icon}</span>
              <div>
                <h4 class="heading-4" style="margin-bottom:0.25rem;">${item.title}</h4>
                <p class="body-sm text-secondary">${item.desc}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderInfographic(data) {
    return `
      <div style="max-width:700px;margin:0 auto;">
        <div class="comparison fade-up delay-2" style="margin-bottom:var(--space-2xl);">
          <div class="comparison-side comparison-before">
            <div class="comparison-label">${data.wrong.label}</div>
            <p class="body-md" style="color:var(--text-secondary);font-style:italic;">${data.wrong.text}</p>
          </div>
          <div class="comparison-side comparison-after">
            <div class="comparison-label">${data.right.label}</div>
            <p class="body-md" style="color:var(--text);font-weight:600;">${data.right.text}</p>
          </div>
        </div>
        <div class="grid-2 fade-up delay-4">
          ${data.tips.map((tip, i) => `
            <div class="card card-compact scale-in delay-${i + 4}" style="display:flex;align-items:center;gap:var(--space-md);">
              <span style="font-size:1.5rem;">${tip.icon}</span>
              <span class="body-sm">${tip.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderRawIdea(data) {
    return `
      <div style="display:flex;flex-direction:column;gap:var(--space-lg);max-width:700px;margin:0 auto;">
        ${data.examples.map((ex, i) => `
          <div class="card fade-up delay-${i + 2}" style="position:relative;">
            <div style="display:flex;align-items:flex-start;gap:var(--space-md);">
              <span style="font-size:1.5rem;flex-shrink:0;">${ex.emoji}</span>
              <div style="flex:1;">
                <span class="badge badge-accent" style="margin-bottom:var(--space-sm);">${ex.label}</span>
                <p class="body-md" style="color:var(--text-secondary);font-style:italic;line-height:1.8;margin-top:0.5rem;">"${ex.raw}"</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderAIWrites(data) {
    return `
      <div class="fade-up delay-3">
        <div class="code-block" style="margin-top:var(--space-lg);">
          <div class="code-block-header">
            <span>${data.input.label}</span>
            <button class="copy-btn" onclick="Utils.copyToClipboard(this.closest('.code-block').querySelector('pre').textContent);Utils.showToast('Đã copy!');" aria-label="Copy">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <pre class="code-block-body" style="white-space:pre-wrap;font-size:var(--fs-sm);line-height:1.8;">${data.input.text}</pre>
        </div>
      </div>
    `;
  },

  renderAIOutput(data) {
    return `
      <div class="fade-left delay-4">
        <div class="card" style="border-color:rgba(79,209,197,0.2);background:rgba(79,209,197,0.05);">
          <div style="display:flex;align-items:center;gap:var(--space-sm);margin-bottom:var(--space-md);">
            <span class="badge badge-secondary">${data.output.label}</span>
          </div>
          <p class="body-sm" style="color:var(--text-secondary);line-height:1.9;font-family:var(--font-mono);">${data.output.text}</p>
          <div style="margin-top:var(--space-lg);display:flex;gap:var(--space-sm);">
            <button class="btn btn-sm btn-secondary" onclick="Utils.copyToClipboard('${data.output.text.replace(/'/g, "\\'")}');Utils.showToast('Đã copy Prompt!');" aria-label="Copy prompt">
              📋 Copy Prompt
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderOptimize(data) {
    return `
      <div class="comparison fade-up delay-2" style="margin-top:var(--space-xl);">
        <div class="comparison-side comparison-before">
          <div class="comparison-label"><span>📝</span> ${data.before.label}</div>
          <p class="body-md" style="color:var(--text-secondary);line-height:1.8;font-family:var(--font-mono);font-size:var(--fs-sm);">${data.before.text}</p>
        </div>
        <div class="comparison-side comparison-after">
          <div class="comparison-label"><span>✨</span> ${data.after.label}</div>
          <p class="body-md" style="color:var(--text-secondary);line-height:1.8;font-family:var(--font-mono);font-size:var(--fs-sm);">${data.after.text}</p>
        </div>
      </div>
      <div class="fade-up delay-4" style="display:flex;flex-wrap:wrap;gap:var(--space-sm);justify-content:center;margin-top:var(--space-xl);">
        ${data.improvements.map(imp => `
          <span class="badge badge-primary">✨ ${imp}</span>
        `).join('')}
      </div>
    `;
  },

  renderWorkflow(data) {
    return `
      <div class="workflow fade-up delay-2" style="justify-content:center;flex-wrap:wrap;">
        ${data.steps.map((step, i) => `
          ${i > 0 ? '<div class="workflow-arrow scale-in delay-' + (i + 2) + '">→</div>' : ''}
          <div class="workflow-step scale-in delay-${i + 2}">
            <div class="workflow-icon" style="background:${step.color}22;border-color:${step.color}44;">
              <span>${step.icon}</span>
            </div>
            <span class="workflow-label">${step.label}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderImageCreationCenter(data) {
    return `
      <div style="max-width:800px;margin:0 auto;">
        <div class="code-block fade-up delay-2" style="margin-bottom:var(--space-xl);">
          <div class="code-block-header">
            <span>📝 Prompt</span>
            <button class="copy-btn" onclick="Utils.copyToClipboard('${data.prompt.replace(/'/g, "\\'")}');Utils.showToast('Đã copy!');" aria-label="Copy prompt">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
              Copy
            </button>
          </div>
          <pre class="code-block-body" style="white-space:pre-wrap;font-size:var(--fs-sm);">${data.prompt}</pre>
        </div>
        <div class="img-placeholder scale-in delay-4" style="${data.result.src ? `background:url('${data.result.src}') center/cover no-repeat;` : `background:${data.result.gradient};`}height:300px;border-radius:var(--radius-lg);overflow:hidden;">
          ${!data.result.src ? `
          <div style="text-align:center;z-index:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
            <span style="font-size:3rem;display:block;margin-bottom:0.5rem;">${data.result.icon}</span>
            <span class="body-sm">${data.result.label}</span>
          </div>
          ` : ''}
        </div>
        <div class="grid-4 fade-up delay-5" style="margin-top:var(--space-xl);">
          ${data.features.map(f => `
            <div class="card card-compact" style="text-align:center;">
              <span style="font-size:1.5rem;display:block;margin-bottom:0.5rem;">${f.icon}</span>
              <span class="body-sm text-secondary">${f.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderImageCreation(data) {
    return `
      <div class="fade-left delay-3">
        <div class="img-placeholder scale-in delay-4" style="${data.result.src ? `background:url('${data.result.src}') center/cover no-repeat;` : `background:${data.result.gradient};`}max-width:400px;margin-left:auto;aspect-ratio:1;border-radius:var(--radius-lg);margin-bottom:var(--space-lg);overflow:hidden;box-shadow:var(--shadow-lg);">
          ${!data.result.src ? `
          <div style="text-align:center;z-index:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;">
            <span style="font-size:3rem;display:block;margin-bottom:0.5rem;">${data.result.icon}</span>
            <span class="body-sm">${data.result.label}</span>
          </div>
          ` : ''}
        </div>
        <div class="grid-2" style="gap:var(--space-md);">
          ${data.features.map((f, i) => `
            <div class="card card-compact scale-in delay-${i + 5}" style="display:flex;align-items:center;gap:var(--space-sm);padding:0.75rem 1rem;">
              <span>${f.icon}</span>
              <span class="body-sm text-secondary">${f.text}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderEditShowcase(data) {
    return `
      <div class="grid-2 fade-up delay-2" style="max-width:900px;margin:0 auto;">
        ${data.edits.map((edit, i) => `
          <div class="card scale-in delay-${i + 3}" style="overflow:hidden;">
            <div class="img-placeholder" style="${edit.src ? `background:url('${edit.src}') center/cover no-repeat;` : `background:${edit.gradient};`}aspect-ratio:16/10;margin:-var(--space-xl);margin-bottom:var(--space-lg);margin-top:calc(-1 * var(--space-xl));border-radius:var(--radius-lg) var(--radius-lg) 0 0;">
              ${!edit.src ? `<span style="font-size:2.5rem;display:flex;align-items:center;justify-content:center;height:100%;">${edit.icon}</span>` : ''}
            </div>
            <h4 class="heading-4" style="margin-top:var(--space-md);margin-bottom:var(--space-sm);">${edit.title}</h4>
            <p class="body-sm text-secondary" style="font-style:italic;line-height:1.7;">"${edit.prompt}"</p>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderVideoCreation(data) {
    return `
      <div style="max-width:1000px;margin:0 auto;">
        ${data.videoUrl ? `
          <div class="card fade-up delay-2" style="padding:0;overflow:hidden;margin-bottom:var(--space-2xl);border-radius:var(--radius-lg);box-shadow:var(--shadow-2xl);border:1px solid rgba(255,255,255,0.1);">
            <video src="${data.videoUrl}" autoplay loop muted playsinline style="width:100%;display:block;aspect-ratio:21/9;object-fit:cover;"></video>
            <div style="padding:var(--space-sm) var(--space-md);background:rgba(0,0,0,0.5);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;">
              <span class="body-sm" style="color:var(--text);font-weight:500;"><span style="color:var(--primary);margin-right:0.5rem;">✨</span> Video Generated by AI</span>
              <div style="display:flex;gap:0.5rem;">
                <span class="badge" style="background:rgba(255,255,255,0.1);color:var(--text);">4K 60FPS</span>
                <span class="badge badge-primary">Cinematic</span>
              </div>
            </div>
          </div>
        ` : ''}
        
        <div class="grid-3 fade-up ${data.videoUrl ? 'delay-4' : 'delay-2'}" style="margin-bottom:var(--space-2xl);">
          ${data.storyboard.map((frame, i) => `
            <div class="card scale-in delay-${i + (data.videoUrl ? 5 : 3)}" style="text-align:center;overflow:hidden;padding:0;">
              <div class="img-placeholder" style="${frame.src ? `background:url('${frame.src}') center/cover no-repeat;` : `background:${frame.gradient};`}aspect-ratio:16/9;border-radius:var(--radius-lg) var(--radius-lg) 0 0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                ${!frame.src ? `<span style="font-size:2rem;">${frame.icon}</span>` : ''}
              </div>
              <div style="padding:var(--space-md);">
                <span class="badge badge-primary" style="margin-bottom:var(--space-xs);">Frame ${frame.frame}</span>
                <p class="body-sm text-secondary" style="margin-bottom:0;">${frame.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="card card-no-hover fade-up delay-6" style="display:flex;flex-wrap:wrap;gap:var(--space-md);justify-content:center;">
          ${data.features.map(f => `
            <span class="badge badge-secondary">🎬 ${f}</span>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderCanvaFlow(data) {
    return `
      <div class="workflow fade-up delay-2" style="justify-content:center;flex-wrap:wrap;">
        ${data.steps.map((step, i) => `
          ${i > 0 ? '<div class="workflow-arrow scale-in delay-' + (i + 2) + '">→</div>' : ''}
          <div class="workflow-step scale-in delay-${i + 2}">
            <div class="workflow-icon" style="font-size:1.5rem;">
              ${step.icon}
            </div>
            <span class="workflow-label" style="font-weight:600;">${step.label}</span>
            <span class="body-sm text-muted" style="font-size:0.7rem;">${step.desc}</span>
          </div>
        `).join('')}
      </div>
    `;
  },

  renderMindmap(data) {
    return `
      <div class="mindmap fade-up delay-2">
        <div class="mindmap-branch">
          ${data.branches.left.map((node, i) => `
            <div class="mindmap-node scale-in delay-${i + 3}" style="display:flex;align-items:center;gap:var(--space-sm);">
              <span>${node.icon}</span>
              <div>
                <div style="font-weight:600;font-size:var(--fs-sm);">${node.label}</div>
                <div class="body-sm text-muted" style="font-size:0.7rem;">${node.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="mindmap-center scale-in delay-2">
          ${data.center.replace('\n', '<br>')}
        </div>
        <div class="mindmap-branch">
          ${data.branches.right.map((node, i) => `
            <div class="mindmap-node scale-in delay-${i + 5}" style="display:flex;align-items:center;gap:var(--space-sm);">
              <span>${node.icon}</span>
              <div>
                <div style="font-weight:600;font-size:var(--fs-sm);">${node.label}</div>
                <div class="body-sm text-muted" style="font-size:0.7rem;">${node.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }
};

window.Slides = Slides;
