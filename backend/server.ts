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
import { getInitialGameState, getLobbyGames, move } from "./engine/engine";
import type { GameServer, Difficulty, Game, LobbyGame } from "./engine/engineTypes";

const gameServer: GameServer = {};

export const io = new Server(3001, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("lobby", () => {
		const lobbyGames = getLobbyGames(gameServer);
		socket.emit("games", lobbyGames);
	});

	socket.on("joingame", (gameId: string) => {
		console.log(`joingame, gameId: ${gameId}`);
		socket.join(gameId);
		io.sockets.in(gameId).emit("game", gameServer[gameId]);
	});

	socket.on(
		"creategame",
		(gameId: string, dateCreated: Date, gameName: string, difficulty: Difficulty) => {
			gameServer[gameId] = getInitialGameState(gameId, dateCreated, gameName, difficulty);
			const lobbyGames = getLobbyGames(gameServer);
			io.emit("games", lobbyGames);
		}
	);

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
