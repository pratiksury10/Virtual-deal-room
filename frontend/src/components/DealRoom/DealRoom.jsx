// src/components/DealRoom/DealRoom.jsx
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import PriceNegotiation from "./PriceNegotiation"; // Import PriceNegotiation component

const DealRoom = ({ dealId, initialPrice }) => {
  const [price, setPrice] = useState(initialPrice || 0);
  const [messages, setMessages] = useState([]);
  const socket = io(`${process.env.REACT_APP_BASE_URL}`); // Make sure the socket is connected to the correct server

  // Listen for price updates from the server
  useEffect(() => {
    socket.emit("joinRoom", dealId); // Join the deal room

    // Listen for price update events from the server
    socket.on("priceUpdate", (newPrice) => {
      setPrice(newPrice); // Update price when it's changed
    });

    // Listen for messages (if you have messaging as part of the deal room)
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.emit("leaveRoom", dealId); // Leave the room when the component unmounts
      socket.disconnect(); // Disconnect the socket
    };
  }, [dealId, socket]);

  // Function to handle price negotiation
  const handlePriceNegotiation = (newPrice) => {
    if (newPrice !== price) {
      setPrice(newPrice); // Update local price immediately
      socket.emit("priceNegotiation", { dealId, newPrice }); // Emit new price to the server
    }
  };

  return (
    <div>
      <h1>Deal Room: {dealId}</h1>
      <p>Current Price: ${price}</p>

      {/* Pass the current deal ID and price to the PriceNegotiation component */}
      <PriceNegotiation dealId={dealId} currentPrice={price} onPriceNegotiation={handlePriceNegotiation} />
      
      <div>
        <h3>Messages</h3>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealRoom;