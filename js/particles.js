/* ============================================
   PARTICLES — AI Gemini Presentation
   Canvas particle system for hero section
   ============================================ */

const Particles = {
  canvas: null,
  ctx: null,
  particles: [],
  mouse: { x: -1000, y: -1000 },
  animId: null,
  isActive: false,
  config: {
    count: 60,
    maxDist: 150,
    speed: 0.3,
    radius: { min: 1, max: 3 },
    colors: [
      'rgba(108, 99, 255, 0.6)',
      'rgba(79, 209, 197, 0.5)',
      'rgba(255, 184, 77, 0.4)',
      'rgba(255, 255, 255, 0.3)'
    ]
  },

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'hero-canvas';
    this.canvas.setAttribute('aria-hidden', 'true');
    container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // Defer to ensure layout is ready
    requestAnimationFrame(() => {
      this.resize();
      this.createParticles();
      this.bindEvents();
      this.isActive = true;
      this.animate();
    });
  },

  resize() {
    if (!this.canvas || !this.canvas.parentElement || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.parentElement.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
    this.ctx.scale(dpr, dpr);
    this.width = rect.width;
    this.height = rect.height;
  },

  createParticles() {
    this.particles = [];
    // Reduce count on mobile
    const count = window.innerWidth < 768 ? 30 : this.config.count;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * this.config.speed,
        vy: (Math.random() - 0.5) * this.config.speed,
        r: this.config.radius.min + Math.random() * (this.config.radius.max - this.config.radius.min),
        color: this.config.colors[Math.floor(Math.random() * this.config.colors.length)],
        pulse: Math.random() * Math.PI * 2
      });
    }
  },

  bindEvents() {
    const throttledResize = Utils.throttle(() => {
      this.resize();
      this.createParticles();
    }, 300);

    window.addEventListener('resize', throttledResize);

    Utils.addPassiveEvent(this.canvas, 'mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    Utils.addPassiveEvent(this.canvas, 'mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });
  },

  animate() {
    if (!this.isActive || !this.ctx || !this.width || !this.height) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update & draw particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap around
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      // Mouse repel
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.5;
        p.x -= dx * force * 0.02;
        p.y -= dy * force * 0.02;
      }

      // Draw particle
      const pulseR = p.r + Math.sin(p.pulse) * 0.5;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, Math.max(0.5, pulseR), 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    }

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.maxDist) {
          const alpha = (1 - dist / this.config.maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);

          const gradient = this.ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          gradient.addColorStop(0, `rgba(108, 99, 255, ${alpha})`);
          gradient.addColorStop(1, `rgba(79, 209, 197, ${alpha})`);
          this.ctx.strokeStyle = gradient;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    // Easter egg: Render "120408" very subtly
    this.ctx.save();
    this.ctx.font = `bold ${this.height * 0.15}px "Space Grotesk", sans-serif`;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = 'rgba(108, 99, 255, 0.015)';
    this.ctx.fillText('120408', this.width / 2, this.height / 2 + this.height * 0.25);
    this.ctx.restore();

    this.animId = requestAnimationFrame(() => this.animate());
  },

  pause() {
    this.isActive = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  },

  resume() {
    if (!this.isActive) {
      this.isActive = true;
      this.animate();
    }
  },

  destroy() {
    this.pause();
    if (this.canvas && this.canvas.parentElement) {
      this.canvas.parentElement.removeChild(this.canvas);
    }
  }
};

window.Particles = Particles;
