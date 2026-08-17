/* Fabric.js Canvas Engine Wrapper */
const CanvasEngine = {
  canvas: null,
  currentDpi: 72,
  isTransparentBg: false,
  currentImageObject: null,

  init(canvasId) {
    this.canvas = new fabric.Canvas(canvasId, {
      preserveObjectStacking: true,
      backgroundColor: '#ffffff'
    });

    this.setPresetResolution(1920, 1080, 72);
    this.bindEvents();
  },

  setPresetResolution(width, height, dpi = 72) {
    this.currentDpi = dpi;
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);

    if (this.isTransparentBg) {
      this.canvas.setBackgroundColor(null, () => this.canvas.renderAll());
    } else {
      const pickerColor = document.getElementById('canvas-bg-color-picker')?.value || '#ffffff';
      this.canvas.setBackgroundColor(pickerColor, () => this.canvas.renderAll());
    }

    const wrapper = document.getElementById('canvas-wrapper');
    if (wrapper) {
      wrapper.style.width = width + 'px';
      wrapper.style.height = height + 'px';
    }

    // Sync input fields if available
    const sideW = document.getElementById('sidebar-width-input');
    const sideH = document.getElementById('sidebar-height-input');
    const sideDpi = document.getElementById('sidebar-dpi-select');
    if (sideW) sideW.value = width;
    if (sideH) sideH.value = height;
    if (sideDpi) sideDpi.value = dpi;

    const dimText = document.getElementById('canvas-dimensions-text');
    if (dimText) {
      dimText.textContent = `Resolución: ${width} x ${height} px (${dpi} DPI)`;
    }

    const exportInfo = document.getElementById('export-info-text');
    if (exportInfo) {
      exportInfo.textContent = `Dimensiones del Lienzo: ${width} x ${height} px @ ${dpi} DPI / PPX`;
    }

    this.fitCanvasToViewport();
    if (this.currentImageObject) {
      this.fitCurrentImage('fit');
    }
    this.canvas.renderAll();
  },

  setTransparentBackground(isTransparent) {
    this.isTransparentBg = isTransparent;
    const wrapper = document.getElementById('canvas-wrapper');
    const statusText = document.getElementById('transparency-status-text');

    if (isTransparent) {
      this.canvas.setBackgroundColor(null, () => this.canvas.renderAll());
      if (wrapper) wrapper.classList.add('transparent-bg');
      if (statusText) {
        statusText.textContent = 'ON (PNG Alfa)';
        statusText.style.color = 'var(--success-color)';
      }
    } else {
      const pickerColor = document.getElementById('canvas-bg-color-picker')?.value || '#ffffff';
      this.canvas.setBackgroundColor(pickerColor, () => this.canvas.renderAll());
      if (wrapper) wrapper.classList.remove('transparent-bg');
      if (statusText) {
        statusText.textContent = 'OFF';
        statusText.style.color = 'inherit';
      }
    }
  },

  setCanvasBackgroundColor(colorHex) {
    this.isTransparentBg = false;
    const wrapper = document.getElementById('canvas-wrapper');
    const statusText = document.getElementById('transparency-status-text');
    if (wrapper) wrapper.classList.remove('transparent-bg');
    if (statusText) {
      statusText.textContent = 'OFF';
      statusText.style.color = 'inherit';
    }

    this.canvas.setBackgroundColor(colorHex, () => this.canvas.renderAll());
  },

  fitCanvasToViewport() {
    const viewport = document.querySelector('.canvas-viewport');
    if (!viewport) return;

    const availableWidth = viewport.clientWidth - 80;
    const availableHeight = viewport.clientHeight - 80;

    const scaleX = availableWidth / this.canvas.width;
    const scaleY = availableHeight / this.canvas.height;
    const scale = Math.min(scaleX, scaleY, 1);

    const wrapper = document.getElementById('canvas-wrapper');
    if (wrapper) {
      wrapper.style.transform = `scale(${scale})`;
      wrapper.style.transformOrigin = 'center center';
    }

    const zoomText = document.getElementById('zoom-level-text');
    if (zoomText) {
      zoomText.textContent = `${Math.round(scale * 100)}%`;
    }
  },

  bindEvents() {
    this.canvas.on('selection:created', (e) => this.onSelectionChange(e.selected[0]));
    this.canvas.on('selection:updated', (e) => this.onSelectionChange(e.selected[0]));
    this.canvas.on('selection:cleared', () => this.onSelectionCleared());
  },

  onSelectionChange(obj) {
    const noSelMsg = document.getElementById('no-selection-msg');
    const selInspector = document.getElementById('selection-inspector');
    const imgPropsText = document.getElementById('img-props-text');

    if (noSelMsg) noSelMsg.style.display = 'none';
    if (selInspector) selInspector.style.display = 'flex';

    if (imgPropsText && obj) {
      const w = Math.round(obj.width * obj.scaleX);
      const h = Math.round(obj.height * obj.scaleY);
      imgPropsText.textContent = `Tamaño: ${w} x ${h} px | Posición: (${Math.round(obj.left)}, ${Math.round(obj.top)})`;
    }
  },

  onSelectionCleared() {
    const noSelMsg = document.getElementById('no-selection-msg');
    const selInspector = document.getElementById('selection-inspector');
    if (noSelMsg) noSelMsg.style.display = 'block';
    if (selInspector) selInspector.style.display = 'none';
  },

  setBackgroundImage(dataUrl, fitMode = 'fit') {
    // Remove previous background image if exists
    if (this.currentImageObject) {
      this.canvas.remove(this.currentImageObject);
    }

    fabric.Image.fromURL(dataUrl, (img) => {
      this.currentImageObject = img;
      this.fitCurrentImage(fitMode);

      this.canvas.add(img);
      this.canvas.setActiveObject(img);
      this.canvas.renderAll();
    });
  },

  fitCurrentImage(fitMode = 'fit') {
    if (!this.currentImageObject) return;
    const img = this.currentImageObject;

    let scale = 1;
    if (fitMode === 'fill') {
      const scaleX = this.canvas.width / img.width;
      const scaleY = this.canvas.height / img.height;
      scale = Math.max(scaleX, scaleY);
    } else if (fitMode === 'fit') {
      const scaleX = this.canvas.width / img.width;
      const scaleY = this.canvas.height / img.height;
      scale = Math.min(scaleX, scaleY);
    }

    img.set({
      originX: 'center',
      originY: 'center',
      left: this.canvas.width / 2,
      top: this.canvas.height / 2,
      scaleX: scale,
      scaleY: scale
    });

    this.onSelectionChange(img);
    this.canvas.renderAll();
  },

  deleteActive() {
    const active = this.canvas.getActiveObject();
    if (active) {
      if (active === this.currentImageObject) {
        this.currentImageObject = null;
      }
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  },

  clear() {
    this.canvas.clear();
    this.currentImageObject = null;
    if (this.isTransparentBg) {
      this.canvas.setBackgroundColor(null, () => this.canvas.renderAll());
    } else {
      const pickerColor = document.getElementById('canvas-bg-color-picker')?.value || '#ffffff';
      this.canvas.setBackgroundColor(pickerColor, () => this.canvas.renderAll());
    }
  }
};

window.CanvasEngine = CanvasEngine;
