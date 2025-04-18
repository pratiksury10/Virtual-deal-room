// components/ChatPage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DocumentUploader from "./DocumentUploader";
import DocumentViewer from "./DocumentViewer";

const ChatPage = () => {
  const { dealId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch chat messages for the deal
  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/deals/${dealId}/chat`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChatMessages(response.data);
      } catch (err) {
        console.error("Error fetching chat messages:", err);
      }
    };

    fetchChatMessages();
  }, [dealId]);

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return; // Do nothing if message is empty

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/deals/${dealId}/chat`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Add new message to the state
      setChatMessages((prevMessages) => [...prevMessages, response.data]);
      setNewMessage(""); // Clear the input field
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div>
      <h2>Chat for Deal {dealId}</h2>
      <div>
        {chatMessages.length === 0 ? (
          <p>No messages yet. Start chatting!</p>
        ) : (
          <ul>
            {chatMessages.map((msg) => (
              <li key={msg._id}>
                <strong>{msg.userId.email}</strong>: {msg.message}
              </li>
            ))}
          </ul>
        )}
      </div>
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
        rows="4"
        style={{ width: "100%", padding: "10px", marginTop: "20px" }}
      />
      <button
        onClick={handleSendMessage}
        style={{
          padding: "10px 20px",
          marginTop: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send Message
      </button>

      <div className="mt-8">
        <DocumentUploader dealId={dealId} token={token} />
      </div>

      {/* 📂 Document Viewer */}
      <div className="mt-6">
        <DocumentViewer dealId={dealId} token={token} />
      </div>
    </div>
  );
};

export default ChatPage;
