import { Server } from "socket.io";
import { getInitialGameState, getLobbyGames, move } from "./engine/engine";
import type { GameServer, Difficulty, Game, LobbyGame } from "./engine/engineTypes";

const port = Number(process.env.PORT) || 3000;
const gameServer: GameServer = {};

export const io = new Server(port, {
	cors: {
		origin: "*",
	},
});

console.log("Server running on port ", port);

io.on("connection", (socket) => {
	console.log("User connected");

	socket.on("lobby", () => {
		const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
		socket.emit("games", lobbyGames);
	});

	socket.on("joingame", (gameId: string) => {
		socket.join(gameId);
		io.sockets.in(gameId).emit("game", gameServer[gameId]);
	});

	socket.on(
		"creategame",
		(gameId: string, dateCreated: Date, gameName: string, difficulty: Difficulty) => {
			gameServer[gameId] = getInitialGameState(gameId, dateCreated, gameName, difficulty);
			const lobbyGames: LobbyGame[] = getLobbyGames(gameServer);
			io.emit("games", lobbyGames);
		}
	);

	socket.on("move", (gameId: string, letter: string) => {
		const game: Game = gameServer[gameId];
		const newGame: Game = move(game, letter);
		gameServer[gameId] = newGame;
		io.emit("game", gameServer[gameId]);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
