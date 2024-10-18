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

export default GameStatus;
