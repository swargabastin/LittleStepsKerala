@echo off
echo ========================================================
echo   LittleSteps Kerala - Ernakulam Daycare Directory
echo   Offline-Ready PWA (Works on Phone and Laptop)
echo ========================================================
cd /d "%~dp0LittleStepsKeralaWeb"
echo.
echo Starting Vite server...
echo - On your Laptop: http://localhost:5173
echo - On your Phone:  http://10.10.104.129:5173
echo.
npm.cmd run dev -- --host
