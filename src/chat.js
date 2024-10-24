import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
// import './ChatComponent.css'; // Pastikan file CSS terpisah untuk styling

function Chat() {
  const [messages, setMessages] = useState([
    { text: 'Hai, admin..', time: '15:27', sender: 'left' },
    { text: 'Hai, selamat sore ada yang bisa saya bantu?', time: '15:29', sender: 'right' }
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Tambahkan pesan baru ke array messages
    setMessages([
      ...messages,
      { text: newMessage, time: currentTime, sender: 'right' }
    ]);
    
    // Bersihkan input
    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="App">
        <Header/>
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
    <Footer/>
    </div>
  );
}

export default Chat;
