import { io, Socket } from "socket.io-client";

// Determine the correct WebSocket protocol and URL
const protocol = window.location.protocol === "https:" ? "wss" : "ws";
const port = window.location.hostname === "localhost" ? 3000 : ""; // Leave port blank for production

// Construct the WebSocket URL without port in production
const socketUrl = port
	? `${protocol}://${window.location.hostname}:${port}`
	: `${protocol}://${window.location.hostname}`;

// Initialize the socket connection
export const socket: Socket = io(socketUrl);
