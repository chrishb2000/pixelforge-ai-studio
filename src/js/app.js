/* Main Application Coordinator */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Modules
  ThemeManager.init();
  CanvasEngine.init('fabric-canvas');
  AIUpscaler.init();

  // Tab Navigation Handler
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.panel-section').forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      const targetPanel = document.getElementById(tabId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // Preset Resolution Selector
  const presetSelect = document.getElementById('canvas-preset');
  const customDimModal = document.getElementById('custom-dim-modal');
  const openCustomDimBtn = document.getElementById('open-custom-dim-btn');

  if (presetSelect) {
    presetSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (openCustomDimBtn) openCustomDimBtn.style.display = (val === 'custom') ? 'inline-flex' : 'none';

      if (val === 'youtube-thumb') CanvasEngine.setPresetResolution(1920, 1080, 72);
      else if (val === 'insta-post') CanvasEngine.setPresetResolution(1080, 1080, 72);
      else if (val === 'insta-story') CanvasEngine.setPresetResolution(1080, 1920, 72);
      else if (val === 'banner') CanvasEngine.setPresetResolution(1200, 400, 72);
      else if (val === 'custom-print') CanvasEngine.setPresetResolution(4500, 5400, 400);
      else if (val === 'custom') {
        customDimModal?.classList.add('active');
      }
    });
  }

  // Open Custom Dimensions Modal Button
  openCustomDimBtn?.addEventListener('click', () => {
    customDimModal?.classList.add('active');
  });

  // Apply Custom Dimensions Handler
  document.getElementById('apply-custom-dim-btn')?.addEventListener('click', () => {
    const width = parseInt(document.getElementById('custom-width-input').value) || 4500;
    const height = parseInt(document.getElementById('custom-height-input').value) || 5400;
    const dpi = parseInt(document.getElementById('custom-dpi-select').value) || 400;

    CanvasEngine.setPresetResolution(width, height, dpi);
    customDimModal?.classList.remove('active');
  });

  // Transparent Background Toggle Buttons
  const transToggleBtn = document.getElementById('transparent-bg-toggle-btn');
  if (transToggleBtn) {
    transToggleBtn.addEventListener('click', () => {
      CanvasEngine.setTransparentBackground(!CanvasEngine.isTransparentBg);
    });
  }

  document.getElementById('set-bg-solid-btn')?.addEventListener('click', () => {
    const color = document.getElementById('canvas-bg-color-picker').value;
    CanvasEngine.setCanvasBackgroundColor(color);
  });

  document.getElementById('set-bg-transparent-btn')?.addEventListener('click', () => {
    CanvasEngine.setTransparentBackground(true);
  });

  document.getElementById('canvas-bg-color-picker')?.addEventListener('input', (e) => {
    CanvasEngine.setCanvasBackgroundColor(e.target.value);
  });

  // Scale Option Cards Handler
  let selectedScale = 2;
  const scaleCards = document.querySelectorAll('.option-card[data-scale]');
  scaleCards.forEach(card => {
    card.addEventListener('click', () => {
      scaleCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedScale = parseInt(card.getAttribute('data-scale'));
    });
  });

  // Sharpen Slider Text Update
  const sharpenRange = document.getElementById('sharpen-range');
  const sharpenVal = document.getElementById('sharpen-val');
  if (sharpenRange && sharpenVal) {
    sharpenRange.addEventListener('input', (e) => {
      sharpenVal.textContent = `${e.target.value}%`;
    });
  }

  // AI Upscale Process Trigger
  const imageUploadInput = document.getElementById('image-upload-input');
  const processBtn = document.getElementById('process-upscale-btn');
  if (processBtn && imageUploadInput) {
    processBtn.addEventListener('click', async () => {
      const file = imageUploadInput.files[0];
      if (!file) {
        alert('Por favor selecciona una imagen primero para escalar con IA.');
        return;
      }

      const statusDot = document.getElementById('status-dot');
      const statusText = document.getElementById('status-text');
      if (statusDot) statusDot.classList.add('busy');
      if (statusText) statusText.textContent = 'Procesando escalado por Inteligencia Artificial...';

      try {
        const model = document.getElementById('ai-model-select').value;
        const sharpen = parseInt(sharpenRange.value);
        const fitMode = document.getElementById('image-fit-mode-select').value;

        const result = await AIUpscaler.processUpscale(file, selectedScale, model, sharpen);
        CanvasEngine.setBackgroundImage(result.upscaledDataUrl, fitMode);

        if (statusDot) statusDot.classList.remove('busy');
        if (statusText) statusText.textContent = `¡Imagen escalada exitosamente a ${result.width}x${result.height} px!`;
      } catch (err) {
        if (statusDot) statusDot.classList.remove('busy');
        if (statusText) statusText.textContent = 'Error al procesar la imagen.';
        alert('Ocurrió un error al procesar el escalado de imagen.');
      }
    });
  }

  // Text Studio Handlers
  document.getElementById('add-heading-btn')?.addEventListener('click', () => CanvasEngine.addHeadingText());
  document.getElementById('add-subheading-btn')?.addEventListener('click', () => CanvasEngine.addSubheadingText());
  document.getElementById('add-body-btn')?.addEventListener('click', () => CanvasEngine.addBodyText());

  document.getElementById('font-family-select')?.addEventListener('change', (e) => {
    const active = CanvasEngine.canvas.getActiveObject();
    if (active && (active.type === 'i-text' || active.type === 'text')) {
      active.set('fontFamily', e.target.value);
      CanvasEngine.canvas.renderAll();
    }
  });

  document.getElementById('text-color-input')?.addEventListener('input', (e) => {
    const active = CanvasEngine.canvas.getActiveObject();
    if (active && (active.type === 'i-text' || active.type === 'text')) {
      active.set('fill', e.target.value);
      CanvasEngine.canvas.renderAll();
    }
  });

  document.getElementById('text-bg-color-input')?.addEventListener('input', (e) => {
    const active = CanvasEngine.canvas.getActiveObject();
    if (active && (active.type === 'i-text' || active.type === 'text')) {
      active.set('textBackgroundColor', e.target.value);
      CanvasEngine.canvas.renderAll();
    }
  });

  // Graphic Elements Handlers
  document.getElementById('add-rect-btn')?.addEventListener('click', () => CanvasEngine.addRectangle());
  document.getElementById('add-circle-btn')?.addEventListener('click', () => CanvasEngine.addCircle());
  document.getElementById('add-badge-btn')?.addEventListener('click', () => CanvasEngine.addBadge());
  document.getElementById('add-arrow-btn')?.addEventListener('click', () => CanvasEngine.addArrow());

  document.getElementById('element-color-input')?.addEventListener('input', (e) => {
    const active = CanvasEngine.canvas.getActiveObject();
    if (active) {
      active.set('fill', e.target.value);
      CanvasEngine.canvas.renderAll();
    }
  });

  const elementOpacityRange = document.getElementById('element-opacity-range');
  const elementOpacityVal = document.getElementById('element-opacity-val');
  if (elementOpacityRange && elementOpacityVal) {
    elementOpacityRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      elementOpacityVal.textContent = `${val}%`;
      const active = CanvasEngine.canvas.getActiveObject();
      if (active) {
        active.set('opacity', val / 100);
        CanvasEngine.canvas.renderAll();
      }
    });
  }

  // Background Remover Handler
  document.getElementById('apply-bg-remove-btn')?.addEventListener('click', () => {
    const colorHex = document.getElementById('bg-remove-color').value;
    const tolerance = parseInt(document.getElementById('bg-tolerance-range').value);
    BGRemover.removeColorBackground(colorHex, tolerance);
  });

  // Photo Filters Handlers
  document.querySelectorAll('.filter-preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      FiltersManager.applyPreset(preset);
    });
  });

  const filterBrightness = document.getElementById('filter-brightness');
  const filterContrast = document.getElementById('filter-contrast');
  const filterSaturation = document.getElementById('filter-saturation');
  const filterBlur = document.getElementById('filter-blur');

  const updateAdjustments = () => {
    FiltersManager.applyAdjustments(
      parseInt(filterBrightness.value),
      parseInt(filterContrast.value),
      parseInt(filterSaturation.value),
      parseInt(filterBlur.value)
    );
  };

  [filterBrightness, filterContrast, filterSaturation, filterBlur].forEach(el => {
    if (el) el.addEventListener('input', updateAdjustments);
  });

  // Watermark Handler
  document.getElementById('apply-watermark-btn')?.addEventListener('click', () => {
    const text = document.getElementById('watermark-text-input').value;
    const opacity = parseInt(document.getElementById('wm-opacity-range').value);
    WatermarkManager.applyTextWatermark(text, opacity);
  });

  // Inspector Layer Handlers
  document.getElementById('bring-forward-btn')?.addEventListener('click', () => CanvasEngine.bringForward());
  document.getElementById('send-backward-btn')?.addEventListener('click', () => CanvasEngine.sendBackward());
  document.getElementById('duplicate-obj-btn')?.addEventListener('click', () => CanvasEngine.duplicateActive());
  document.getElementById('delete-obj-btn')?.addEventListener('click', () => CanvasEngine.deleteActive());

  // Keyboard Shortcuts (Delete Key & Backspace Key to delete selected object)
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return; // Do not interrupt typing in input fields
    }

    if (e.key === 'Delete' || e.key === 'Backspace') {
      const active = CanvasEngine.canvas.getActiveObject();
      if (active && !active.isEditing) {
        CanvasEngine.deleteActive();
      }
    }
  });

  // Canvas Toolbar Handlers
  document.getElementById('clear-canvas-btn')?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que deseas limpiar todo el lienzo?')) {
      CanvasEngine.clear();
    }
  });

  // Modal Dialog Handlers
  const exportModal = document.getElementById('export-modal');
  const creditsModal = document.getElementById('credits-modal');

  document.getElementById('open-export-modal-btn')?.addEventListener('click', () => {
    const exportInfo = document.getElementById('export-info-text');
    if (exportInfo) {
      exportInfo.textContent = `Dimensiones del Lienzo: ${CanvasEngine.canvas.width} x ${CanvasEngine.canvas.height} px @ ${CanvasEngine.currentDpi} DPI / PPX | Fondo Transparente: ${CanvasEngine.isTransparentBg ? 'SÍ (PNG Alfa)' : 'NO'}`;
    }
    exportModal?.classList.add('active');
  });

  document.getElementById('credits-btn')?.addEventListener('click', () => {
    creditsModal?.classList.add('active');
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      exportModal?.classList.remove('active');
      creditsModal?.classList.remove('active');
      customDimModal?.classList.remove('active');
    });
  });

  // Confirm Export Download
  document.getElementById('confirm-export-btn')?.addEventListener('click', () => {
    const format = document.getElementById('export-format-select').value;
    const quality = parseInt(document.getElementById('export-quality-range').value) / 100;

    const dataUrl = CanvasEngine.canvas.toDataURL({
      format: format === 'pdf' ? 'png' : format,
      quality: quality,
      multiplier: 1
    });

    const link = document.createElement('a');
    link.download = `pixelforge-${CanvasEngine.canvas.width}x${CanvasEngine.canvas.height}-${CanvasEngine.currentDpi}dpi-${Date.now()}.${format === 'pdf' ? 'png' : format}`;
    link.href = dataUrl;
    link.click();

    exportModal?.classList.remove('active');
  });
});
