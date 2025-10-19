import React, { useState } from 'react';
import { Send, Loader } from 'lucide-react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ChatInterface() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMessage = { type: 'user', text: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/recommend?query=${encodeURIComponent(message)}&top_k=3`
      );

      const botMessage = {
        type: 'bot',
        text: `Found ${response.data.products.length} recommendations for "${message}"`,
        products: response.data.products,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        type: 'bot',
        text: 'Sorry, there was an error. Please try again.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.messagesContainer}>
        {messages.length === 0 && (
          <div style={styles.emptyState}>
            <h2>👋 Hi! How can I help you find furniture today?</h2>
            <p>Try: "modern sofa", "wooden dining table", "office chair"</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div key={idx} style={styles.messageWrapper}>
            <div
              style={{
                ...styles.message,
                ...(msg.type === 'user' ? styles.userMessage : styles.botMessage),
              }}
            >
              {msg.text}
            </div>

            {msg.products && (
              <div style={styles.productsGrid}>
                {msg.products.map((product, pidx) => (
                  <ProductCard key={pidx} product={product} />
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={styles.loading}>
            <Loader size={24} className="spinner" />
            Searching for products...
          </div>
        )}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Describe the furniture you're looking for..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.button} disabled={loading}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 80px)',
    background: '#f8f9fa',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '4rem',
    color: '#666',
  },
  messageWrapper: {
    marginBottom: '1.5rem',
  },
  message: {
    padding: '1rem 1.5rem',
    borderRadius: '12px',
    maxWidth: '70%',
    marginBottom: '1rem',
  },
  userMessage: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    marginLeft: 'auto',
  },
  botMessage: {
    background: 'white',
    color: '#333',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginTop: '1rem',
  },
  loading: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem',
    color: '#667eea',
  },
  inputContainer: {
    padding: '1.5rem',
    background: 'white',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '1rem',
  },
  input: {
    flex: 1,
    padding: '1rem',
    fontSize: '1rem',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    outline: 'none',
  },
  button: {
    padding: '1rem 2rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
};

export default ChatInterface;
