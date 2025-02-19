async function askOllama() {
    const prompt = document.getElementById('prompt').value;
    const responseElement = document.getElementById('response');

    if (!prompt) {
        responseElement.textContent = 'Please enter a question.';
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/ask-ollama', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        responseElement.textContent = data.response || data.error;
    } catch (error) {
        console.error('Error:', error);
        responseElement.textContent = 'Failed to get response from Ollama.';
    }
}