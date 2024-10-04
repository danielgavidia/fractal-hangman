import type { KeyboardLetterObj } from "../../../backend/engine/engineTypes";

interface KeyboardButtonProps {
    gameId: string;
    keyboardLetterObj: KeyboardLetterObj;
    move: (gameId: string, letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
    gameId,
    keyboardLetterObj,
    move,
}) => {
    const { letter, correct, enabled } = keyboardLetterObj

    const stylingCorrect = () => {
        if (correct && !enabled) {
            return "bg-error border-none text-neutral-content";
        } else if (!correct && !enabled) {
            return "bg-base-200 border-base-100 text-base-300 hover:border-base-100";
        }
    };
    const styling = stylingCorrect();
    return (
        <div className={"m-1 rounded-lg border-2 border-neutral " + styling}>
            {enabled ? (
                <button
                    onClick={() => move(gameId, letter)}
                    className="w-full h-full hover:bg-accent rounded-md"
                >
                    {letter}
                </button>
            ) : (
                <button className={"w-full h-full"}>{letter}</button>
            )}
        </div>
    );
};

export default KeyboardButton;
