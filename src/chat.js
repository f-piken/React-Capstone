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
      <div className="chat-container pt-40 flex flex-col justify-between p-6">
        <div className="chat-box flex-1 max-h-[500px] bg-teal-100 p-5 rounded-lg overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`message mb-4 flex flex-col max-w-[30%] animate-fadeIn ${message.sender === 'left' ? 'self-start bg-teal-200 rounded-tl-lg rounded-br-lg rounded-tr-lg' : 'cr self-end bg-teal-500 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg'}`}>
              <div className="message-content m-5 mb-1 text-sm">{message.text}</div>
              <div className="message-time mr-3 mb-2 text-xs text-right text-gray-500 ">{message.time}</div>
            </div>
          ))}
        </div>
        <div className="chat-input flex items-center bg-teal-50 p-3 rounded-xl mt-4">
          <input
            type="text"
            placeholder="Type a message"
            value={newMessage}
            onChange={handleInputChange}
            className="flex-1 p-3 rounded-xl border-none focus:outline-none"
          />
          <button className="send-btn bg-teal-700 text-white p-3 ml-3 rounded-lg cursor-pointer" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
