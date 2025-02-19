const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

// Ollama API endpoint (replace with your Ollama server URL)
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';

// Middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Route to handle user input and get responses from Ollama
app.post('/ask-ollama', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        // Send the prompt to Ollama
        const response = await axios.post(OLLAMA_API_URL, {
            model: 'deepseek-r1:1.5b', // Replace with your Ollama model name
            prompt: prompt,
            stream: false, // Set to true if you want streaming responses
        });

        // Extract the response from Ollama
        const ollamaResponse = response.data.response;

        // Send the response back to the client
        res.json({ response: ollamaResponse });
    } catch (error) {
        console.error('Error calling Ollama API:', error);
        res.status(500).json({ error: 'Failed to get response from Ollama' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});