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
	const stylingCorrect = () => {
		if (keyboardLetter.correct && !keyboardLetter.enabled) {
			return "bg-green-300";
		} else if (!keyboardLetter.correct && !keyboardLetter.enabled) {
			return "bg-yellow-300";
		}
	};
	const styling = stylingCorrect();
	return (
		<div className={"border-2 border-gray-200 m-1 rounded-lg " + styling}>
			{keyboardLetter.enabled ? (
				<button
					onClick={() => showLetter(keyboardLetter.keyboardLetter)}
					className="w-full h-full"
				>
					{keyboardLetter.keyboardLetter}
				</button>
			) : (
				<button className={"w-full h-full"}>{keyboardLetter.keyboardLetter}</button>
			)}
		</div>
	);
};

export default KeyboardButton;
