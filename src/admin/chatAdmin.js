import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import Nav from './component/nav';
import api from '../api'; 

function Chat() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const pengirim = params.get("pengirim");
  const status = params.get("status");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');


  useEffect(() => {
    const fetchMessages = async () => {
      const response = await api.get(`/get-messages/${pengirim}`);
      setMessages(response.data.reverse());
    };
  
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
  
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
  
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const response = await api.post('/send-admin', {
      message: newMessage,
      id_chat: pengirim,
    });

    setMessages((prevMessages) => [...prevMessages, { ...response.data, time: currentTime }]); // Menambahkan pesan di bawah
    setNewMessage('');
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-teal-100 font-sans">
      {/* Header */}
      <header className="bg-teal-200 text-teal-800 px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-xl font-bold">Admin Panel</h1>
        <div className="flex items-center">
          <span className="material-icons text-3xl mr-2">account_circle</span>
          <span>Munet</span>
        </div>
      </header>
      {/* Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Nav />

        <div className="pt-10 flex flex-col justify-between p-6 w-[1000rem]">
          <div className="bg-teal-300 chat-box flex-1 max-h-[1000px] p-5 rounded-lg overflow-y-auto">
            {messages.reverse().map((message, index) => {
              const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
              return (
                <div
                  key={index}
                  className={`message mb-4 flex flex-col max-w-[30%] animate-fadeIn ${
                    message.pengirim === 'admin'
                      ? 'cra self-end bg-teal-500 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg'
                      : 'self-start bg-teal-200 rounded-tl-lg rounded-br-lg rounded-tr-lg'
                  }`}
                >
                  <div className="message-content m-5 mb-1 text-sm">{message.message}</div>
                  <div className="message-time mr-3 mb-2 text-xs text-right text-gray-900 ">{time}</div>
                </div>
              );
            })}
          </div>
          
          {/* Input dan tombol kirim pesan */}
          {status === "berlangsung" && (
            <div className="chat-input flex items-center bg-teal-300 p-3 rounded-xl mt-4">
              <input
                type="text"
                placeholder="Type a message"
                value={newMessage}
                onChange={handleInputChange}
                className="flex-1 p-3 rounded-xl border-none focus:outline-none"
              />
              <button 
                type="submit" 
                className="send-btn bg-teal-700 text-white p-3 ml-3 rounded-lg cursor-pointer" 
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Chat;
