import express from "express";

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
// #endregion

// socket
import { Server } from "socket.io";
import { getInitialGameState, move } from "./engine/engine";
import type { Difficulty, Game } from "./engine/engineTypes";

type GameServer = {
	[id: string]: Game;
};

const gameServer: GameServer = {};

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

	socket.on("creategame", (gameId: string, difficulty: Difficulty) => {
		// todo just give all the games unique ids and then give them game names as well, and handle rendering of this on the client
		gameServer[gameId] = getInitialGameState(gameId, difficulty);
		io.emit("games", Object.keys(gameServer));
	});

	socket.on("move", (gameId: string, letter: string) => {
		const game = gameServer[gameId];
		const newGame = move(game, letter);
		gameServer[gameId] = newGame;
		io.emit("game", gameServer[gameId]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
