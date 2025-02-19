@echo off

REM Start Ollama server with the deepseek-r1:1.5b model
echo Starting Ollama server...
start "" ollama run deepseek-r1:1.5b

REM Wait for Ollama to start (adjust timeout if needed)
timeout /t 5 >nul

REM Start the Node.js backend server
echo Starting Node.js backend...
cd backend
start "" node app.js

REM Wait for the backend to start
timeout /t 2 >nul

REM Start the frontend HTTP server
echo Starting frontend server...
cd ..\frontend
start "" python -m http.server 8000

echo Application is running! Open http://localhost:8000 in your browser.