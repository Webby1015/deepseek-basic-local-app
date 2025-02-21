#!/bin/bash

# Start Ollama in a new terminal window
echo "Starting Ollama with deepseek-r1:1.5b..."
gnome-terminal -- bash -c "ollama run deepseek-r1:1.5b; exec bash"
if [ $? -ne 0 ]; then
    echo "Failed to start Ollama. Exiting..."
    read -p "Press any key to continue..."
    exit 1
fi

# Start Node.js backend in a new terminal window
echo "Starting Node.js backend..."
cd back-end
gnome-terminal -- bash -c "node app.js; exec bash"
if [ $? -ne 0 ]; then
    echo "Failed to start Node.js backend. Exiting..."
    read -p "Press any key to continue..."
    exit 1
fi

# Start frontend in a new terminal window
echo "Starting frontend..."
cd ../front-end
gnome-terminal -- bash -c "npm run dev; exec bash"
if [ $? -ne 0 ]; then
    echo "Failed to start frontend. Exiting..."
    read -p "Press any key to continue..."
    exit 1
fi

echo "All services started successfully!"
read -p "Press any key to continue..."