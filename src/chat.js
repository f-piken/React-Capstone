import React, { useState, useEffect } from 'react';
import api from './api'; // Mengimpor API untuk berkomunikasi dengan backend
import Header from './components/Header';
import Footer from './components/Footer';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isEmpty, setIsEmpty] = useState(false); // Tambahkan state untuk mengecek apakah data kosong

  // Ambil pesan dari backend
  useEffect(() => {
    const fetchMessages = async () => {
      const userSession = sessionStorage.getItem('userSession');
      if (!userSession) {
        alert('Session user tidak ditemukan!');
        return;
      }

      try {
        const response = await api.get(`/get-messages/${userSession}`);
        if (response.data.length === 0) {
          setIsEmpty(true); // Set isEmpty menjadi true jika tidak ada pesan
        } else {
          setIsEmpty(false); // Set isEmpty menjadi false jika ada data
          setMessages([...response.data].reverse());
        }
      } catch (error) {
        console.error('Gagal mengambil pesan:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 10000); // Refresh setiap 10 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen tidak digunakan
  }, []);

  // Kirim pesan ke backend
  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    const userSession = sessionStorage.getItem('userSession');
    if (!userSession) {
      alert('Session user tidak ditemukan!');
      return;
    }

    try {
      const response = await api.post('/send-message', {
        message: newMessage,
        id_chat: userSession, // Pastikan id_chat dikirimkan
      });

      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages((prevMessages) => [...prevMessages, { ...response.data.chat, time: currentTime }]);
      setNewMessage('');
    } catch (error) {
      console.error('Gagal mengirim pesan:', error);
    }
  };

  // Mengatur perubahan input untuk pesan
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Tampilkan halaman kosong jika tidak ada data
  if (isEmpty) {
    return (
      <div className="App">
        <Header />
        <div className="chat-container pt-40 flex flex-col justify-center items-center h-screen">
          <p className="text-gray-600">Belum ada pesan. Mulailah percakapan!</p>
          <div className="chat-input flex items-center bg-teal-50 p-3 rounded-xl mt-4">
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
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <div className="chat-container pt-40 flex flex-col justify-between p-6">
        <div className="chat-box flex-1 max-h-[500px] bg-teal-100 p-5 rounded-lg overflow-y-auto">
          {messages.map((message, index) => {
            const time = new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={index}
                className={`message mb-4 flex flex-col max-w-[30%] animate-fadeIn ${
                  message.pengirim === 'admin'
                  ? 'self-start bg-teal-200 rounded-tl-lg rounded-br-lg rounded-tr-lg'
                  : 'cr self-end bg-teal-500 text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg'
                }`}
              >
                <div className="message-content m-5 mb-1 text-sm">{message.message}</div>
                <div className="message-time mr-3 mb-2 text-xs text-right text-gray-900">{time}</div>
              </div>
            );
          })}
        </div>
        <div className="chat-input flex items-center bg-teal-50 p-3 rounded-xl mt-4">
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
      </div>
      <Footer />
    </div>
  );
}

export default Chat;
