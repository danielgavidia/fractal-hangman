import { io, Socket } from "socket.io-client";

// Determine the correct protocol and URL based on the environment
const port = window.location.hostname === "localhost" ? 3000 : 3000;
const protocol = window.location.protocol === "https:" ? "wss" : "ws";

export const socket: Socket = io(`${protocol}://${window.location.hostname}:${port}`);

// export const socket: Socket = io(import.meta.env.VITE_BACKEND_URL);
