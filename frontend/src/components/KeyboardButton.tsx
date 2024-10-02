type keyboardLetter = {
	keyboardLetter: string;
	enabled: boolean;
	correct: boolean;
};

interface KeyboardButtonProps {
	keyboardLetter: keyboardLetter;
	handleKeyboardLetter: (letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
	keyboardLetter,
	handleKeyboardLetter: showLetter,
}) => {
	const stylingCorrect = keyboardLetter.correct ? "" : "bg-yellow-200";
	return (
		<div className="border-2 rounded-lg">
			{keyboardLetter.enabled ? (
				<button
					onClick={() => showLetter(keyboardLetter.keyboardLetter)}
					className="w-full h-full"
				>
					{keyboardLetter.keyboardLetter}
				</button>
			) : (
				<button className={"w-full h-full bg-gray-200 " + stylingCorrect}>
					{keyboardLetter.keyboardLetter}
				</button>
			)}
		</div>
	);
};

export default KeyboardButton;
