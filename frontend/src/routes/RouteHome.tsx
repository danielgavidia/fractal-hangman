// libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

// types
import { socket } from "../utils/socket";
import { Difficulty } from "../../../backend/engine/engineTypes";

type displayGame = {
	gameId: string;
	gameName: string;
};

const RouteHome = () => {
	const [games, setGames] = useState<displayGame[]>([]);
	const [gameName, setGameName] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const [difficulty, setDifficulty] = useState<Difficulty>("easy");
	const modes: Difficulty[] = ["easy", "medium", "hard"];
	const navigate = useNavigate();

	console.log(games);

	// load data via websockets
	useEffect(() => {
		socket.emit("lobby");
		// load initial game state
		socket.on("games", (games: displayGame[]) => {
			console.log(games);
			setGames(games);
		});

		// clean up
		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, []);

	function createGame(gameName: string, difficulty: Difficulty) {
		// check if gameName is blank
		if (!gameName.trim()) {
			setError(true);
		} else {
			const gameId = uuidv4();
			socket.emit("creategame", gameId, gameName, difficulty);
			setError(false);
			setGameName("");
			navigate(`/game/${gameId}`);
		}
	}

	return (
		<div className="p-4 flex justify-center bg-neutral-content h-full">
			<div className="flex flex-col bg-neutral-content w-full">
				<div className="flex flex-col bg-neutral-content w-full justify-center items-center sticky top-24 z-10">
					<p className="w-full text-center py-2 font-bold text-lg">New Game</p>
					<div className="flex w-full flex-col justify-center justify-around border-neutral mb-4">
						<input
							className="my-2 p-2 border-[0.5px] py-2 border-neutral border-black bg-neutral-content outline-none"
							placeholder="name your game here"
							type="text"
							value={gameName}
							onChange={(e) => setGameName(e.target.value)}
						></input>
						<div className="flex justify-between space-x-6 pb-4">
							{modes.map((x, index) => {
								const styling =
									x === difficulty ? "bg-primary" : "bg-neutral-content";
								return (
									<button
										key={index}
										className={
											"border-[0.5px] border-neutral p-2 w-full " + styling
										}
										onClick={() => setDifficulty(x)}
									>
										{x}
									</button>
								);
							})}
						</div>
						<button
							onClick={() => createGame(gameName, difficulty)}
							className="border-[0.5px] border-black"
						>
							Play
						</button>
						{error && (
							<p className="text-error w-full text-center p-4">
								Game name can't be blank!
							</p>
						)}
					</div>
					<p className="w-full text-center p-4 font-bold text-lg">Current Games</p>
				</div>
				<div className="overflow-y-auto scrollbar-hide flex-grow border-[0.5px] border-neutral mb-4">
					{games.map((game, index) => {
						return (
							<div
								key={index}
								className="flex justify-between items-center border-b-2 border-base-200 h-20 mx-4"
							>
								<p className="text-sm">{game.gameName}</p>
								<Link className="btn btn-outline" to={`/game/${game.gameId}`}>
									go
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default RouteHome;
