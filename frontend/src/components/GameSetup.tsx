import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const isValidWord = (input: string): boolean => {
	const alphaOnlyRegex = /^[A-Za-z]+$/;
	return alphaOnlyRegex.test(input);
};

type difficulty = "easy" | "medium" | "hard";

interface GameSetup {
	gameMode: string;
}

const GameSetup: React.FC<GameSetup> = ({ gameMode }) => {
	const [word, setWord] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		const validWordBoolean = isValidWord(word);
		if (validWordBoolean) {
			e.preventDefault();
			setWord("");
			navigate("/game", { state: { word: word } });
		} else {
			e.preventDefault();
			setError(true);
		}
	};

	const handleVersusComputer = async (difficulty: difficulty) => {
		const res = await axios({
			method: "POST",
			url: "http://localhost:3000/word",
			data: {
				difficulty: difficulty,
			},
		});
		const word = res.data.resOpenai;
		const validWordBoolean = isValidWord(res.data.resOpenai);
		if (validWordBoolean) {
			setWord("");
			navigate("/game", { state: { word: word } });
		} else {
			setError(true);
		}
		navigate("/game", { state: { word: word } });
	};

	if (gameMode === "1v1") {
		return (
			<div>
				<div className="w-full flex justify-center my-4">1 v 1</div>
				<form onSubmit={handleSubmit} className="flex justify-between">
					<div className="flex-1 border-2 border-gray-200 rounded-lg mr-4 flex items-center">
						<input
							type="text"
							placeholder="Input word"
							className="p-2 rounded-lg w-full outline-none"
							onChange={(e) => setWord(e.target.value)}
						/>
					</div>
					<div className="btn">
						<button type="submit">Go to game</button>
					</div>
				</form>
				<div className="w-full flex text-center p-2">
					{error ? (
						<p className="text-red-500 w-full">
							Invalid word. Must be a single word, only ABC characters! Try again!
						</p>
					) : (
						<p></p>
					)}
				</div>
			</div>
		);
	} else if (gameMode === "1vC") {
		return (
			<div>
				<div className="w-full flex justify-center my-4">1 v Machine</div>
				<div className="flex w-full justify-around">
					<div className="w-1/4 border-2 border-200-gray rounded-lg">
						<button className="w-full" onClick={() => handleVersusComputer("easy")}>
							Easy
						</button>
					</div>
					<div className="w-1/4 border-2 border-200-gray rounded-lg">
						<button className="w-full" onClick={() => handleVersusComputer("medium")}>
							Medium
						</button>
					</div>
					<div className="w-1/4 border-2 border-200-gray rounded-lg">
						<button className="w-full" onClick={() => handleVersusComputer("hard")}>
							Hard
						</button>
					</div>
				</div>
			</div>
		);
	} else {
		return <div></div>;
	}
};

export default GameSetup;
