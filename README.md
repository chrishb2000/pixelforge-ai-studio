# 🚀 PixelForge AI Studio v1.0

**PixelForge AI Studio** es una potente aplicación de escritorio para Windows que evoluciona el concepto de super-resolución de imágenes por Inteligencia Artificial combinándolo con una suite completa de **diseño gráfico al estilo Canva**. Permite realizar super-resolución por IA (2x, 4x, 8x, UltraSharp, Digital Art, Photo Restore), aislamiento de fondos transparentes PNG (alfa 100%), retoque fotográfico avanzado, capas de texto estilizado, insignias vectoriales, marcas de agua y exportación en calidad Ultra HD / 4K a cualquier resolución personalizada (ej. 4500 x 5400 px @ 400 DPI para Merch / POD / Impresión).

![PixelForge AI Studio](https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Electron](https://img.shields.io/badge/Electron-28.3-47848F?style=for-the-badge&logo=electron)

---

## ⚡ Dos Modos de Ejecución Presentados (Escoge tu Preferido)

**PixelForge AI Studio** se presenta de 2 maneras flexibles para adaptarse a las necesidades de cualquier usuario:

### 📦 Opción 1: Ejecutable Binario Directo de Windows (.exe / Portable)
- **Para quién es**: Usuarios que no desean ejecutar comandos ni instalar Node.js previamente.
- **Cómo usarlo**:
  1. Descarga el paquete comprimido `.zip` desde las [Releases Oficiales de GitHub](https://github.com/chrishb2000/pixelforge-ai-studio/releases).
  2. Descomprime la carpeta en tu equipo.
  3. Haz doble clic directo sobre **`PixelForge-AI-Studio.exe`** para iniciar la aplicación de inmediato.

### 📜 Opción 2: Ejecución Portátil de 1-Clic mediante Script (`ejecutar.bat`)
- **Para quién es**: Usuarios que prefieren una ejecución ligera basada en scripts de auto-configuración.
- **Cómo usarlo**:
  1. Clona o descarga este repositorio de GitHub.
  2. Haz doble clic en el archivo **`ejecutar.bat`**.
  3. El script detectará automáticamente Node.js e instalará las dependencias necesarias en su primera ejecución antes de abrir la aplicación.

---

## 📋 Prerrequisitos de Sistema

Para ejecutar **PixelForge AI Studio** en tu equipo Windows, necesitas cumplir con los siguientes requisitos mínimos:

- **Sistema Operativo**: Windows 10 / Windows 11 (64-bit).
- **Entorno de Ejecución** *(Solo para la Opción 2 / modo script)*: **Node.js v18.0.0 o superior** (Recomendado Node.js LTS v24+).
  - 📥 [Descargar Node.js LTS Oficial](https://nodejs.org/)
- **Memoria RAM**: 4 GB mínimo (8 GB recomendados para exportaciones 4K / 4500x5400 px).
- **Procesador / GPU**: Cualquier procesador x64 moderno con aceleración por hardware WebGL.

---

## 🌟 Características Destacadas

### 📐 Dimensiones Personalizadas & Impresión POD / Merch (4500x5400 @ 400 DPI)
- **Preset Especializado para Merch / POD**: Preset predefinido **`Personalizado Print/POD (4500x5400 @ 400 DPI)`**.
- **Modal de Dimensiones a la Medida**: Introduce cualquier resolución de 100x100 a 10.000x10.000 píxeles y configura la densidad DPI (400 DPI Ultra HD, 300 DPI, 150 DPI, 72 DPI).
- **Modos de Ajuste de Imagen**: Ajustar al lienzo (*Fit*), Rellenar lienzo (*Fill*) o Mantener escala original.

### 🏁 Lienzo Transparente y Exportación PNG Alfa
- **Previsualización con Damero (Checkerboard)**: Botón de conmutación rápida `Fondo Transparente: ON (PNG Alfa)` con vista de rejilla transparente.
- **Exportación Alfa 100%**: Descarga imágenes en PNG transparente sin residuos blancos alrededor del sujeto.

### ⚡ Motor de Escalado por Inteligencia Artificial (Super-Resolution Studio)
- **Factores de Escalado**: 2x, 4x y 8x con preservación de bordes y texturas.
- **Modelos de IA Especializados**:
  - *UltraSharp Pro*: Para fotografía hiper-detallada y arquitectura.
  - *Digital Art & Anime*: Limpieza de vectores, ilustración digital e imágenes 2D.
  - *Photo Restoration*: Recuperación de fotos antiguas y reducción de grano JPEG.
  - *Color Restorer*: Enriquecimiento de tonos y contraste dinámico.
  - *De-Noise & Soften*: Eliminación de artefactos y grano ISO.
- **Visor Comparativo Interactivo**: Deslizador split-screen Antes/Después para evaluar los detalles en tiempo real.

### 🎨 Estudio de Diseño Gráfico Estilo Canva
- **Lienzo Interactivo HTML5 (Fabric.js)**: Capas libres drag-and-drop, rotación, redimensionamiento y duplicado de elementos.
- **Estudio de Tipografía Profesional**: Integración con Google Fonts, sombras de texto, contornos, fondo de texto pill destacado y texto en curva.
- **Insignias y Elementos Gráficos**: Formas geométricas, marcos, flechas, cintas promocionales y pegatinas.
- **Eliminación de Fondo Inteligente**: Croma/Color Keying para borrar fondos sólidos o seleccionar colores a eliminar.
- **Filtros Fotográficos y Color Grading**: Presets visuales (Cyberpunk, Vintage, Golden Hour, Emerald) y controles finos de brillo, contraste, saturación, tono, desenfoque y viñeta.
- **Generador de Marcas de Agua**: Superposición de logo o texto con patrón de repetición en rejilla, control de ángulo y opacidad.
- **Atajos de Teclado**: Presiona `Supr` o `Backspace` para eliminar objetos seleccionados en el lienzo.

---

## 💻 Comandos de Desarrollo y Compilación

Si deseas compilar tu propio ejecutable binario de Windows desde el código fuente:

```bash
# Instalar dependencias de desarrollo
npm install

# Ejecutar en modo desarrollo
npm start

# Compilar ejecutable binario standalone de Windows (.exe en /dist)
npm run package-win
```

---

## ☕ Autor y apoyo

Desarrollado por [Christian Herencia](https://christian-freelance.us/).

Si el proyecto te resulta útil, puedes [invitarme a un café mediante PayPal](https://www.paypal.com/donate/?hosted_button_id=YC6YAWBQ7HNSS).
