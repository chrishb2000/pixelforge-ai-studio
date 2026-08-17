/* Fabric.js Canvas Engine Wrapper */
const CanvasEngine = {
  canvas: null,

  init(canvasId) {
    this.canvas = new fabric.Canvas(canvasId, {
      preserveObjectStacking: true,
      backgroundColor: '#ffffff'
    });

    this.setPresetResolution(1920, 1080);
    this.bindEvents();
  },

  setPresetResolution(width, height) {
    this.canvas.setWidth(width);
    this.canvas.setHeight(height);

    const wrapper = document.getElementById('canvas-wrapper');
    if (wrapper) {
      wrapper.style.width = width + 'px';
      wrapper.style.height = height + 'px';
    }

    const dimText = document.getElementById('canvas-dimensions-text');
    if (dimText) {
      dimText.textContent = `Resolución: ${width} x ${height} px`;
    }

    this.fitCanvasToViewport();
    this.canvas.renderAll();
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
      fontSize: 64,
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
      fontSize: 36,
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
      fontSize: 24,
      fill: '#94a3b8'
    });
    this.canvas.add(text);
    this.canvas.setActiveObject(text);
  },

  addRectangle() {
    const rect = new fabric.Rect({
      left: this.canvas.width / 2 - 100,
      top: this.canvas.height / 2 - 100,
      width: 200,
      height: 200,
      fill: '#6366f1',
      rx: 12,
      ry: 12
    });
    this.canvas.add(rect);
    this.canvas.setActiveObject(rect);
  },

  addCircle() {
    const circle = new fabric.Circle({
      left: this.canvas.width / 2 - 90,
      top: this.canvas.height / 2 - 90,
      radius: 90,
      fill: '#a855f7'
    });
    this.canvas.add(circle);
    this.canvas.setActiveObject(circle);
  },

  addBadge() {
    const group = new fabric.Group([
      new fabric.Rect({
        width: 180,
        height: 50,
        fill: '#ef4444',
        rx: 25,
        ry: 25
      }),
      new fabric.Text('¡NUEVO PROMO!', {
        fontSize: 16,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fill: '#ffffff',
        originX: 'center',
        originY: 'center',
        left: 90,
        top: 25
      })
    ], {
      left: this.canvas.width / 2 - 90,
      top: this.canvas.height / 2 - 25
    });
    this.canvas.add(group);
    this.canvas.setActiveObject(group);
  },

  addArrow() {
    const triangle = new fabric.Triangle({
      width: 40,
      height: 40,
      fill: '#10b981',
      angle: 90,
      left: this.canvas.width / 2,
      top: this.canvas.height / 2
    });
    this.canvas.add(triangle);
    this.canvas.setActiveObject(triangle);
  },

  setBackgroundImage(dataUrl) {
    fabric.Image.fromURL(dataUrl, (img) => {
      // Scale image to fit canvas nicely
      const scaleX = this.canvas.width / img.width;
      const scaleY = this.canvas.height / img.height;
      const scale = Math.min(scaleX, scaleY);

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
    this.canvas.setBackgroundColor('#ffffff', () => this.canvas.renderAll());
  }
};

window.CanvasEngine = CanvasEngine;
