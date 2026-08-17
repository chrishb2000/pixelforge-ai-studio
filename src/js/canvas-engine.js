/* Fabric.js Canvas Engine Wrapper */
const CanvasEngine = {
  canvas: null,
  currentDpi: 72,
  isTransparentBg: false,
  currentImageObject: null,
  currentZoomScale: 1.0,

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

  applyZoomScale(scale) {
    this.currentZoomScale = Math.min(Math.max(scale, 0.05), 5.0);
    const wrapper = document.getElementById('canvas-wrapper');
    if (wrapper) {
      wrapper.style.transform = `scale(${this.currentZoomScale})`;
      wrapper.style.transformOrigin = 'center center';
    }

    const zoomText = document.getElementById('zoom-level-text');
    if (zoomText) {
      zoomText.textContent = `${Math.round(this.currentZoomScale * 100)}%`;
    }
  },

  zoomIn() {
    this.applyZoomScale(this.currentZoomScale + 0.10);
  },

  zoomOut() {
    this.applyZoomScale(this.currentZoomScale - 0.10);
  },

  zoomFit() {
    this.fitCanvasToViewport();
  },

  fitCanvasToViewport() {
    const viewport = document.querySelector('.canvas-viewport');
    if (!viewport) return;

    const availableWidth = viewport.clientWidth - 80;
    const availableHeight = viewport.clientHeight - 80;

    const scaleX = availableWidth / this.canvas.width;
    const scaleY = availableHeight / this.canvas.height;
    const scale = Math.min(scaleX, scaleY, 1);

    this.applyZoomScale(scale);
  },

  bindEvents() {
    this.canvas.on('selection:created', (e) => this.onSelectionChange(e.selected[0]));
    this.canvas.on('selection:updated', (e) => this.onSelectionChange(e.selected[0]));
    this.canvas.on('selection:cleared', () => this.onSelectionCleared());
    this.canvas.on('object:modified', (e) => this.onSelectionChange(e.target));
    this.canvas.on('object:scaling', (e) => this.onSelectionChange(e.target));
    this.canvas.on('object:rotating', (e) => this.onSelectionChange(e.target));

    window.addEventListener('resize', () => this.fitCanvasToViewport());
  },

  onSelectionChange(obj) {
    const noSelMsg = document.getElementById('no-selection-msg');
    const selInspector = document.getElementById('selection-inspector');
    const imgPropsText = document.getElementById('img-props-text');

    if (noSelMsg) noSelMsg.style.display = 'none';
    if (selInspector) selInspector.style.display = 'flex';

    if (imgPropsText && obj) {
      const w = Math.round(obj.width * Math.abs(obj.scaleX));
      const h = Math.round(obj.height * Math.abs(obj.scaleY));
      const angle = Math.round(obj.angle || 0);
      imgPropsText.textContent = `Tamaño: ${w} x ${h} px | Ángulo: ${angle}° | Posición: (${Math.round(obj.left)}, ${Math.round(obj.top)})`;
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
      
      // Add interactive control styles
      img.set({
        cornerColor: '#6366f1',
        cornerStyle: 'circle',
        transparentCorners: false,
        cornerSize: 14,
        borderColor: '#6366f1',
        borderDashArray: [4, 4],
        padding: 6
      });

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
      scaleY: scale,
      angle: 0
    });

    this.onSelectionChange(img);
    this.canvas.renderAll();
  },

  rotateActiveImage(angleDegrees) {
    const active = this.canvas.getActiveObject() || this.currentImageObject;
    if (active) {
      const currentAngle = active.angle || 0;
      active.set('angle', (currentAngle + angleDegrees) % 360);
      this.onSelectionChange(active);
      this.canvas.renderAll();
    }
  },

  flipActiveImage(axis) {
    const active = this.canvas.getActiveObject() || this.currentImageObject;
    if (active) {
      if (axis === 'horizontal') {
        active.set('flipX', !active.flipX);
      } else if (axis === 'vertical') {
        active.set('flipY', !active.flipY);
      }
      this.onSelectionChange(active);
      this.canvas.renderAll();
    }
  },

  scaleActiveImage(multiplier) {
    const active = this.canvas.getActiveObject() || this.currentImageObject;
    if (active) {
      active.set({
        scaleX: active.scaleX * multiplier,
        scaleY: active.scaleY * multiplier
      });
      this.onSelectionChange(active);
      this.canvas.renderAll();
    }
  },

  centerActiveImage() {
    const active = this.canvas.getActiveObject() || this.currentImageObject;
    if (active) {
      active.set({
        originX: 'center',
        originY: 'center',
        left: this.canvas.width / 2,
        top: this.canvas.height / 2
      });
      this.canvas.setActiveObject(active);
      this.onSelectionChange(active);
      this.canvas.renderAll();
    }
  },

  selectActiveImage() {
    if (this.currentImageObject) {
      this.canvas.setActiveObject(this.currentImageObject);
      this.onSelectionChange(this.currentImageObject);
      this.canvas.renderAll();
    } else {
      const objects = this.canvas.getObjects();
      if (objects.length > 0) {
        this.canvas.setActiveObject(objects[0]);
        this.onSelectionChange(objects[0]);
        this.canvas.renderAll();
      }
    }
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
