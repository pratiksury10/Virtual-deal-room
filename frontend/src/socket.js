// src/socket.js
import { io } from "socket.io-client";
const socket = io("http://localhost:5008", {
    withCredentials: true,
  });
export default socket;
