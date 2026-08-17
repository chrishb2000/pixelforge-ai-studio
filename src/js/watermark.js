/* Watermark Generator Module */
const WatermarkManager = {
  applyTextWatermark(text, opacityPercent) {
    if (!text) return;

    const opacity = opacityPercent / 100;
    const canvasWidth = CanvasEngine.canvas.width;
    const canvasHeight = CanvasEngine.canvas.height;

    // Create repeat grid pattern of watermark text across canvas
    const objects = [];
    const stepX = 350;
    const stepY = 200;

    for (let x = 50; x < canvasWidth; x += stepX) {
      for (let y = 50; y < canvasHeight; y += stepY) {
        const mark = new fabric.Text(text, {
          left: x,
          top: y,
          fontSize: 22,
          fontFamily: 'Montserrat',
          fontWeight: 'bold',
          fill: '#ffffff',
          opacity: opacity,
          angle: -25,
          selectable: false,
          evented: false,
          shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.5)', blur: 4, offsetX: 2, offsetY: 2 })
        });
        objects.push(mark);
      }
    }

    const group = new fabric.Group(objects, {
      left: 0,
      top: 0,
      selectable: true,
      evented: true
    });

    CanvasEngine.canvas.add(group);
    CanvasEngine.canvas.bringToFront(group);
    CanvasEngine.canvas.renderAll();
  }
};

window.WatermarkManager = WatermarkManager;
