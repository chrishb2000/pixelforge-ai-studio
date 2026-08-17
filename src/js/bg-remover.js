/* Smart Background Removal Engine */
const BGRemover = {
  removeColorBackground(targetColorHex, tolerancePercent) {
    const active = CanvasEngine.canvas.getActiveObject() || CanvasEngine.currentImageObject;
    if (!active || active.type !== 'image') {
      alert('Por favor selecciona una imagen en el lienzo para eliminar su fondo.');
      return;
    }

    const imgElement = active._element;
    if (!imgElement) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imgElement.width || imgElement.naturalWidth;
    tempCanvas.height = imgElement.height || imgElement.naturalHeight;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(imgElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    // Convert hex target color to RGB
    const targetR = parseInt(targetColorHex.slice(1, 3), 16);
    const targetG = parseInt(targetColorHex.slice(3, 5), 16);
    const targetB = parseInt(targetColorHex.slice(5, 7), 16);

    const maxDistance = (tolerancePercent / 100) * 441.67; // sqrt(255^2 * 3)

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const dist = Math.sqrt(
        Math.pow(r - targetR, 2) +
        Math.pow(g - targetG, 2) +
        Math.pow(b - targetB, 2)
      );

      if (dist <= maxDistance) {
        data[i + 3] = 0; // Set Alpha to 0 (Transparent)
      }
    }

    ctx.putImageData(imageData, 0, 0);
    const transparentDataUrl = tempCanvas.toDataURL('image/png');

    fabric.Image.fromURL(transparentDataUrl, (newImg) => {
      newImg.set({
        originX: active.originX || 'center',
        originY: active.originY || 'center',
        left: active.left,
        top: active.top,
        scaleX: active.scaleX,
        scaleY: active.scaleY,
        angle: active.angle,
        cornerColor: '#6366f1',
        cornerStyle: 'circle',
        transparentCorners: false,
        cornerSize: 12,
        borderColor: '#6366f1',
        borderDashArray: [4, 4]
      });

      if (active === CanvasEngine.currentImageObject) {
        CanvasEngine.currentImageObject = newImg;
      }

      CanvasEngine.canvas.remove(active);
      CanvasEngine.canvas.add(newImg);
      CanvasEngine.canvas.setActiveObject(newImg);
      CanvasEngine.canvas.renderAll();
    });
  }
};

window.BGRemover = BGRemover;
