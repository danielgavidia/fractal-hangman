import { io, Socket } from "socket.io-client";

// Determine the correct protocol and URL based on the environment
export const socket: Socket = io(
	window.location.hostname === "localhost"
		? "http://localhost:3000" // Use ws:// for development
		: `wss://${window.location.hostname}` // Use wss:// for production
);

// export const socket: Socket = io(import.meta.env.VITE_BACKEND_URL);
