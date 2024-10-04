import type { KeyboardLetterObj } from "../../../backend/engine/engineTypes";

interface KeyboardButtonProps {
	gameId: string;
	keyboardLetterObj: KeyboardLetterObj;
	move: (gameId: string, letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({ gameId, keyboardLetterObj, move }) => {
	const { letter, correct, enabled } = keyboardLetterObj;

	const styling = () => {
		if (correct && enabled) {
			return "w-full border-[0.5px] border-neutral";
		} else if (correct && !enabled) {
			return "w-full border-[0.5px] border-none bg-error text-neutral-content";
		} else if (!correct && !enabled) {
			return "w-full border-[0.5px] border-base-100 bg-base-200 text-base-300";
		}
	};
	// const styling = styling();
	return (
		<div className={"m-1"}>
			{enabled ? (
				<button onClick={() => move(gameId, letter)} className={styling()}>
					{letter}
				</button>
			) : (
				<button className={styling()}>{letter}</button>
			)}
		</div>
	);
};

export default KeyboardButton;
