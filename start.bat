@echo off
REM Start Ollama in a new terminal window
echo Starting Ollama with deepseek-r1:1.5b...
start cmd /k "ollama run deepseek-r1:1.5b"
if %errorlevel% neq 0 (
    echo Failed to start Ollama. Exiting...
    pause
    exit /b
)

REM Start Node.js backend in a new terminal window
echo Starting Node.js backend...
cd back-end
start cmd /k "node app.js"
if %errorlevel% neq 0 (
    echo Failed to start Node.js backend. Exiting...
    pause
    exit /b
)

REM Start frontend in a new terminal window
echo Starting frontend...
cd ..\front-end
start cmd /k "npm run dev"
if %errorlevel% neq 0 (
    echo Failed to start frontend. Exiting...
    pause
    exit /b
)

echo All services started successfully!
pause