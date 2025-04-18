// src/pages/ChatRoom.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // 👈 Added this
import { io } from 'socket.io-client';
import DocumentUploader from './DocumentUploader';
import DocumentViewer from './DocumentViewer';

const ChatRoom = () => {
  const { dealId } = useParams();  // 👈 Getting dealId from URL
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socket = io(`${process.env.REACT_APP_BASE_URL}`); // ✅ Backend URL

  useEffect(() => {
    if (!dealId ) return;

    socket.emit("join_deal_room", { dealId });

    socket.on("receive_message", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [dealId]);

  const handleMessageSend = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      dealId: dealId,
      sender: "Your Name",  // 🔁 Replace with actual user later
      message: newMessage,
    };

    socket.emit("send_message", messageData);
    setNewMessage('');
  };

  const token = localStorage.getItem("token");

  // Updated styles for a cleaner look
  const chatBoxStyle = {
    padding: '15px',
    backgroundColor: '#fafafa',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxHeight: '400px',
    overflowY: 'scroll',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const messageStyle = {
    padding: '10px',
    margin: '10px 0',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    width: 'fit-content',
    maxWidth: '80%',
    wordWrap: 'break-word',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const inputStyle = {
    width: '75%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginRight: '10px',
    outline: 'none',
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={{ width: '80%', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#4A90E2', fontSize: '2rem', marginBottom: '20px' }}>
        💬 Chat Room
      </h2>
      <h4 style={{ textAlign: 'center', color: '#888', marginBottom: '30px' }}>
        Welcome to the chat for deal: <span style={{ fontWeight: 'bold', color: '#007bff' }}>{dealId}</span>
      </h4>

      {/* Chat Messages */}
      <div style={chatBoxStyle}>
        {messages.map((msg, index) => (
          <div key={index} style={messageStyle}>
            <strong style={{ color: '#007bff' }}>{msg.sender}</strong>: {msg.message}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={inputStyle}
        />
        <button
          onClick={handleMessageSend}
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Send Message
        </button>
      </div>

      {/* 📂 Document Uploader */}
      <div style={{ marginTop: '40px' }}>
        <DocumentUploader dealId={dealId} token={token} />
      </div>

      {/* 📂 Document Viewer */}
      <div style={{ marginTop: '30px' }}>
        <DocumentViewer dealId={dealId} token={token} />
      </div>
    </div>
  );
};

export default ChatRoom;