# 🚀 PixelForge AI Studio v1.0

**PixelForge AI Studio** es una potente aplicación de escritorio para Windows que evoluciona el concepto de escalado de imágenes por IA combinándolo con una suite completa de **diseño gráfico al estilo Canva**. Permite realizar super-resolución por IA (2x, 4x, 8x, UltraSharp, Digital Art, Photo Restore), aislamiento de fondos, retoque fotográfico avanzado, capas de texto e ilustraciones y exportación en calidad Ultra HD / 4K.

![PixelForge AI Studio](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-28.2-47848F?style=for-the-badge&logo=electron)

---

## 📋 Prerrequisitos de Sistema

Para ejecutar **PixelForge AI Studio** en tu equipo Windows, necesitas cumplir con los siguientes requisitos mínimos:

- **Sistema Operativo**: Windows 10 / Windows 11 (64-bit).
- **Entorno de Ejecución**: **Node.js v18.0.0 o superior** (Recomendado Node.js LTS v24+).
  - 📥 [Descargar Node.js LTS Oficial](https://nodejs.org/)
- **Memoria RAM**: 4 GB mínimo (8 GB recomendados para escalado 4K).
- **Procesador / GPU**: Cualquier procesador x64 moderno con aceleración por hardware WebGL.

---

## 🌟 Características Destacadas

### ⚡ Motor de Escalado por Inteligencia Artificial (Super-Resolution Studio)
- **Factores de Escalado**: 2x, 4x y 8x con preservación de bordes y texturas.
- **Modelos de IA Especializados**:
  - *UltraSharp HD*: Para fotografía hiper-detallada y arquitectura.
  - *Digital Art & Anime*: Limpieza de vectores, ilustración digital e imágenes 2D.
  - *Photo Restoration*: Recuperación de fotos antiguas y reducción de grano JPEG.
  - *Color Restorer & Dynamic Boost*: Enriquecimiento de tonos y contraste.
  - *De-Noise & Soften*: Eliminación de artefactos y ruido ISO.
- **Visor Comparativo Interactivo**: Deslizador split-screen Antes/Después para evaluar los detalles en tiempo real.
- **Escalado en Lote (Batch Processing)**: Procesa colas de imágenes secuencialmente.

### 🎨 Estudio de Diseño Gráfico Estilo Canva
- **Lienzo Interactivo HTML5 (Fabric.js)**: Capas libres drag-and-drop, rotación, redimensionamiento y duplicado de elementos.
- **Plantillas y Ratios Prestablecidos**:
  - Miniatura de YouTube (1920x1080)
  - Post de Instagram (1080x1080)
  - Historia / Reel de Instagram (1080x1920)
  - Banner Promocional (1200x400)
  - Tamaño Personalizado hasta 4K UHD.
- **Estudio de Tipografía Profesional**: Integración con Google Fonts, sombras de texto, contornos, fondo de texto pill destacado y texto en curva.
- **Insignias y Elementos Gráficos**: Formas geométricas, marcos, flechas, cintas promocionales y pegatinas.
- **Eliminación de Fondo Inteligente**: Croma/Color Keying para borrar fondos sólidos o seleccionar colores a eliminar.
- **Filtros Fotográficos y Color Grading**: Presets visuales (Cyberpunk, Vintage, Golden Hour, Emerald) y controles finos de brillo, contraste, saturación, tono, desenfoque y viñeta.
- **Generador de Marcas de Agua**: Superposición de logo o texto con patrón de repetición en rejilla, control de ángulo y opacidad.
- **Exportación Multi-Formato**: Exporta tus creaciones en PNG (transparente), JPG (con barra de calidad 1-100%), WebP y PDF.

---

## ⚡ Instalación y Uso de 1-Clic

1. Descarga o clona este repositorio.
2. Haz doble clic en el archivo ejecutable **`ejecutar.bat`**.
3. El lanzador detectará automáticamente Node.js e instalará las dependencias necesarias en su primera ejecución antes de abrir la aplicación maximizada.

---

## 💻 Desarrollo Manual

Si prefieres ejecutar el proyecto desde la terminal de comandos:

```bash
# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm start
```

---

## ☕ Autor y apoyo

Desarrollado por [Christian Herencia](https://christian-freelance.us/).

Si el proyecto te resulta útil, puedes [invitarme a un café mediante PayPal](https://www.paypal.com/donate/?hosted_button_id=YC6YAWBQ7HNSS).
