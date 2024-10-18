import { io, Socket } from "socket.io-client";

export const socket: Socket = io(
	window.location.hostname === "localhost" ? "http://localhost:3000" : "http://fractal-hangman.com"
);

// export const socket: Socket = io(import.meta.env.VITE_BACKEND_URL);
