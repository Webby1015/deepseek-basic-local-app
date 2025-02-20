import { useState } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! this is deepseek R-1 1.5B, i may be a little show but how can i help you today.', sender: 'other', timestamp: new Date().toLocaleTimeString() },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    // Add the user's message to the chat
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, userMessage]);
    setNewMessage('');
    setLoading(true);
    setError('');

    try {
      // Send the user's message to the Ollama API
      const res = await axios.post('http://localhost:3000/', { prompt: newMessage });

      // Add the API's response to the chat
      const botMessage = {
        id: messages.length + 2,
        text: res.data.response,
        sender: 'other',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    }

    setLoading(false);
  };

  // Function to handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Chat with deepseek R-1 1.5B</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 text-xl p-4 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-400 text-gray-800'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs text-gray-200 block mt-1 text-right">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-5 text-xl border border-gray-300 rounded-l-lg focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-blue-500 text-xl text-white px-4 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default App;