/* ============================================
   DEMO — AI Gemini Presentation
   Step-by-step AI simulation
   ============================================ */

const Demo = {
  currentStep: 0,
  isAnimating: false,

  STEPS: [
    {
      type: 'user-input',
      label: 'Bạn nhập ý tưởng',
      text: 'Tôi muốn một bức ảnh cô gái Việt Nam mặc áo dài trắng, đứng bên hồ sen lúc hoàng hôn, lãng mạn.',
    },
    {
      type: 'ai-response',
      label: 'Gemini phân tích',
      text: 'Tôi sẽ giúp bạn tạo một Prompt chuyên nghiệp từ ý tưởng này. Đợi tôi bổ sung các chi tiết về ánh sáng, góc máy, phong cách và chất lượng...',
    },
    {
      type: 'prompt-gen',
      label: 'Gemini tạo Prompt',
      text: 'A young Vietnamese woman wearing a flowing white áo dài with delicate lotus embroidery, standing gracefully beside a tranquil lotus pond at golden hour. Warm amber sunlight filtering through willow branches, creating soft bokeh and lens flares. Pink lotus flowers in full bloom surrounding her. Shot from a medium-low angle, 85mm portrait lens, f/1.8, shallow depth of field. Cinematic color grading with warm golden tones and soft pink highlights. Ultra-realistic, 8K resolution, professional editorial fashion photography.',
    },
    {
      type: 'image-gen',
      label: 'AI tạo hình ảnh',
      src: 'images/edit_1.png',
      text: 'Đang tạo hình ảnh từ Prompt...',
      gradient: 'linear-gradient(135deg, #FFB84D 0%, #F472B6 40%, #6C63FF 70%, #4FD1C5 100%)'
    },
    {
      type: 'edit',
      label: 'Yêu cầu chỉnh sửa',
      text: 'Giữ nguyên mọi thứ, chỉ thêm những cánh hoa sen rơi nhẹ trong gió và phản chiếu ánh hoàng hôn trên mặt nước.',
    },
    {
      type: 'final',
      label: 'Sản phẩm hoàn chỉnh',
      src: 'images/edit_1.png',
      text: 'Hoàn thành! Bạn có thể tải ảnh về và đưa sang Canva để tạo poster.',
      gradient: 'linear-gradient(135deg, #4FD1C5 0%, #6C63FF 50%, #FFB84D 100%)'
    }
  ],

  init(containerId = 'demo-container') {
    const container = Utils.$(`#${containerId}`);
    if (!container) return;

    container.innerHTML = `
      <div class="chat-container" id="demo-chat" role="log" aria-label="Demo mô phỏng AI" aria-live="polite">
      </div>
      <div style="text-align:center;margin-top:var(--space-xl);" id="demo-controls">
        <button class="btn btn-primary" id="demo-next-btn" aria-label="Bước tiếp theo">
          Bắt đầu Demo ▶
        </button>
        <button class="btn btn-secondary" id="demo-reset-btn" style="display:none;" aria-label="Bắt đầu lại">
          🔄 Bắt đầu lại
        </button>
      </div>
    `;

    this.currentStep = 0;

    const nextBtn = Utils.$('#demo-next-btn');
    const resetBtn = Utils.$('#demo-reset-btn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => this.nextStep());
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.reset(containerId));
    }
  },

  async nextStep() {
    if (this.isAnimating || this.currentStep >= this.STEPS.length) return;
    this.isAnimating = true;

    const step = this.STEPS[this.currentStep];
    const chat = Utils.$('#demo-chat');
    const nextBtn = Utils.$('#demo-next-btn');
    if (!chat) return;

    // Add step label
    const label = Utils.createElement('div', {
      className: 'fade-up',
      style: { textAlign: 'center', margin: '0.5rem 0' },
      innerHTML: `<span class="badge badge-primary" style="font-size:0.65rem;">${step.label}</span>`
    });
    chat.appendChild(label);
    await Utils.wait(100);
    label.classList.add('anim-visible');

    switch (step.type) {
      case 'user-input':
      case 'edit': {
        const bubble = Utils.createElement('div', {
          className: 'chat-bubble chat-user fade-up'
        });
        chat.appendChild(bubble);
        await Utils.wait(200);
        bubble.classList.add('anim-visible');
        await Utils.typeText(bubble, step.text, 25);
        break;
      }

      case 'ai-response': {
        // Typing indicator
        const typing = Utils.createElement('div', {
          className: 'chat-bubble chat-ai',
          innerHTML: `<div class="chat-typing-indicator">
            <div class="chat-typing-dot"></div>
            <div class="chat-typing-dot"></div>
            <div class="chat-typing-dot"></div>
          </div>`
        });
        chat.appendChild(typing);
        await Utils.wait(1500);

        typing.innerHTML = '';
        await Utils.streamText(typing, step.text, 20);
        break;
      }

      case 'prompt-gen': {
        // Typing indicator first
        const typing2 = Utils.createElement('div', {
          className: 'chat-bubble chat-ai',
          innerHTML: `<div class="chat-typing-indicator">
            <div class="chat-typing-dot"></div>
            <div class="chat-typing-dot"></div>
            <div class="chat-typing-dot"></div>
          </div>`
        });
        chat.appendChild(typing2);
        await Utils.wait(1000);

        // Replace with code block
        typing2.innerHTML = '';
        typing2.style.fontFamily = 'var(--font-mono)';
        typing2.style.fontSize = 'var(--fs-sm)';
        typing2.style.lineHeight = '1.8';
        typing2.style.background = 'rgba(0,0,0,0.4)';
        typing2.style.border = '1px solid rgba(108,99,255,0.2)';
        await Utils.streamText(typing2, step.text, 12);

        // Add copy button
        const copyBtn = Utils.createElement('button', {
          className: 'copy-btn',
          style: { marginTop: '0.5rem' },
          innerHTML: '📋 Copy Prompt',
          onClick: () => {
            Utils.copyToClipboard(step.text);
            Utils.showToast('Đã copy Prompt!');
          }
        });
        typing2.appendChild(copyBtn);
        break;
      }

      case 'image-gen': {
        const loading = Utils.createElement('div', {
          className: 'fade-up',
          style: { textAlign: 'center', padding: '1rem' }
        });
        loading.innerHTML = `
          <div class="img-placeholder scale-in" style="max-width:400px;margin:0 auto;${step.src ? `background:url('${step.src}') center/cover no-repeat;` : `background:${step.gradient};`}aspect-ratio:4/3;border-radius:var(--radius-lg);overflow:hidden;">
            ${!step.src ? `
            <div style="text-align:center;z-index:1;position:relative;">
              <div class="animate-pulse" style="font-size:2rem;margin-bottom:0.5rem;">🎨</div>
              <span class="body-sm">Đang tạo hình ảnh...</span>
            </div>
            ` : ''}
          </div>
        `;
        chat.appendChild(loading);
        await Utils.wait(300);
        loading.classList.add('anim-visible');
        await Utils.wait(2000);

        // Replace with "completed"
        const pulse = loading.querySelector('.animate-pulse');
        if (pulse) pulse.textContent = '✨';
        const txt = loading.querySelector('.body-sm');
        if (txt) txt.textContent = 'Hình ảnh đã được tạo!';
        break;
      }

      case 'final': {
        const final = Utils.createElement('div', {
          className: 'fade-up',
          style: { textAlign: 'center', padding: '1rem' }
        });
        final.innerHTML = `
          <div class="card glass-strong scale-in" style="max-width:400px;margin:0 auto;text-align:center;padding:var(--space-2xl);">
            <div class="img-placeholder" style="${step.src ? `background:url('${step.src}') center/cover no-repeat;` : `background:${step.gradient};`}aspect-ratio:4/3;margin-bottom:var(--space-lg);border-radius:var(--radius-lg);overflow:hidden;">
              ${!step.src ? `
              <div style="text-align:center;z-index:1;position:relative;">
                <span style="font-size:3rem;">🖼️</span>
              </div>
              ` : ''}
            </div>
            <h4 class="heading-4" style="margin-bottom:var(--space-sm);">✅ Hoàn thành!</h4>
            <p class="body-sm text-secondary">${step.text}</p>
          </div>
        `;
        chat.appendChild(final);
        await Utils.wait(300);
        final.classList.add('anim-visible');
        break;
      }
    }

    // Scroll to bottom
    chat.scrollTop = chat.scrollHeight;

    this.currentStep++;
    this.isAnimating = false;

    // Update button
    if (nextBtn) {
      if (this.currentStep >= this.STEPS.length) {
        nextBtn.style.display = 'none';
        const resetBtn = Utils.$('#demo-reset-btn');
        if (resetBtn) resetBtn.style.display = '';
      } else {
        nextBtn.textContent = 'Bước tiếp →';
      }
    }
  },

  reset(containerId) {
    this.currentStep = 0;
    this.init(containerId);
  }
};

window.Demo = Demo;
