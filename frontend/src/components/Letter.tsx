interface LetterProps {
	letter: string;
	shown: boolean;
}

const Letter: React.FC<LetterProps> = ({ letter, shown }) => {
	return (
		<div className="flex w-full justify-center">
			{shown ? (
				<div className="w-full text-center h-10 flex items-center justify-center">
					<p className="border-b-2 border-black w-1/2">{letter}</p>
				</div>
			) : (
				<div className="w-full text-center h-10 flex items-center justify-center">
					<p className="border-b-2 border-black w-1/2 text-secondary-content">x</p>
				</div>
			)}
		</div>
	);
};

export default Letter;
