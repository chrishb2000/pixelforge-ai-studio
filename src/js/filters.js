/* Photo Filters and Color Grading Module */
const FiltersManager = {
  applyPreset(presetName) {
    const active = CanvasEngine.canvas.getActiveObject();
    if (!active || active.type !== 'image') {
      alert('Por favor selecciona una imagen para aplicar filtros fotográficos.');
      return;
    }

    active.filters = []; // Clear existing fabric filters

    if (presetName === 'cyberpunk') {
      active.filters.push(new fabric.Image.filters.BlendColor({ color: '#ff0055', mode: 'tint', alpha: 0.2 }));
      active.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.2 }));
    } else if (presetName === 'vintage') {
      active.filters.push(new fabric.Image.filters.Sepia());
      active.filters.push(new fabric.Image.filters.Contrast({ contrast: 0.1 }));
    } else if (presetName === 'golden') {
      active.filters.push(new fabric.Image.filters.BlendColor({ color: '#ffaa00', mode: 'tint', alpha: 0.25 }));
      active.filters.push(new fabric.Image.filters.Brightness({ brightness: 0.05 }));
    } else if (presetName === 'emerald') {
      active.filters.push(new fabric.Image.filters.BlendColor({ color: '#00cc88', mode: 'tint', alpha: 0.2 }));
    } else if (presetName === 'mono') {
      active.filters.push(new fabric.Image.filters.Grayscale());
    }

    active.applyFilters();
    CanvasEngine.canvas.renderAll();
  },

  applyAdjustments(brightnessVal, contrastVal, saturationVal, blurVal) {
    const active = CanvasEngine.canvas.getActiveObject();
    if (!active || active.type !== 'image') return;

    active.filters = [];

    if (brightnessVal !== 0) {
      active.filters.push(new fabric.Image.filters.Brightness({ brightness: brightnessVal / 100 }));
    }
    if (contrastVal !== 0) {
      active.filters.push(new fabric.Image.filters.Contrast({ contrast: contrastVal / 100 }));
    }
    if (saturationVal !== 0) {
      active.filters.push(new fabric.Image.filters.Saturation({ saturation: saturationVal / 100 }));
    }
    if (blurVal > 0) {
      active.filters.push(new fabric.Image.filters.Blur({ blur: blurVal / 20 }));
    }

    active.applyFilters();
    CanvasEngine.canvas.renderAll();
  }
};

window.FiltersManager = FiltersManager;
