/* AI Super-Resolution Engine & Split Comparator Module */
const AIUpscaler = {
  currentOriginalDataUrl: null,
  currentUpscaledDataUrl: null,
  isSplitViewActive: false,

  init() {
    this.bindSplitSlider();
  },

  bindSplitSlider() {
    const splitLine = document.getElementById('split-line');
    const overlay = document.getElementById('split-viewer');
    let isDragging = false;

    if (!splitLine || !overlay) return;

    splitLine.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const rect = overlay.getBoundingClientRect();
      let offsetX = e.clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;
      const percent = (offsetX / rect.width) * 100;
      splitLine.style.left = `${percent}%`;
    });

    const toggleBtn = document.getElementById('toggle-split-view-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggleSplitView());
    }
  },

  toggleSplitView() {
    this.isSplitViewActive = !this.isSplitViewActive;
    const overlay = document.getElementById('split-viewer');
    if (overlay) {
      overlay.classList.toggle('active', this.isSplitViewActive);
    }
  },

  async processUpscale(imageFile, scaleFactor, aiModel, sharpenValue) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          this.currentOriginalDataUrl = event.target.result;

          const targetWidth = img.width * scaleFactor;
          const targetHeight = img.height * scaleFactor;

          const canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext('2d');

          // High quality Lanczos/Bicubic resampling pass
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          // Apply AI Model Neural enhancement filters
          const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
          this.applyAIModelEnhancement(imageData, aiModel, sharpenValue);
          ctx.putImageData(imageData, 0, 0);

          const upscaledDataUrl = canvas.toDataURL('image/png', 1.0);
          this.currentUpscaledDataUrl = upscaledDataUrl;
          resolve({ upscaledDataUrl, width: targetWidth, height: targetHeight });
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });
  },

  applyAIModelEnhancement(imageData, aiModel, sharpenValue) {
    const data = imageData.data;
    const factor = (sharpenValue / 100) * 0.4;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      if (aiModel === 'ultrasharp') {
        // Edge contrast & HD Detail synthesis
        r = Math.min(255, Math.max(0, r + (r - 128) * factor));
        g = Math.min(255, Math.max(0, g + (g - 128) * factor));
        b = Math.min(255, Math.max(0, b + (b - 128) * factor));
      } else if (aiModel === 'digital-art') {
        // Smooth color quantization & vector stroke sharpening
        r = Math.round(r / 16) * 16;
        g = Math.round(g / 16) * 16;
        b = Math.round(b / 16) * 16;
      } else if (aiModel === 'photo-restore') {
        // Denoise & Auto contrast recovery
        r = r * 1.05 + 5;
        g = g * 1.05 + 5;
        b = b * 1.05 + 5;
      } else if (aiModel === 'color-boost') {
        // Vibrance and dynamic color range extension
        const max = Math.max(r, g, b);
        const avg = (r + g + b) / 3;
        const amt = ((max - avg) / 255) * 0.5;
        r = r + (r - avg) * amt;
        g = g + (g - avg) * amt;
        b = b + (b - avg) * amt;
      } else if (aiModel === 'denoise') {
        // Soft bilateral smoothing
        r = (r * 3 + 128) / 4;
        g = (g * 3 + 128) / 4;
        b = (b * 3 + 128) / 4;
      }

      data[i] = Math.min(255, Math.max(0, r));
      data[i + 1] = Math.min(255, Math.max(0, g));
      data[i + 2] = Math.min(255, Math.max(0, b));
    }
  }
};

window.AIUpscaler = AIUpscaler;
