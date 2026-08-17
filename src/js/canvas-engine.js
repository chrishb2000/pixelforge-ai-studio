/* Fabric.js Canvas Engine Wrapper */
const CanvasEngine = {
  canvas: null,
  currentDpi: 72,
  isTransparentBg: false,

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
      this.canvas.setBackgroundColor('#ffffff', () => this.canvas.renderAll());
    }

    const wrapper = document.getElementById('canvas-wrapper');
    if (wrapper) {
      wrapper.style.width = width + 'px';
      wrapper.style.height = height + 'px';
    }

    const dimText = document.getElementById('canvas-dimensions-text');
    if (dimText) {
      dimText.textContent = `Resolución: ${width} x ${height} px (${dpi} DPI)`;
    }

    const exportInfo = document.getElementById('export-info-text');
    if (exportInfo) {
      exportInfo.textContent = `Dimensiones: ${width} x ${height} px @ ${dpi} DPI / PPX`;
    }

    this.fitCanvasToViewport();
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
    if (noSelMsg) noSelMsg.style.display = 'none';
    if (selInspector) selInspector.style.display = 'flex';
  },

  onSelectionCleared() {
    const noSelMsg = document.getElementById('no-selection-msg');
    const selInspector = document.getElementById('selection-inspector');
    if (noSelMsg) noSelMsg.style.display = 'block';
    if (selInspector) selInspector.style.display = 'none';
  },

  addHeadingText() {
    const text = new fabric.IText('Título Principal', {
      left: this.canvas.width / 2 - 150,
      top: this.canvas.height / 2 - 40,
      fontFamily: 'Montserrat',
      fontSize: Math.round(this.canvas.height * 0.06),
      fontWeight: 'bold',
      fill: '#ffffff',
      shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 15, offsetX: 3, offsetY: 5 })
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  },

  addSubheadingText() {
    const text = new fabric.IText('Subtítulo Destacado', {
      left: this.canvas.width / 2 - 120,
      top: this.canvas.height / 2 + 40,
      fontFamily: 'Poppins',
      fontSize: Math.round(this.canvas.height * 0.035),
      fontWeight: '600',
      fill: '#f8fafc'
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  },

  addBodyText() {
    const text = new fabric.IText('Escribe tu texto de ejemplo aquí...', {
      left: this.canvas.width / 2 - 140,
      top: this.canvas.height / 2 + 100,
      fontFamily: 'Inter',
      fontSize: Math.round(this.canvas.height * 0.025),
      fill: '#94a3b8'
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  },

  addRectangle() {
    const size = Math.round(this.canvas.width * 0.15);
    const rect = new fabric.Rect({
      left: this.canvas.width / 2 - size / 2,
      top: this.canvas.height / 2 - size / 2,
      width: size,
      height: size,
      fill: '#6366f1',
      rx: 12,
      ry: 12
    });
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
  },

  addCircle() {
    const radius = Math.round(this.canvas.width * 0.08);
    const circle = new fabric.Circle({
      left: this.canvas.width / 2 - radius,
      top: this.canvas.height / 2 - radius,
      radius: radius,
      fill: '#a855f7'
    });
    this.canvas.add(circle);
    this.canvas.setActiveObject(circle);
  },

  addBadge() {
    const width = Math.round(this.canvas.width * 0.18);
    const height = Math.round(this.canvas.height * 0.06);
    const group = new fabric.Group([
      new fabric.Rect({
        width: width,
        height: height,
        fill: '#ef4444',
        rx: height / 2,
        ry: height / 2
      }),
      new fabric.Text('¡NUEVO PROMO!', {
        fontSize: Math.round(height * 0.4),
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#ffffff',
        originX: 'center',
        originY: 'center',
        left: width / 2,
        top: height / 2
      })
    ], {
      left: this.canvas.width / 2 - width / 2,
      top: this.canvas.height / 2 - height / 2
    });
    this.canvas.add(group);
    this.canvas.setActiveObject(group);
  },

  addArrow() {
    const triangle = new fabric.Triangle({
      width: Math.round(this.canvas.width * 0.05),
      height: Math.round(this.canvas.width * 0.05),
      fill: '#10b981',
      angle: 90,
      left: this.canvas.width / 2,
      top: this.canvas.height / 2
    });
    this.canvas.add(triangle);
    this.canvas.setActiveObject(triangle);
  },

  setBackgroundImage(dataUrl, fitMode = 'fit') {
    fabric.Image.fromURL(dataUrl, (img) => {
      let scale;
      if (fitMode === 'fill') {
        const scaleX = this.canvas.width / img.width;
        const scaleY = this.canvas.height / img.height;
        scale = Math.max(scaleX, scaleY);
      } else if (fitMode === 'fit') {
        const scaleX = this.canvas.width / img.width;
        const scaleY = this.canvas.height / img.height;
        scale = Math.min(scaleX, scaleY);
      } else {
        scale = 1;
      }

      img.set({
        originX: 'center',
        originY: 'center',
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        scaleX: scale,
        scaleY: scale
      });

      this.canvas.add(img);
      this.canvas.sendToBack(img);
      this.canvas.setActiveObject(img);
      this.canvas.renderAll();
    });
  },

  bringForward() {
    const active = this.canvas.getActiveObject();
    if (active) {
      this.canvas.bringForward(active);
      this.canvas.renderAll();
    }
  },

  sendBackward() {
    const active = this.canvas.getActiveObject();
    if (active) {
      this.canvas.sendBackwards(active);
      this.canvas.renderAll();
    }
  },

  duplicateActive() {
    const active = this.canvas.getActiveObject();
    if (active) {
      active.clone((cloned) => {
        cloned.set({
          left: active.left + 20,
          top: active.top + 20
        });
        this.canvas.add(cloned);
        this.canvas.setActiveObject(cloned);
        this.canvas.renderAll();
      });
    }
  },

  deleteActive() {
    const active = this.canvas.getActiveObject();
    if (active) {
      this.canvas.remove(active);
      this.canvas.discardActiveObject();
      this.canvas.renderAll();
    }
  },

  clear() {
    this.canvas.clear();
    if (this.isTransparentBg) {
      this.canvas.setBackgroundColor(null, () => this.canvas.renderAll());
    } else {
      this.canvas.setBackgroundColor('#ffffff', () => this.canvas.renderAll());
    }
  }
};

window.CanvasEngine = CanvasEngine;
