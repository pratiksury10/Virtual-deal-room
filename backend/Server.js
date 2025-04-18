const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const connectDB = require("./config/db");
const dealRoutes = require('./routes/dealRoutes');
const documentRoutes = require('./routes/documentRoutes');
const dealChatRoutes = require('./routes/dealChatRoutes');
const Deal = require("./models/Deal"); // ✅ Import Deal model

dotenv.config();
const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000", // Adjust as per frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
connectDB();

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/deals", dealRoutes);
app.use("/api/deals/chat", dealChatRoutes);
app.use("/api/documents", documentRoutes);
app.use("/uploads", express.static("uploads")); // Static file support

// ✅ Socket.io Logic
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);

  // ✅ Join a specific deal room
  socket.on("join_deal_room", ({ dealId }) => {
    socket.join(dealId);
    console.log(`🔗 Socket ${socket.id} joined room: ${dealId}`);
  });

  // ✅ Handle chat messages in deal room
  socket.on("send_message", ({ dealId, sender, message }) => {
    console.log(`📨 [${dealId}] ${sender}: ${message}`);
    io.to(dealId).emit("receive_message", {
      sender,
      message,
      timestamp: new Date(),
    });
  });

  // ✅ Handle Price Negotiation
  socket.on("priceNegotiation", async ({ dealId, newPrice }) => {
    try {
      await Deal.findByIdAndUpdate(dealId, { price: newPrice });
      io.to(dealId).emit("priceUpdate", newPrice);
      console.log(`💰 Price updated for deal ${dealId}: $${newPrice}`);
    } catch (error) {
      console.error("❌ Error updating price:", error.message);
    }
  });

  // ✅ Leave Room (optional)
  socket.on("leaveRoom", (dealId) => {
    socket.leave(dealId);
    console.log(`❌ Socket ${socket.id} left room: ${dealId}`);
  });

  // ✅ On Disconnect
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5008;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});









// const express = require("express");
    // const dotenv = require("dotenv");
    // const cors = require("cors");
    // const http = require("http"); // Required for Socket.io
    // const socketIO = require("socket.io");
    // const connectDB = require("./config/db");
    // const dealRoutes = require('./routes/dealRoutes');
    // const documentRoutes = require('./routes/documentRoutes');
    // const dealChatRoutes= require('./routes/dealChatRoutes')
    // dotenv.config();
    // const app = express();
    // const server = http.createServer(app); // Socket.io needs raw server
    // const io = socketIO(server, {
    // cors: {
    //     origin: "http://localhost:3000", // 👈 Frontend URL (change if needed)
    //     methods: ["GET", "POST"],
    //     credentials: true,
    // },
    // });

    // // Middleware
    // app.use(cors());
    // app.use(express.json());

    // // Connect to MongoDB
    // connectDB();

    // // Routes
    // app.use("/api/auth", require("./routes/authRoutes"));
    // app.use("/api/deals", require("./routes/dealRoutes"));
    // app.use('/api/deals', dealRoutes);
    // app.use('/api/deals/chat',dealChatRoutes);
    // app.use("/api/documents", documentRoutes);
    // app.use("/uploads", express.static("uploads")); // To access files


    // io.on("connection", (socket) => {
    // console.log("🟢 New client connected:", socket.id);

    // // Join a specific deal room
    // socket.on("join_deal_room", ({ dealId }) => {
    //     socket.join(dealId);
    //     console.log(`🔗 Socket ${socket.id} joined room: ${dealId}`);
    // });

    // // Handle incoming chat messages
    // socket.on("send_message", ({ dealId, sender, message }) => {
    //     console.log(`📨 [${dealId}] ${sender}: ${message}`);
    //     io.to(dealId).emit("receive_message", {
    //     sender,
    //     message,
    //     timestamp: new Date(),
    //     });
    // });

    // socket.on("disconnect", () => {
    //     console.log("❌ Client disconnected:", socket.id);
    // });
    // });

    // const PORT = process.env.PORT || 5008;
    // server.listen(PORT, () => {
    // console.log(`🚀 Server running on port ${PORT}`);
    // });







// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectDB();

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/deals", require("./routes/dealRoutes"));

// const PORT = process.env.PORT || 5008;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
