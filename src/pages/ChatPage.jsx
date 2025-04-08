import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import styles from '../styles/ChatPage.module.css';

const ChatPage = () => {
  const location = useLocation();
  const { buyerName } = location.state || {};
  const [messages, setMessages] = useState([
    { sender: 'Buyer', text: 'Hi! I’m interested in your crabs.' },
    { sender: 'You', text: 'Great! I have 10 kg available.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'You', text: newMessage }]);
      setNewMessage('');
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'Buyer', text: 'Sounds good! Can we finalize the deal?' }]);
      }, 1000);
    }
  };

  return (
    <div className={styles.chatPage}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>
        <Link to="/buyers" className={styles.backLink}>
          <FaArrowLeft /> Back to Buyers
        </Link>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h2>Chat with {buyerName || 'Unknown Buyer'}</h2>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${msg.sender === 'You' ? styles.sent : styles.received}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button onClick={handleSendMessage}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatPage;