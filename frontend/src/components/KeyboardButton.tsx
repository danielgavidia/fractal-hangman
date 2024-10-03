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
            return "bg-green-300";
        } else if (!correct && !enabled) {
            return "bg-yellow-300";
        }
    };
    const styling = stylingCorrect();
    return (
        <div className={"border-2 border-gray-200 m-1 rounded-lg " + styling}>
            {enabled ? (
                <button
                    onClick={() => move(letter)}
                    className="w-full h-full"
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
