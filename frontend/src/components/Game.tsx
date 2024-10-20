// libraries
import React, { useState, useEffect } from "react";

// components
import Keyboard from "./Keyboard";
import AnswerWord from "./AnswerWord";
import Hangman from "./Hangman";

// types
import type { Game } from "../../types/engineTypes";

// utils
import GameOverModal from "./GameOverModal";
import { socket } from "../utils/socket";

// app
interface GameProps {
	id: string;
}

const Game: React.FC<GameProps> = ({ id }) => {
	const [game, setGame] = useState<Game | undefined>(undefined);

	// load data via websockets
	useEffect(() => {
		// load initial game state
		socket.emit("joingame", id); // the server needs to know I joined this game.
		socket.on("game", (game: Game) => {
			setGame(game);
		});

		// clean up
		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, [id]);

	function move(gameId: string, letter: string) {
		socket.emit("move", gameId, letter);
	}

	return (
		<div className="w-5/6 bg-neutral-content">
			{game ? ( // Check if game is defined
				game.gameLive ? (
					<div>
						<Hangman game={game} />
						<AnswerWord answerWord={game.answerWord} />
						<Keyboard keyboard={game.keyboard} move={move} gameId={id} />
					</div>
				) : (
					<div>
						<GameOverModal game={game} />
					</div>
				)
			) : (
				<div>Loading...</div> // Optionally show a loading state
			)}
		</div>
	);
};

export default Game;
