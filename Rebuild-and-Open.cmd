@echo off
REM Double-click after editing data in src\data\ to regenerate the single
REM dist\index.html and open it. Requires Node (npm install once).
cd /d "%~dp0"
if not exist "node_modules" (
  echo Installing dependencies for the first time...
  call npm install
)
call npm run build
if errorlevel 1 (
  echo.
  echo Build failed. See the messages above.
  pause
  exit /b 1
)
start "" "%~dp0dist\index.html"
