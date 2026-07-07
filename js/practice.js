/* ============================================
   PRACTICE — AI Gemini Presentation
   Interactive practice: Idea → Meta-prompt → Gemini optimize → Create image
   ============================================ */

const Practice = {
  currentStep: 0,
  initialized: false,
  userIdea: '',       // Store user's raw idea
  geminiPrompt: '',   // Store Gemini-generated prompt

  // Meta-prompt template — user's idea gets inserted at the placeholder
  META_PROMPT_TEMPLATE: `Bạn là Prompt Engineer chuyên nghiệp về AI Image Generation.

Hãy chuyển ý tưởng sau thành Prompt chi tiết bằng tiếng Anh để AI tạo ảnh chất lượng cao.

Yêu cầu bắt buộc:
• Mô tả chi tiết chủ thể (subject)
• Bối cảnh & không gian (scene/environment)
• Góc máy (camera angle, lens, aperture)
• Ánh sáng (lighting setup)
• Bố cục (composition)
• Phong cách nghệ thuật (artistic style)
• Màu sắc (color palette/grading)
• Chất lượng (resolution, render quality)
• Chỉ trả về Prompt cuối cùng, không giải thích

Ý tưởng: `,

  STEPS: [
    {
      id: 1,
      title: 'Nhập Ý Tưởng & Tạo Prompt',
      icon: '💡',
      type: 'idea-input',
      desc: 'Mô tả ý tưởng ảnh bạn muốn tạo bằng tiếng Việt. Web sẽ tự động ghép vào template yêu cầu Gemini viết prompt chuyên nghiệp cho bạn.',
      tip: 'Mẹo: Viết tự nhiên, ví dụ: "Cô gái mặc áo dài đứng bên hồ lúc hoàng hôn" — Gemini sẽ biến nó thành prompt chuyên nghiệp.'
    },
    {
      id: 2,
      title: 'Nhận Prompt Từ Gemini',
      icon: '✨',
      type: 'receive-prompt',
      desc: 'Paste prompt mà Gemini vừa trả về vào khung bên dưới. Sau đó copy prompt này để gửi lại cho Gemini tạo hình ảnh.',
      tip: 'Mẹo: Sau khi gửi meta-prompt ở Bước 1, Gemini sẽ trả về một prompt tiếng Anh chuyên nghiệp. Copy toàn bộ và paste vào đây.'
    },
    {
      id: 3,
      title: 'Tạo Hình Ảnh',
      icon: '🎨',
      type: 'create-image',
      desc: 'Gửi prompt đã tối ưu cho Gemini để tạo hình ảnh. Nếu chưa ưng ý, có thể yêu cầu "tạo lại" hoặc chỉnh sửa prompt.',
      tip: 'Mẹo: Nếu kết quả chưa đẹp, thử thêm "ultra-realistic, 8K, cinematic lighting" vào cuối prompt.'
    },
    {
      id: 4,
      title: 'Chỉnh Sửa Ảnh',
      icon: '🖌️',
      desc: 'Chỉnh sửa ảnh bằng ngôn ngữ tự nhiên — giữ nguyên phần bạn muốn.',
      prompt: 'Giữ nguyên mọi thứ trong ảnh.\nChỉ thay đổi [MÔ TẢ THAY ĐỔI].\n\nVí dụ:\n• Giữ nguyên mọi thứ, chỉ thay nền thành bãi biển\n• Giữ nguyên khuôn mặt, đổi váy thành áo dài\n• Thêm mưa nhẹ và hiệu ứng phản chiếu',
      tip: 'Mẹo: Nêu rõ "giữ nguyên" phần nào và "thay đổi" phần nào.'
    },
    {
      id: 6,
      title: 'Tạo Video',
      icon: '🎬',
      desc: 'Tạo video ngắn từ ảnh hoặc từ Prompt.',
      prompt: 'Tạo video từ mô tả sau.\n\nThêm:\n• Camera movement (pan, dolly, tilt)\n• Cinematic lighting\n• Smooth motion\n• Realistic physics\n\nMô tả: [ĐIỀN MÔ TẢ VIDEO]',
      tip: 'Mẹo: Thêm "slow motion" hoặc "dramatic camera movement" để video ấn tượng hơn.'
    },
    {
      id: 5,
      title: 'Đưa Sang Canva',
      icon: '🎯',
      desc: 'Import ảnh/video AI vào Canva để thiết kế poster hoặc social media post.',
      example: 'Mở Canva → Chọn template → Upload ảnh AI → Thêm text & logo → Xuất file PNG/MP4.',
      tip: 'Mẹo: Dùng tính năng "Magic Resize" của Canva để chuyển đổi kích thước cho nhiều nền tảng.'
    }
  ],

  init() {
    if (this.initialized) return;
    this.initialized = true;
    this.render();
    this.showStep(0);
  },

  render() {
    const container = Utils.$('#section-practice .section-content');
    if (!container) return;

    container.innerHTML = `
      <div class="practice-steps" id="practice-progress" role="tablist" aria-label="Các bước thực hành">
        ${this.STEPS.map((step, i) => `
          <div class="practice-step-indicator">
            <button class="practice-step-dot ${i === 0 ? 'active' : ''}" data-step="${i}" role="tab" aria-label="Bước ${i + 1}: ${step.title}" aria-selected="${i === 0}">
              ${i + 1}
            </button>
            ${i < this.STEPS.length - 1 ? '<div class="practice-step-line"></div>' : ''}
          </div>
        `).join('')}
      </div>
      <div id="practice-content" role="tabpanel" aria-label="Nội dung thực hành"></div>
    `;

    Utils.$$('.practice-step-dot', container).forEach(dot => {
      dot.addEventListener('click', () => {
        this.showStep(parseInt(dot.dataset.step));
      });
    });
  },

  showStep(index) {
    this.currentStep = index;
    const step = this.STEPS[index];
    const content = Utils.$('#practice-content');
    if (!content || !step) return;

    switch (step.type) {
      case 'idea-input':
        this.renderIdeaInput(content, step, index);
        break;
      case 'receive-prompt':
        this.renderReceivePrompt(content, step, index);
        break;
      case 'create-image':
        this.renderCreateImage(content, step, index);
        break;
      default:
        this.renderNormalStep(content, step, index);
    }

    // Update progress dots
    Utils.$$('.practice-step-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.classList.toggle('completed', i < index);
      dot.setAttribute('aria-selected', i === index);
    });
    Utils.$$('.practice-step-line').forEach((line, i) => {
      line.classList.toggle('completed', i < index);
    });

    // Trigger animations for dynamically rendered content
    // Double rAF ensures DOM is fully painted before adding anim-visible
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        Utils.$$('.fade-up, .fade-down, .fade-left, .fade-right, .scale-in, .scale-up', content).forEach((el, i) => {
          setTimeout(() => el.classList.add('anim-visible'), i * 80);
        });
      });
    });
  },

  // ==================== STEP 1: Nhập ý tưởng → Tạo meta-prompt ====================
  renderIdeaInput(content, step, index) {
    const savedIdea = this.userIdea || 'Cô gái mặc áo dài trắng đứng bên hồ sen lúc hoàng hôn, ánh sáng vàng ấm, lãng mạn';

    content.innerHTML = `
      <div class="card card-no-hover fade-up" style="margin-top:var(--space-xl);max-width:800px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-xl);">
          <span style="font-size:2rem;">${step.icon}</span>
          <div>
            <span class="badge badge-primary">Bước ${step.id}/${this.STEPS.length}</span>
            <h3 class="heading-3" style="margin-top:var(--space-xs);">${step.title}</h3>
          </div>
        </div>
        
        <p class="body-md text-secondary" style="margin-bottom:var(--space-lg);line-height:1.8;">${step.desc}</p>

        <!-- User Idea Input -->
        <div class="prompt-field" style="margin-bottom:var(--space-xl);">
          <label class="prompt-field-label" for="user-idea-input">
            <span class="field-icon">💬</span>
            Ý tưởng của bạn (tiếng Việt)
          </label>
          <textarea id="user-idea-input" 
                    style="width:100%;min-height:80px;padding:var(--space-lg);resize:vertical;line-height:1.8;font-size:var(--fs-base);background:rgba(255,255,255,0.04);border:1px solid var(--card-border);border-radius:var(--radius-md);color:var(--text);font-family:var(--font-body);" 
                    placeholder="Ví dụ: Cô gái mặc áo dài trắng đứng bên hồ sen lúc hoàng hôn..."
                    oninput="Practice.onIdeaChange()"
                    aria-label="Nhập ý tưởng">${savedIdea}</textarea>
        </div>

        <!-- Arrow indicator -->
        <div style="text-align:center;margin-bottom:var(--space-lg);">
          <span style="font-size:1.5rem;color:var(--primary);">⬇️</span>
          <p class="body-sm text-muted" style="margin-top:var(--space-xs);">Ý tưởng được tự động ghép vào template bên dưới</p>
        </div>

        <!-- Generated Meta-Prompt -->
        <div class="code-block" style="margin-bottom:var(--space-lg);">
          <div class="code-block-header">
            <span>📋 Meta-Prompt (gửi cho Gemini)</span>
            <div style="display:flex;gap:var(--space-sm);align-items:center;">
              <button class="copy-btn" onclick="Practice.copyMetaPrompt();Utils.showToast('Đã copy! Mở Gemini và paste vào 🚀');" aria-label="Copy meta-prompt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
          </div>
          <pre class="code-block-body" style="white-space:pre-wrap;font-size:var(--fs-sm);line-height:1.8;" id="meta-prompt-output"></pre>
        </div>

        <!-- Action: Copy + Open Gemini -->
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;">
          <button class="btn btn-primary" onclick="Practice.copyMetaPrompt();Utils.showToast('Đã copy! Mở Gemini và paste vào 🚀');" aria-label="Copy meta-prompt">
            📋 Copy Meta-Prompt
          </button>
          <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="gemini-link-btn" aria-label="Mở Gemini">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Mở Gemini — Paste vào
          </a>
        </div>

        <div class="card glass-subtle" style="display:flex;align-items:flex-start;gap:var(--space-sm);margin-top:var(--space-xl);">
          <span style="font-size:1.2rem;">💡</span>
          <p class="body-sm text-secondary">${step.tip}</p>
        </div>

        ${this.renderNavButtons(index)}
      </div>
    `;

    // Generate initial meta-prompt
    this.onIdeaChange();
  },

  // ==================== STEP 2: Nhận prompt từ Gemini → Paste vào khung ====================
  renderReceivePrompt(content, step, index) {
    content.innerHTML = `
      <div class="card card-no-hover fade-up" style="margin-top:var(--space-xl);max-width:800px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-xl);">
          <span style="font-size:2rem;">${step.icon}</span>
          <div>
            <span class="badge badge-primary">Bước ${step.id}/${this.STEPS.length}</span>
            <h3 class="heading-3" style="margin-top:var(--space-xs);">${step.title}</h3>
          </div>
        </div>
        
        <p class="body-md text-secondary" style="margin-bottom:var(--space-lg);line-height:1.8;">${step.desc}</p>

        <!-- Flow diagram -->
        <div class="card glass-subtle" style="margin-bottom:var(--space-xl);padding:var(--space-lg);">
          <div style="display:flex;align-items:center;gap:var(--space-sm);flex-wrap:wrap;justify-content:center;">
            <span class="badge badge-accent">Bước 1: Gửi meta-prompt</span>
            <span style="color:var(--text-muted);">→</span>
            <span class="badge badge-secondary">Gemini trả prompt tối ưu</span>
            <span style="color:var(--text-muted);">→</span>
            <span class="badge badge-primary">Paste vào đây ⬇️</span>
          </div>
        </div>

        <!-- Paste area for Gemini's response -->
        <div class="prompt-field" style="margin-bottom:var(--space-lg);">
          <label class="prompt-field-label" for="gemini-response-input">
            <span class="field-icon">🤖</span>
            Paste prompt mà Gemini trả về
          </label>
          <textarea id="gemini-response-input" 
                    style="width:100%;min-height:150px;padding:var(--space-lg);resize:vertical;line-height:1.8;font-size:var(--fs-sm);font-family:var(--font-mono);background:rgba(79,209,197,0.05);border:1px solid rgba(79,209,197,0.2);border-radius:var(--radius-md);color:var(--text);" 
                    placeholder="Paste prompt tiếng Anh mà Gemini vừa trả về vào đây...&#10;&#10;Ví dụ: A Vietnamese woman wearing a traditional white áo dài with delicate floral embroidery, standing gracefully by the edge of a serene lotus lake at golden hour..."
                    oninput="Practice.onGeminiResponseChange()"
                    aria-label="Paste prompt từ Gemini">${this.geminiPrompt}</textarea>
        </div>

        <!-- Copy prompt to create image -->
        <div style="display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;">
          <button class="btn btn-primary" onclick="Practice.copyGeminiPrompt()" aria-label="Copy prompt để tạo ảnh">
            📋 Copy Prompt Này
          </button>
          <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="gemini-link-btn" aria-label="Mở Gemini để tạo ảnh">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Mở Gemini — Gửi prompt tạo ảnh
          </a>
        </div>

        <div class="card glass-subtle" style="display:flex;align-items:flex-start;gap:var(--space-sm);margin-top:var(--space-xl);">
          <span style="font-size:1.2rem;">💡</span>
          <p class="body-sm text-secondary">${step.tip}</p>
        </div>

        ${this.renderNavButtons(index)}
      </div>
    `;
  },

  // ==================== STEP 3: Tạo hình ảnh ====================
  renderCreateImage(content, step, index) {
    const hasPrompt = this.geminiPrompt && this.geminiPrompt.trim().length > 0;

    content.innerHTML = `
      <div class="card card-no-hover fade-up" style="margin-top:var(--space-xl);max-width:800px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-xl);">
          <span style="font-size:2rem;">${step.icon}</span>
          <div>
            <span class="badge badge-primary">Bước ${step.id}/${this.STEPS.length}</span>
            <h3 class="heading-3" style="margin-top:var(--space-xs);">${step.title}</h3>
          </div>
        </div>
        
        <p class="body-md text-secondary" style="margin-bottom:var(--space-xl);line-height:1.8;">${step.desc}</p>

        ${hasPrompt ? `
          <!-- Show the prompt user received from Gemini -->
          <div class="code-block" style="margin-bottom:var(--space-lg);">
            <div class="code-block-header">
              <span>🤖 Prompt đã tối ưu từ Gemini</span>
              <button class="copy-btn" onclick="Practice.copyGeminiPrompt();Utils.showToast('Đã copy! Gửi cho Gemini để tạo ảnh 🎨');" aria-label="Copy prompt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
            </div>
            <pre class="code-block-body" style="white-space:pre-wrap;font-size:var(--fs-sm);line-height:1.8;">${Utils.escapeHTML(this.geminiPrompt)}</pre>
          </div>
        ` : `
          <div class="card glass-subtle" style="text-align:center;padding:var(--space-2xl);margin-bottom:var(--space-lg);">
            <span style="font-size:2.5rem;display:block;margin-bottom:var(--space-md);">📝</span>
            <p class="body-md text-secondary">Chưa có prompt. Quay lại <strong>Bước 2</strong> để paste prompt từ Gemini.</p>
            <button class="btn btn-secondary" style="margin-top:var(--space-md);" onclick="Practice.showStep(1)">← Quay lại Bước 2</button>
          </div>
        `}

        <!-- Steps guide -->
        <div class="card glass-subtle" style="margin-bottom:var(--space-lg);">
          <span class="badge badge-secondary" style="margin-bottom:var(--space-sm);">📌 Hướng dẫn</span>
          <div style="display:flex;flex-direction:column;gap:var(--space-sm);margin-top:var(--space-sm);">
            <p class="body-sm text-secondary">① Copy prompt ở trên (hoặc nhấn nút Copy)</p>
            <p class="body-sm text-secondary">② Mở Gemini → Paste prompt → Nhấn Enter</p>
            <p class="body-sm text-secondary">③ Chờ AI tạo ảnh → Tải về nếu ưng ý</p>
            <p class="body-sm text-secondary">④ Chưa ưng? Gõ "Tạo lại" hoặc chỉnh prompt</p>
          </div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:var(--space-md);align-items:center;">
          ${hasPrompt ? `
            <button class="btn btn-primary" onclick="Practice.copyGeminiPrompt();Utils.showToast('Đã copy! Gửi cho Gemini để tạo ảnh 🎨');">
              📋 Copy Prompt
            </button>
          ` : ''}
          <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="gemini-link-btn" aria-label="Mở Gemini để tạo ảnh">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Mở Gemini — Tạo ảnh ngay
          </a>
        </div>

        <div class="card glass-subtle" style="display:flex;align-items:flex-start;gap:var(--space-sm);margin-top:var(--space-xl);">
          <span style="font-size:1.2rem;">💡</span>
          <p class="body-sm text-secondary">${step.tip}</p>
        </div>

        ${this.renderNavButtons(index)}
      </div>
    `;
  },

  // ==================== Default step renderer ====================
  renderNormalStep(content, step, index) {
    content.innerHTML = `
      <div class="card card-no-hover fade-up" style="margin-top:var(--space-xl);max-width:800px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-xl);">
          <span style="font-size:2rem;">${step.icon}</span>
          <div>
            <span class="badge badge-primary">Bước ${step.id}/${this.STEPS.length}</span>
            <h3 class="heading-3" style="margin-top:var(--space-xs);">${step.title}</h3>
          </div>
        </div>
        
        <p class="body-md text-secondary" style="margin-bottom:var(--space-xl);line-height:1.8;">${step.desc}</p>

        ${step.prompt ? `
          <div class="code-block" style="margin-bottom:var(--space-lg);">
            <div class="code-block-header">
              <span>📋 Prompt mẫu</span>
              <div style="display:flex;gap:var(--space-sm);align-items:center;">
                <button class="copy-btn" onclick="Practice.copyPrompt(${index});Utils.showToast('Đã copy!');" aria-label="Copy prompt">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  Copy
                </button>
                <a href="https://gemini.google.com/app" target="_blank" rel="noopener noreferrer" class="gemini-link-btn" style="padding:0.3rem 0.8rem;font-size:var(--fs-xs);" aria-label="Mở Gemini">
                  🔗 Mở Gemini
                </a>
              </div>
            </div>
            <pre class="code-block-body" style="white-space:pre-wrap;">${step.prompt}</pre>
          </div>
        ` : ''}

        ${step.example ? `
          <div class="card glass-subtle" style="margin-bottom:var(--space-lg);">
            <span class="badge badge-secondary" style="margin-bottom:var(--space-sm);">📌 Ví dụ</span>
            <p class="body-sm text-secondary" style="line-height:1.8;font-style:italic;">${step.example}</p>
          </div>
        ` : ''}

        <div class="card glass-subtle" style="display:flex;align-items:flex-start;gap:var(--space-sm);margin-bottom:var(--space-xl);">
          <span style="font-size:1.2rem;">💡</span>
          <p class="body-sm text-secondary">${step.tip}</p>
        </div>

        ${this.renderNavButtons(index)}
      </div>
    `;
  },

  // ==================== Nav Buttons ====================
  renderNavButtons(index) {
    return `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:var(--space-xl);">
        <button class="btn btn-secondary" ${index === 0 ? 'disabled' : ''} onclick="Practice.prevStep()" aria-label="Bước trước">
          ← Bước trước
        </button>
        <button class="btn btn-primary" ${index === this.STEPS.length - 1 ? 'disabled' : ''} onclick="Practice.nextStep()" aria-label="Bước tiếp">
          Bước tiếp →
        </button>
      </div>
    `;
  },

  // ==================== Event handlers ====================
  onIdeaChange() {
    const input = Utils.$('#user-idea-input');
    const output = Utils.$('#meta-prompt-output');
    if (!input || !output) return;

    this.userIdea = input.value.trim();
    const metaPrompt = this.META_PROMPT_TEMPLATE + (this.userIdea || '[ĐIỀN Ý TƯỞNG CỦA BẠN]');
    output.textContent = metaPrompt;
    this._currentMetaPrompt = metaPrompt;
  },

  onGeminiResponseChange() {
    const textarea = Utils.$('#gemini-response-input');
    if (textarea) {
      this.geminiPrompt = textarea.value.trim();
    }
  },

  // ==================== Copy actions ====================
  copyMetaPrompt() {
    if (this._currentMetaPrompt) {
      Utils.copyToClipboard(this._currentMetaPrompt);
    } else {
      const idea = this.userIdea || '[ĐIỀN Ý TƯỞNG CỦA BẠN]';
      Utils.copyToClipboard(this.META_PROMPT_TEMPLATE + idea);
    }
  },

  copyGeminiPrompt() {
    if (this.geminiPrompt) {
      Utils.copyToClipboard(this.geminiPrompt);
      Utils.showToast('Đã copy prompt! Gửi cho Gemini để tạo ảnh 🎨');
    } else {
      Utils.showToast('Chưa có prompt. Hãy paste prompt từ Gemini vào trước.');
    }
  },

  copyPrompt(index) {
    const step = this.STEPS[index];
    if (step && step.prompt) {
      Utils.copyToClipboard(step.prompt);
    }
  },

  nextStep() {
    if (this.currentStep < this.STEPS.length - 1) {
      this.showStep(this.currentStep + 1);
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }
};

window.Practice = Practice;
