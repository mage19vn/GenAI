/* ============================================
   UTILS — AI Gemini Presentation
   ============================================ */

const Utils = {
  // --- Query Selectors ---
  $(selector, parent = document) {
    return parent.querySelector(selector);
  },

  $$(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
  },

  // --- Debounce ---
  debounce(fn, delay = 250) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // --- Throttle ---
  throttle(fn, limit = 100) {
    let inThrottle = false;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  // --- Copy to Clipboard ---
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    }
  },

  // --- Show Toast ---
  showToast(message, type = 'success') {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;

    // Force reflow for re-animation
    toast.offsetHeight;
    toast.classList.add('visible');

    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2500);
  },

  // --- Counter Animation ---
  animateCounter(el, target, duration = 1500) {
    const start = performance.now();
    const from = 0;
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.round(from + (target - from) * eased);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  // --- Typing Effect ---
  typeText(el, text, speed = 30) {
    return new Promise((resolve) => {
      el.textContent = '';
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text[i];
          i++;
          setTimeout(type, speed);
        } else {
          resolve();
        }
      };
      type();
    });
  },

  // --- Streaming Text Effect ---
  async streamText(el, text, speed = 15) {
    el.innerHTML = '';
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      el.innerHTML += (i > 0 ? ' ' : '') + words[i];
      el.scrollTop = el.scrollHeight;
      await new Promise(r => setTimeout(r, speed + Math.random() * 20));
    }
  },

  // --- Create Element ---
  createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    for (const [key, val] of Object.entries(attrs)) {
      if (key === 'className') el.className = val;
      else if (key === 'innerHTML') el.innerHTML = val;
      else if (key === 'textContent') el.textContent = val;
      else if (key.startsWith('on')) el.addEventListener(key.slice(2).toLowerCase(), val);
      else if (key === 'style' && typeof val === 'object') Object.assign(el.style, val);
      else if (key === 'dataset') Object.assign(el.dataset, val);
      else el.setAttribute(key, val);
    }
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    });
    return el;
  },

  // --- Local Storage ---
  storage: {
    get(key, defaultVal = null) {
      try {
        const val = localStorage.getItem(`aigen_${key}`);
        return val !== null ? JSON.parse(val) : defaultVal;
      } catch { return defaultVal; }
    },
    set(key, val) {
      try { localStorage.setItem(`aigen_${key}`, JSON.stringify(val)); }
      catch { /* quota exceeded */ }
    }
  },

  // --- Passive Event ---
  addPassiveEvent(el, event, handler) {
    el.addEventListener(event, handler, { passive: true });
  },

  // --- Escape HTML ---
  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // --- Wait ---
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // --- Random ID ---
  uid() {
    return '_' + Math.random().toString(36).slice(2, 9);
  }
};

window.Utils = Utils;
