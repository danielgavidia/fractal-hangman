import { useState } from "react";
import { Link } from "react-router-dom";
import type { LobbyGame } from "../../../backend/engine/engineTypes";

// Game Won
interface GameStatusProps {
	gameWon: boolean;
	gameLive: boolean;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameWon, gameLive }) => {
	if (gameLive) {
		return (
			<>
				<div className="text-[10px] text-primary p-1">LIVE</div>
			</>
		);
	} else if (gameWon && !gameLive) {
		return (
			<>
				<div className="text-[10px] text-success p-1">WON</div>
			</>
		);
	} else if (!gameWon && !gameLive) {
		return (
			<>
				<div className="text-[10px] text-warning p-1">LOST</div>
			</>
		);
	}
};

// Game Progress
interface GameProgressProps {
	wrongCount: number;
}

const GameProgress: React.FC<GameProgressProps> = ({ wrongCount }) => {
	const movesPlayedArr = Array.from({ length: wrongCount }, (_, index) => index);
	const movesLeftArr = Array.from({ length: 6 - wrongCount }, (_, index) => index);
	return (
		<div className="text-neutral-content flex p-1">
			{movesPlayedArr.map((_, index) => {
				return (
					<div
						key={index}
						className="text-base-300 border-[0.5px] border-neutral bg-base-300 p-2"
					></div>
				);
			})}
			{movesLeftArr.map((_, index) => {
				return (
					<div
						key={index}
						className="text-neutral-content border-[0.5px] border-neutral p-2"
					></div>
				);
			})}
		</div>
	);
};

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

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};

	const [copied, setCopied] = useState<boolean>(false);
	const copyToClipboard = (link: string) => {
		navigator.clipboard.writeText(link).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};
	const link = `${import.meta.env.VITE_BASE_URL}/game/${gameId}`;

	const date = new Date(dateCreated).toLocaleDateString("en-US", options);
	return (
		<div className="flex justify-between items-center border-b-2 border-base-200 h-34 m-2 p-2">
			<div className="w-full flex flex-col">
				<p className="text-sm p-1">{gameName}</p>
				<p className="text-[10px] text-base-300 p-1"> {date}</p>
				<div className="flex justify-between items-center h-12">
					<p className="text-[10px] w-10 p-1"> {difficulty}</p>
					<GameStatus gameWon={gameWon} gameLive={gameLive} />
					<div className="text-[10px] flex p-1">
						<p className="text-primary">{String(guessedCorrectly).padStart(2, "0")}</p>
						<p>&nbsp;/&nbsp;</p>
						<p>{String(answerWordLength).padStart(2, "0")}</p>
					</div>
					<GameProgress wrongCount={wrongCount} />
					<div className="w-20 h-full p-1 text-xs">
						<button className="border-[0.5px] border-neutral h-full w-full hover:bg-primary">
							<Link to={`/game/${gameId}`} className="w-full">
								go
							</Link>
						</button>
					</div>
					<div className="w-20 h-full p-1 text-xs">
						<button
							onClick={() => copyToClipboard(link)}
							className="border-[0.5px] border-neutral h-full w-full hover:bg-primary"
						>
							{copied ? "Copied!" : "link"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LobbyGameComponent;
