// imports
import { Server } from "socket.io";
import { getInitialGameState, getLobbyGames, move } from "./engine/engine";
import type { Game, GameServer, Difficulty, LobbyGame } from "./engine/engineTypes";

// prisma
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// port
const PORT = process.env.PORT || 4000;

// frontend URL from environment variable or use localhost for development
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// set up socket
const io = new Server(Number(PORT), {
	cors: {
		origin: FRONTEND_URL,
		methods: ["GET", "POST"],
	},
});

// get prisma game server
const getGameServer = async () => {
	try {
		const res = await prisma.gameServer.findUnique({
			where: {
				id: "d1f9edae-f973-479f-87e2-372f06a03805",
			},
		});
		if (res && typeof res.games === "string") {
			// const resObj = JSON.parse(res.games);
			// return resObj;
			return {
				id: res.id,
				games: JSON.parse(res.games),
			};
		} else {
			return {};
		}
	} catch (error) {
		console.error("Error fetching game server:", error);
		return {};
	}
};

// update game server in DB
const updateGameServer = async (gameServer: GameServer) => {
	try {
		const stringifiedServer: string = JSON.stringify(gameServer);
		const existingServer = await getGameServer();
		if (!existingServer.games) {
			await prisma.gameServer.create({
				data: {
					games: stringifiedServer,
				},
			});
		} else {
			await prisma.gameServer.update({
				where: {
					id: existingServer.id,
				},
				data: {
					games: stringifiedServer,
				},
			});
		}
	} catch (error) {
		console.error("Error updating game server:", error);
	}
};

// initialize server
const initializeServer = async () => {
	try {
		// Connect to database once at startup
		await prisma.$connect();
		let gameServerObj = await getGameServer();
		let gameServer = gameServerObj.games;
		// console.log(gameServer);

		// Connection
		io.on("connection", async (socket) => {
			console.log("User connected from:", socket.handshake.headers.origin);

			// game lobby
			socket.on("lobby", async () => {
				const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
				await updateGameServer(gameServer);
				socket.emit("games", lobbyGames);
			});

			// join game
			socket.on("joingame", async (gameId: string) => {
				console.log(`joingame, gameId: ${gameId}`);
				socket.join(gameId);
				io.sockets.in(gameId).emit("game", gameServer[gameId]);
			});

			// create game
			socket.on(
				"creategame",
				async (
					gameId: string,
					dateCreated: Date,
					gameName: string,
					difficulty: Difficulty
				) => {
					gameServer[gameId] = getInitialGameState(
						gameId,
						dateCreated,
						gameName,
						difficulty
					);
					await updateGameServer(gameServer);
					const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
					io.emit("games", lobbyGames);
				}
			);

			// move
			socket.on("move", async (gameId: string, letter: string) => {
				const game: Game = gameServer[gameId];
				const newGame: Game = move(game, letter);
				gameServer[gameId] = newGame;
				io.emit("game", gameServer[gameId]);
			});

			// disconnect
			socket.on("disconnect", async () => {
				await updateGameServer(gameServer);
				console.log("user disconnected");
			});
		});
	} catch (error) {
		console.error("Failed to initialize server:", error);
		process.exit(1);
	}
};

// Start the server
initializeServer().catch((error) => {
	console.error("Failed to start server:", error);
	process.exit(1);
});

// Handle shutdown gracefully
process.on("beforeExit", async () => {
	await prisma.$disconnect();
	process.exit(1);
});

console.log(`Server running on port ${PORT}`);
console.log(`Accepting connections from: ${FRONTEND_URL}`);
