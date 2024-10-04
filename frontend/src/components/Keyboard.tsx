import KeyboardButton from "./KeyboardButton";
import type { Keyboard } from "../../../backend/engine/engineTypes";

interface KeyboardProps {
	keyboard: Keyboard;
	gameId: string;
	move: (gameId: string, letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ keyboard, gameId, move }) => {
	const keyboardSorted = keyboard.sort((a, b) => a.letter.localeCompare(b.letter));
	return (
		<div className="grid grid-cols-6">
			{keyboardSorted.map((x, index) => {
				return (
					<KeyboardButton key={index} gameId={gameId} keyboardLetterObj={x} move={move} />
				);
			})}
		</div>
	);
};

export default Keyboard;
