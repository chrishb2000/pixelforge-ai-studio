# 🚀 PixelForge AI Studio v1.1 Pro

**PixelForge AI Studio** es una potente aplicación de escritorio para Windows centrada en el **escalado por Inteligencia Artificial, redimensión de alta precisión y gestión de transparencias**. Permite realizar super-resolución por IA (2x, 4x, 8x, UltraSharp, Digital Art, Photo Restore), redimensionar imágenes a resoluciones personalizadas exactas (p. ej. 4500 x 5400 px @ 400 DPI para Merch / POD / Impresión), aislar fondos transparentes PNG con canal alfa 100%, aplicar retoques cromáticos y exportar en múltiples formatos (PNG, JPG, WebP, PDF).

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

- **Sistema Operativo**: Windows 10 / Windows 11 (64-bit).
- **Entorno de Ejecución** *(Solo para la Opción 2 / modo script)*: **Node.js v18.0.0 o superior** (Recomendado Node.js LTS v24+).
  - 📥 [Descargar Node.js LTS Oficial](https://nodejs.org/)
- **Memoria RAM**: 4 GB mínimo (8 GB recomendados para exportaciones 4K / 4500x5400 px).
- **Procesador / GPU**: Cualquier procesador x64 moderno con aceleración por hardware WebGL.

---

## 🌟 Funciones Principales

### ⚡ 1. Escalador por Inteligencia Artificial (Super-Resolution Studio)
- **Factores de Escalado**: 2x, 4x y 8x con preservación de bordes y texturas.
- **Modelos de IA Especializados**:
  - *UltraSharp Pro*: Para fotografía hiper-detallada y arquitectura.
  - *Digital Art & Anime*: Limpieza de vectores, ilustración digital e imágenes 2D.
  - *Photo Restoration*: Recuperación de fotos antiguas y reducción de grano JPEG.
  - *Color Restorer*: Enriquecimiento de tonos y contraste dinámico.
  - *De-Noise & Soften*: Eliminación de artefactos y grano ISO.
- **Visor Comparativo Interactivo**: Deslizador split-screen Antes/Después en tiempo real.

### 📐 2. Redimensión & Formatos de Redes Sociales (TikTok, YouTube, Insta, POD)
- **Formatos Predefinidos por Red Social**:
  - 🔴 **YouTube**: Miniatura (1920×1080), Perfil (800×800), Banner de Canal (2560×1440).
  - 🎵 **TikTok**: Video / Short (1080×1920), Foto de Perfil (200×200).
  - 📸 **Instagram**: Post Cuadrado (1080×1080), Post Retrato (1080×1350), Story / Reel (1080×1920), Perfil (320×320).
  - 🔵 **Facebook**: Post (1200×630), Portada (820×312), Perfil (170×170).
  - 🐦 **Twitter / X**: Post (1200×675), Encabezado (1500×500), Perfil (400×400).
  - 🟣 **Twitch**: Banner (1200×480), Perfil (800×800).
  - 💼 **LinkedIn**: Post (1200×627), Portada (1584×396).
  - 👕 **Impresión / Merch POD**: Camisetas (4500×5400 @ 400 DPI).
- **Dimensiones a la Medida**: Configura cualquier resolución de 100x100 a 10.000x10.000 píxeles y la densidad DPI (400 DPI Ultra HD, 300 DPI, 150 DPI, 72 DPI Web).
- **Modos de Ajuste**: Encajar al lienzo (*Fit*), Rellenar lienzo (*Fill*) o Mantener escala original.

### 🏁 3. Fondo Transparente PNG Alfa & Eliminación de Fondo Croma
- **Vista Previa con Damero (Checkerboard)**: Botón de conmutación rápida `Fondo Transparente: ON (PNG Alfa)` con cuadrícula de transparencia.
- **Exportación Alfa 100%**: Descarga imágenes en PNG transparente sin residuos blancos.
- **Eliminador de Fondo Croma**: Herramienta para borrar fondos sólidos especificando color y nivel de tolerancia.

### 🎭 4. Filtros Fotográficos y Retoque de Imagen
- **Presets Cromáticos**: Cyberpunk, Vintage Sepia, Golden Hour, Esmeralda, Monocromo y Normal.
- **Ajustes Finos**: Controladores de Brillo, Contraste, Saturación y Desenfoque (Blur).

### 💾 5. Exportación en Varios Formatos
- **Formatos Disponibles**: PNG (con transparencia alfa), JPG / JPEG (con barra de compresión de calidad), WebP (formato web ligero) y PDF.

---

## 💻 Comandos de Desarrollo y Compilación

Si deseas compilar tu propio ejecutable binario de Windows desde el código fuente:

```bash
# Instalar dependencias
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
