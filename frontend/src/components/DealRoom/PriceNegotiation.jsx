// src/components/DealRoom/PriceNegotiation.jsx
import React, { useState } from "react";

const PriceNegotiation = ({ dealId, currentPrice, onPriceNegotiation }) => {
  const [newPrice, setNewPrice] = useState("");

  const handleSubmit = () => {
    if (newPrice) {
      onPriceNegotiation(Number(newPrice)); // Notify the parent component about the new price
      setNewPrice(""); // Clear the input field after submission
    }
  };

  return (
    <div>
      <h3>Negotiate Price</h3>
      <p>Current Price: ${currentPrice}</p>
      <input
        type="number"
        value={newPrice}
        onChange={(e) => setNewPrice(e.target.value)}
        placeholder="Enter new price"
      />
      <button onClick={handleSubmit}>Submit Price</button>
    </div>
  );
};

export default PriceNegotiation;






// // src/components/DealRoom/PriceNegotiation.jsx
// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");  // Connect to Socket.io server

// const PriceNegotiation = ({ dealId }) => {
//   const [price, setPrice] = useState(0);
//   const [negotiatedPrice, setNegotiatedPrice] = useState(0);

//   useEffect(() => {
//     // Listen for price updates from the server
//     socket.on("priceUpdate", (data) => {
//       if (data.dealId === dealId) {
//         setNegotiatedPrice(data.price); // Update the price when it's changed
//       }
//     });

//     return () => {
//       socket.off("priceUpdate"); // Clean up when component unmounts
//     };
//   }, [dealId]);

//   const handlePriceChange = (e) => {
//     setPrice(e.target.value);
//   };

//   const handleSubmitPrice = () => {
//     // Emit price negotiation event to the server
//     socket.emit("priceNegotiation", { dealId, price });
//   };

//   return (
//     <div>
//       <h3>Negotiate Price</h3>
//       <div>
//         <p>Current Price: ${negotiatedPrice || "No price set yet"}</p>
//       </div>
//       <input
//         type="number"
//         value={price}
//         onChange={handlePriceChange}
//         placeholder="Enter your proposed price"
//       />
//       <button onClick={handleSubmitPrice}>Submit Price</button>
//     </div>
//   );
// };

// export default PriceNegotiation;
