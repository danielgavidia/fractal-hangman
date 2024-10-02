import { alphabet } from "./alphabet";

// keyboard button
interface KeyboardButtonProps {
	letter: string;
	showLetter: (letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({ letter, showLetter }) => {
	return (
		<div className="border-2 rounded-lg">
			<button onClick={() => showLetter(letter)} className="w-full h-full">
				{letter}
			</button>
		</div>
	);
};

// keyboard
interface KeyboardProps {
	showLetter: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ showLetter }) => {
	return (
		<div className="flex grid grid-cols-10">
			{alphabet.map((x, index) => {
				return <KeyboardButton key={index} letter={x} showLetter={showLetter} />;
			})}
		</div>
	);
};

export default Keyboard;
