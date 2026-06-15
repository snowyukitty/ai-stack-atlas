@echo off
REM Double-click to open the already-built site. No Node needed.
REM (If you haven't built yet, run Rebuild-and-Open.cmd first.)
if not exist "%~dp0dist\index.html" (
  echo Site not built yet. Running a build first...
  cd /d "%~dp0"
  call npm run build
)
start "" "%~dp0dist\index.html"
