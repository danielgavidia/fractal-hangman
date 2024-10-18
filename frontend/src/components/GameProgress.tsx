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
					<div key={index} className="text-neutral-content border-[0.5px] border-neutral p-2"></div>
				);
			})}
		</div>
	);
};

export default GameProgress;
