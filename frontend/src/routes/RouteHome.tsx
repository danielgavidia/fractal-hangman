import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isValidWord = (input: string): boolean => {
	const alphaOnlyRegex = /^[A-Za-z]+$/;
	return alphaOnlyRegex.test(input);
};

const RouteHome = () => {
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
	return (
		<div className="p-4">
			<div className="flex flex-col">
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
		</div>
	);
};

export default RouteHome;
