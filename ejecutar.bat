@echo off
title PixelForge AI Studio - Launcher
cls

echo ========================================================
echo               PixelForge AI Studio v1.0
echo       AI Image Upscaling & Canva Graphic Design Suite
echo ========================================================
echo.

node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in system PATH.
    echo Please download and install Node.js LTS from https://nodejs.org/
    echo Press any key to exit.
    pause >nul
    exit /b 1
)

echo [OK] Node.js environment detected.
echo.

if not exist "node_modules" (
    echo [INFO] First-time setup: Installing required dependencies...
    echo Please wait while npm packages are being installed...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo [ERROR] Failed to install dependencies. Please check your internet connection.
        pause
        exit /b 1
    )
    echo [OK] Installation completed successfully!
    echo.
)

echo [START] Launching PixelForge AI Studio...
echo.
call npm start

if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] App closed or exited with code %errorlevel%.
)
