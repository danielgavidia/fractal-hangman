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
				<div className="text-[10px] text-primary">LIVE</div>
			</>
		);
	} else if (gameWon && !gameLive) {
		return (
			<>
				<div className="text-[10px] text-success">WON</div>
			</>
		);
	} else if (!gameWon && !gameLive) {
		return (
			<>
				<div className="text-[10px] text-warning">LOST</div>
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
		<div className="text-neutral-content flex px-2">
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
	const date = new Date(dateCreated).toLocaleDateString("en-US", options);
	console.log(gameLive);
	return (
		<div className="flex justify-between items-center border-b-2 border-base-200 h-20 mx-4">
			<div className="w-full flex flex-col">
				<p className="text-sm">{gameName}</p>
				<div className="flex justify-between items-end">
					<p className="text-[10px] text-base-300"> {date}</p>
					<p className="text-[10px] w-10"> {difficulty}</p>
					<GameStatus gameWon={gameWon} gameLive={gameLive} />
					<div className="text-[10px] flex">
						<p className="text-primary">{String(guessedCorrectly).padStart(2, "0")}</p>
						<p>&nbsp;/&nbsp;</p>
						<p>{String(answerWordLength).padStart(2, "0")}</p>
					</div>
					<GameProgress wrongCount={wrongCount} />
				</div>
			</div>
			<Link className="btn btn-outline" to={`/game/${gameId}`}>
				go
			</Link>
		</div>
	);
};

export default LobbyGameComponent;
