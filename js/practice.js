/* ============================================
   PRACTICE — AI Gemini Presentation
   Interactive practice modules
   ============================================ */

const Practice = {
  currentStep: 0,
  initialized: false,

  STEPS: [
    {
      id: 1,
      title: 'Viết Ý Tưởng',
      icon: '💡',
      desc: 'Viết ý tưởng ảnh bạn muốn tạo bằng ngôn ngữ tự nhiên (tiếng Việt).',
      example: 'Mình muốn một tấm ảnh cô gái mặc áo dài trắng, đứng giữa cánh đồng hoa sen, lúc bình minh, ánh sáng dịu nhẹ, không gian yên bình.',
      placeholder: 'Nhập ý tưởng của bạn tại đây...',
      tip: '💡 Mẹo: Hãy mô tả càng chi tiết càng tốt — bao gồm chủ thể, bối cảnh, ánh sáng, cảm xúc.'
    },
    {
      id: 2,
      title: 'AI Viết Prompt',
      icon: '✍️',
      desc: 'Copy meta-prompt bên dưới, thay ý tưởng của bạn vào, rồi gửi cho Gemini.',
      prompt: 'Bạn là Prompt Engineer chuyên nghiệp.\n\nHãy chuyển ý tưởng sau thành Prompt chi tiết để AI tạo ảnh.\n\nYêu cầu:\n• Bổ sung chi tiết mô tả\n• Góc máy (camera angle)\n• Ánh sáng (lighting)\n• Bố cục (composition)\n• Phong cách (style)\n• Màu sắc (color palette)\n• Chất lượng (quality/resolution)\n• Chỉ trả về Prompt cuối cùng\n\nÝ tưởng: [ĐIỀN Ý TƯỞNG CỦA BẠN]',
      tip: '💡 Mẹo: Thay [ĐIỀN Ý TƯỞNG CỦA BẠN] bằng ý tưởng bạn viết ở Bước 1.'
    },
    {
      id: 3,
      title: 'AI Tối Ưu Prompt',
      icon: '🚀',
      desc: 'Gửi Prompt nhận được cho Gemini đánh giá và tối ưu.',
      prompt: 'Đánh giá Prompt sau và viết lại để:\n• Điện ảnh hơn (more cinematic)\n• Chân thực hơn (more realistic)\n• Đẹp hơn (more aesthetic)\n• Giữ nguyên ý tưởng gốc\n\nChỉ trả về Prompt cuối cùng.\n\nPrompt cần tối ưu:\n[PASTE PROMPT CỦA BẠN]',
      tip: '💡 Mẹo: Bạn có thể tối ưu nhiều lần để Prompt ngày càng tốt hơn.'
    },
    {
      id: 4,
      title: 'Tạo Ảnh',
      icon: '🎨',
      desc: 'Paste Prompt đã tối ưu vào Gemini và yêu cầu tạo ảnh.',
      example: 'Mở gemini.google.com → Paste Prompt → Nhấn Enter → Chờ AI tạo ảnh → Tải về nếu ưng ý.',
      tip: '💡 Mẹo: Nếu kết quả chưa ưng, hãy yêu cầu "Tạo lại" hoặc điều chỉnh Prompt.'
    },
    {
      id: 5,
      title: 'Chỉnh Sửa',
      icon: '🖌️',
      desc: 'Chỉnh sửa ảnh bằng ngôn ngữ tự nhiên — giữ nguyên phần bạn muốn.',
      prompt: 'Giữ nguyên mọi thứ trong ảnh.\nChỉ thay đổi [MÔ TẢ THAY ĐỔI].\n\nVí dụ:\n• Giữ nguyên mọi thứ, chỉ thay nền thành bãi biển\n• Giữ nguyên khuôn mặt, đổi váy thành áo dài\n• Thêm mưa nhẹ và hiệu ứng phản chiếu',
      tip: '💡 Mẹo: Nêu rõ "giữ nguyên" phần nào và "thay đổi" phần nào.'
    },
    {
      id: 6,
      title: 'Tạo Video',
      icon: '🎬',
      desc: 'Tạo video ngắn từ ảnh hoặc từ Prompt.',
      prompt: 'Tạo video từ mô tả sau.\n\nThêm:\n• Camera movement (pan, dolly, tilt)\n• Cinematic lighting\n• Smooth motion\n• Realistic physics\n\nMô tả: [ĐIỀN MÔ TẢ VIDEO]',
      tip: '💡 Mẹo: Thêm "slow motion" hoặc "dramatic camera movement" để video ấn tượng hơn.'
    },
    {
      id: 7,
      title: 'Đưa Sang Canva',
      icon: '🎯',
      desc: 'Import ảnh/video AI vào Canva để thiết kế poster hoặc social media post.',
      example: 'Mở Canva → Chọn template → Upload ảnh AI → Thêm text & logo → Xuất file PNG/MP4.',
      tip: '💡 Mẹo: Dùng tính năng "Magic Resize" của Canva để chuyển đổi kích thước cho nhiều nền tảng.'
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

    // Bind step dots
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

    content.innerHTML = `
      <div class="card card-no-hover fade-up" style="margin-top:var(--space-xl);max-width:800px;margin-left:auto;margin-right:auto;">
        <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-xl);">
          <span style="font-size:2rem;">${step.icon}</span>
          <div>
            <span class="badge badge-primary">Bước ${step.id}/7</span>
            <h3 class="heading-3" style="margin-top:var(--space-xs);">${step.title}</h3>
          </div>
        </div>
        
        <p class="body-md text-secondary" style="margin-bottom:var(--space-xl);line-height:1.8;">${step.desc}</p>

        ${step.prompt ? `
          <div class="code-block" style="margin-bottom:var(--space-lg);">
            <div class="code-block-header">
              <span>📋 Prompt mẫu</span>
              <button class="copy-btn" onclick="Practice.copyPrompt(${index});Utils.showToast('Đã copy!');" aria-label="Copy prompt">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                Copy
              </button>
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

        ${step.placeholder ? `
          <div style="margin-bottom:var(--space-lg);">
            <textarea class="glass" style="width:100%;min-height:120px;padding:var(--space-lg);resize:vertical;line-height:1.8;font-size:var(--fs-base);" placeholder="${step.placeholder}" aria-label="Nhập nội dung thực hành"></textarea>
          </div>
        ` : ''}

        <div class="card glass-subtle" style="display:flex;align-items:flex-start;gap:var(--space-sm);margin-bottom:var(--space-xl);">
          <span style="font-size:1.2rem;">💡</span>
          <p class="body-sm text-secondary">${step.tip.replace('💡 ', '')}</p>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;">
          <button class="btn btn-secondary" ${index === 0 ? 'disabled' : ''} onclick="Practice.prevStep()" aria-label="Bước trước">
            ← Bước trước
          </button>
          <button class="btn btn-primary" ${index === this.STEPS.length - 1 ? 'disabled' : ''} onclick="Practice.nextStep()" aria-label="Bước tiếp">
            Bước tiếp →
          </button>
        </div>
      </div>
    `;

    // Update progress dots
    Utils.$$('.practice-step-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
      dot.classList.toggle('completed', i < index);
      dot.setAttribute('aria-selected', i === index);
    });
    Utils.$$('.practice-step-line').forEach((line, i) => {
      line.classList.toggle('completed', i < index);
    });
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
  },

  copyPrompt(index) {
    const step = this.STEPS[index];
    if (step && step.prompt) {
      Utils.copyToClipboard(step.prompt);
    }
  }
};

window.Practice = Practice;
