import KeyboardButton from "./KeyboardButton";
import type { Keyboard } from "../../../backend/engine/engineTypes";

interface KeyboardProps {
    keyboard: Keyboard;
    move: (letter: string) => void;
}

const Keyboard: React.FC<KeyboardProps> = ({
    keyboard,
    move,
}) => {
    return (
        <div className="grid grid-cols-6">
            {keyboard.map((x, index) => {
                return (
                    <KeyboardButton
                        key={index}
                        keyboardLetterObj={x}
                        move={move}
                    />
                );
            })}
        </div>
    );
};

export default Keyboard;
