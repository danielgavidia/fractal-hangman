import KeyboardButton from "./KeyboardButton";
import type { Keyboard } from "../../../backend/engine/engineTypes";

interface KeyboardProps {
    keyboard: Keyboard;
    //     handleKeyboardLetter: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
    keyboard,
    // handleKeyboardLetter: showLetter,
}) => {
    return (
        <div className="grid grid-cols-6">
            {keyboard.map((x, index) => {
                return (
                    <KeyboardButton
                        key={index}
                        keyboardLetterObj={x}
                    // handleKeyboardLetter={showLetter}
                    />
                );
            })}
        </div>
    );
};

export default Keyboard;
