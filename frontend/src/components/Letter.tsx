interface LetterProps {
	letter: string;
	shown: boolean;
}

const Letter: React.FC<LetterProps> = ({ letter, shown }) => {
	return (
		<div className="flex w-full justify-center">
			{shown ? <div className="w-full text-center">{letter}</div> : <div></div>}
		</div>
	);
};

export default Letter;
