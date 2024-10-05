// express setup
import express from "express";
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

// socket
import { Server } from "socket.io";
import { getInitialGameState, getLobbyGames, move } from "./engine/engine";
import prisma from "./prisma/prisma";
import type { Game, GameServer, Difficulty, LobbyGame } from "./engine/engineTypes";

export const io = new Server(3001, {
	cors: {
		origin: "*",
	},
});

// get prisma game server
const getGameServer = async () => {
	const res = await prisma.gameServer.findFirst({});
	if (res && typeof res.games === "string") {
		const resObj = JSON.parse(res.games);
		return resObj;
	} else {
		return {};
	}
};

// socket
io.on("connection", async (socket) => {
	console.log("User connected");
	const gameServer: GameServer = await getGameServer();

	// game lobby
	socket.on("lobby", () => {
		const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
		socket.emit("games", lobbyGames);
	});

	// join game
	socket.on("joingame", (gameId: string) => {
		console.log(`joingame, gameId: ${gameId}`);
		socket.join(gameId);
		io.sockets.in(gameId).emit("game", gameServer[gameId]);
	});

	// create game
	socket.on(
		"creategame",
		async (gameId: string, dateCreated: Date, gameName: string, difficulty: Difficulty) => {
			gameServer[gameId] = getInitialGameState(gameId, dateCreated, gameName, difficulty);
			console.log(gameServer);

			// stringify new server
			const newGameServer: string = JSON.stringify(gameServer);

			// send to prisma
			const resServer = await prisma.gameServer.findFirst({}); // get resServerId (there is only one)
			if (!resServer) {
				console.log("No game server found, creating one");
				const newResServer = await prisma.gameServer.create({
					data: {
						games: newGameServer,
					},
				});
				console.log("New GameServer created with ID:", newResServer.id);
			} else {
				// Update the existing GameServer with the new game state
				const resServerId = resServer.id;
				await prisma.gameServer.update({
					where: {
						id: resServerId,
					},
					data: {
						games: newGameServer,
					},
				});
			}
			// get lobby games
			const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
			io.emit("games", lobbyGames);
		}
	);

	// move
	socket.on("move", async (gameId: string, letter: string) => {
		const game: Game = gameServer[gameId];
		const newGame: Game = move(game, letter);
		gameServer[gameId] = newGame;
		const newGameServer: string = JSON.stringify(gameServer);

		// send to prisma
		const resServer = await prisma.gameServer.findFirst({}); // get resServerId (there is only one)
		if (!resServer) {
			console.log("No game server found, creating one");
			const newResServer = await prisma.gameServer.create({
				data: {
					games: newGameServer,
				},
			});
			console.log("New GameServer created with ID:", newResServer.id);
		} else {
			// Update the existing GameServer with the new game state
			const resServerId = resServer.id;
			await prisma.gameServer.update({
				where: {
					id: resServerId,
				},
				data: {
					games: newGameServer,
				},
			});
		}
		io.emit("game", gameServer[gameId]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
