import express from "express";
import openaiChatCompletions from "./openai";

// setup
// #region
export const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// routes
app.post("/word", async (req, res) => {
	const { difficulty } = req.body;
	const resOpenai = await openaiChatCompletions(difficulty);
	res.status(200).json({ resOpenai: resOpenai });
});

// socket
import { Server } from "socket.io";
import { getInitialGameState } from "./engine/getInitialGameState";
import type { Game } from "./engine/engineTypes";

type GameServer = {
	[id: string]: Game;
};

const gameServer: GameServer = {
	game1: getInitialGameState("game1"),
};

export const io = new Server(3001, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("lobby", () => {
		socket.emit("games", Object.keys(gameServer));
	});

	socket.on("joingame", (gameId: string) => {
		socket.join(gameId); // they're joining the room for this gameId
		io.sockets.in(gameId).emit("game", gameServer[gameId]);
	});

	socket.on("creategame", (gameId: string) => {
		// todo just give all the games unique ids and then give them game names as well, and handle rendering of this on the client
		gameServer[gameId] = getInitialGameState(gameId);
		io.emit("games", Object.keys(gameServer));
	});

	socket.on("move", (uniqueId: string, letter: string) => {
		// todo
		// Update data
		// games = games.map((x) => {
		// 	if (x.uniqueId === newGame.uniqueId) {
		// 		return newGame;
		// 	} else {
		// 		return x;
		// 	}
		// });
		// // Broadcast to everyone except the sender
		// socket.broadcast.emit("games", games);
		// // Emit to all clients including the sender
		// io.emit("games", games);
		// this isn't good enough, because I need to update ALL the players in that lobby.
		socket.broadcast;
		io.emit("game", gameServer[uniqueId]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
