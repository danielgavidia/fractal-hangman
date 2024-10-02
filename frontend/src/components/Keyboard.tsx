import KeyboardButton from "./KeyboardButton";

type keyboardLetter = {
	keyboardLetter: string;
	enabled: boolean;
	correct: boolean;
};

interface KeyboardProps {
	keyboardLetters: keyboardLetter[];
	handleKeyboardLetter: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
	keyboardLetters,
	handleKeyboardLetter: showLetter,
}) => {
	return (
		<div className="flex grid grid-cols-10">
			{keyboardLetters.map((x, index) => {
				return (
					<KeyboardButton
						key={index}
						keyboardLetter={x}
						handleKeyboardLetter={showLetter}
					/>
				);
			})}
		</div>
	);
};

export default Keyboard;
