// libraries
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// types
import { socket } from "../utils/socket";
import { Difficulty } from "../../../backend/engine/engineTypes";

const RouteHome = () => {
	const [games, setGames] = useState<string[]>([]);
	const [gameId, setGameId] = useState("");
	const [difficulty, setDifficulty] = useState<Difficulty>("easy");
	const modes: Difficulty[] = ["easy", "medium", "hard"];

	// load data via websockets
	useEffect(() => {
		socket.emit("lobby");
		// load initial game state
		socket.on("games", (games: string[]) => {
			console.log(games);
			setGames(games);
		});

		// clean up
		return () => {
			socket.off("connect");
			socket.off("disconnect");
		};
	}, []);

	function createGame(difficulty: Difficulty) {
		socket.emit("creategame", gameId, difficulty);
	}

	return (
		<div className="p-4 flex justify-center bg-neutral-content h-full">
			<div className="flex flex-col bg-neutral-content w-full">
				<div className="flex flex-col bg-neutral-content w-full justify-center items-center sticky top-24 z-10">
					<p className="w-full text-center py-2 font-bold text-lg">New Game</p>
					<div className="flex w-full flex-col justify-center justify-around border-neutral">
						<input
							className="my-2 p-2 border-[0.5px] py-2 border-neutral border-black bg-neutral-content outline-none"
							placeholder="name your game here"
							type="text"
							value={gameId}
							onChange={(e) => setGameId(e.target.value)}
						></input>
						<div className="flex justify-between space-x-6 pb-4">
							{modes.map((x) => {
								const styling =
									x === difficulty ? "bg-primary" : "bg-neutral-content";
								return (
									<button
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
							onClick={() => createGame(difficulty)}
							className="mb-10 border-[0.5px] border-black"
						>
							Play
						</button>
					</div>
					<p className="w-full text-center p-4 font-bold text-lg">Current Games</p>
				</div>
				<div className="overflow-y-auto scrollbar-hide flex-grow">
					{games.map((gameId, index) => {
						return (
							<div
								key={index}
								className="flex justify-between items-center border-b-2 border-base-200 h-20 mx-4"
							>
								<p className="text-sm">{gameId}</p>
								<Link className="btn btn-outline" to={`/game/${gameId}`}>
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
