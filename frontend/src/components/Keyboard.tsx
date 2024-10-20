import KeyboardButton from "./KeyboardButton";
import type { Keyboard } from "../../types/engineTypes";

interface KeyboardProps {
	keyboard: Keyboard;
	gameId: string;
	move: (gameId: string, letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({ keyboard, gameId, move }) => {
	return (
		<div className="grid grid-cols-6">
			{keyboard.map((x, index) => {
				return <KeyboardButton key={index} gameId={gameId} keyboardLetterObj={x} move={move} />;
			})}
		</div>
	);
};

export default Keyboard;
