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
// setup
import { Server } from "socket.io";
import {
	getInitialGameState,
	getLobbyGames,
	getLobbyGames2,
	getGame,
	move,
	move2,
} from "../engine/engine";
import type { GameServer, Difficulty, Game, LobbyGame } from "../engine/engineTypes";
import prisma from "../prisma/prisma";

const gameServer: GameServer = {};

export const io = new Server(3001, {
	cors: {
		origin: "*",
	},
});

// logic
io.on("connection", async (socket) => {
	console.log("User connected");
	socket.on("lobby", async () => {
		const lobbyGames = await getLobbyGames2();
		console.log(lobbyGames);
		socket.emit("games", lobbyGames);
	});

	socket.on("joingame", async (gameId: string) => {
		// console.log(await getGame(gameId));
		socket.join(gameId);
		const game = (await getGame(gameId)) as Game;
		io.sockets.in(gameId).emit("game", game);
	});

	socket.on(
		"creategame",
		(gameId: string, dateCreated: Date, gameName: string, difficulty: Difficulty) => {
			gameServer[gameId] = getInitialGameState(gameId, dateCreated, gameName, difficulty);
			const lobbyGames = getLobbyGames(gameServer);
			io.emit("games", lobbyGames);
		}
	);

	socket.on("move", async (gameId: string, letter: string) => {
		const newGame = await move2(gameId, letter);
		const game = (await getGame(gameId)) as Game;
		// gameServer[gameId] = newGame;
		io.emit("game", game);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
