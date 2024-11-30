import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

function Chat() {
  const [messages, setMessages] = useState([
    { text: 'Hello there?', time: '11:42', sender: 'left' },
    { text: 'Hey! How can we help you today?', time: '11:45', sender: 'right' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages([
      ...messages,
      { text: newMessage, time: currentTime, sender: 'right' },
    ]);

    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="App">
      <Header />
      <div className="sela"></div>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">{message.text}</div>
              <div className="message-time">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={handleInputChange}
          />
          <button className="send-btn" onClick={handleSendMessage}>Send</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
