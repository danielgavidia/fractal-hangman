import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Types
import type { LobbyGame } from "../../../backend/engine/engineTypes";

// Components
import GameStatus from "./GameStatus";
import GameProgress from "./GameProgress";

// Lobby Game
interface LobbyGameComponentProps {
	lobbyGame: LobbyGame;
}

const LobbyGameComponent: React.FC<LobbyGameComponentProps> = ({ lobbyGame }) => {
	const {
		gameId,
		gameName,
		gameWon,
		gameLive,
		dateCreated,
		difficulty,
		answerWordLength,
		guessedCorrectly,
		wrongCount,
	} = lobbyGame;

	// State
	const [copied, setCopied] = useState<boolean>(false);

	// Navigate
	const navigate = useNavigate();

	// Copy link
	const copyToClipboard = (link: string) => {
		navigator.clipboard.writeText(link).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};

	// Constants
	const link = `${import.meta.env.VITE_BASE_URL}/game/${gameId}`;
	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};
	const date = new Date(dateCreated).toLocaleDateString("en-US", options);

	return (
		<div className="flex justify-between items-center border-b-2 border-base-200 h-34 m-2 p-2">
			{/* Game title and date */}
			<div>
				<p className="text-sm p-1">{gameName}</p>
				<p className="text-[10px] text-base-300 p-1"> {date}</p>
			</div>

			{/* Difficulty */}
			<p className="text-[10px] w-10 p-1"> {difficulty}</p>

			{/* Game status */}
			<GameStatus gameWon={gameWon} gameLive={gameLive} />

			{/* Guessed correctly/incorrectly */}
			<div className="text-[10px] flex p-1">
				<p className="text-primary">{String(guessedCorrectly).padStart(2, "0")}</p>
				<p>&nbsp;/&nbsp;</p>
				<p>{String(answerWordLength).padStart(2, "0")}</p>
			</div>

			{/* Game progress */}
			<GameProgress wrongCount={wrongCount} />

			{/* Go to game */}
			<div className="w-20 h-12 p-1 text-xs">
				<button
					onClick={() => navigate(`/game/${gameId}`)}
					className="border-[0.5px] border-neutral h-full w-full hover:bg-primary"
				>
					go
				</button>
			</div>

			{/* Game link */}
			<div className="w-20 h-12 p-1 text-xs">
				<button
					onClick={() => copyToClipboard(link)}
					className="border-[0.5px] border-neutral h-full w-full hover:bg-primary"
				>
					{copied ? "Copied!" : "link"}
				</button>
			</div>
		</div>
	);
};

export default LobbyGameComponent;
