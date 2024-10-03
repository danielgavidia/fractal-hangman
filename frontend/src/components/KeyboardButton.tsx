import type { KeyboardLetterObj } from "../../../backend/engine/engineTypes";

interface KeyboardButtonProps {
    keyboardLetterObj: KeyboardLetterObj;
    move: (letter: string) => void;
}

const KeyboardButton: React.FC<KeyboardButtonProps> = ({
    keyboardLetterObj,
    move,
}) => {
    const { letter, correct, enabled } = keyboardLetterObj

    const stylingCorrect = () => {
        if (correct && !enabled) {
            return "bg-error border-error text-neutral-content";
        } else if (!correct && !enabled) {
            return "bg-base-200 border-base-200 text-base-300";
        }
    };
    const styling = stylingCorrect();
    return (
        <div className={"border-2 border-neutral m-1 rounded-lg " + styling}>
            {enabled ? (
                <button
                    onClick={() => move(letter)}
                    className="w-full h-full hover:bg-base-300 rounded-md"
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
