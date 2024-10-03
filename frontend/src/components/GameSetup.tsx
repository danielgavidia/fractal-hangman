import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAnswerWord, isValidWord } from "../../../backend/engine/getInitialGameState";
import type { Game, Difficulty } from "../../../backend/engine/engineTypes";

import { socket } from "../utils/socket"

interface GameSetupProps {
    game: Game;
}

const GameSetup: React.FC<GameSetupProps> = ({ game }) => {
    const [word, setWord] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    const gameMode = game.gameMode

    // 1 v 1 handler
    const handleVersusPerson = (e: React.FormEvent) => {
        e.preventDefault();
        const validWordBoolean = isValidWord(word);
        if (validWordBoolean) {
            const newAnswerWord = getAnswerWord(word)
            const newGame = { ...game, answerWord: newAnswerWord }
            socket.emit("move", newGame)
            navigate("/game");
        } else {
            setError(true);
        }
    };

    // 1 v C handler
    const handleVersusComputer = async (difficulty: Difficulty) => {
        const res = await axios({
            method: "POST",
            url: "http://localhost:3000/word",
            data: {
                difficulty: difficulty,
            },
        });
        const word = res.data.resOpenai;
        const validWordBoolean = isValidWord(res.data.resOpenai);
        if (validWordBoolean) {
            const newAnswerWord = getAnswerWord(word)
            const newGame = { ...game, answerWord: newAnswerWord }
            socket.emit("move", newGame)
            navigate("/game");
        } else {
            setError(true);
        }
    };

    if (gameMode === "1v1") {
        return (
            <div>
                <div className="w-full flex justify-center my-4">1 v 1</div>
                <form onSubmit={handleVersusPerson} className="flex justify-between">
                    <div className="flex-1 border-2 border-gray-200 rounded-lg mr-4 flex items-center">
                        <input
                            type="password"
                            placeholder="Input word"
                            className="p-2 rounded-lg w-full outline-none h-full"
                            onChange={(e) => setWord(e.target.value)}
                        />
                    </div>
                    <div className="btn">
                        <button type="submit">Go to game</button>
                    </div>
                </form>
                <div className="w-full flex text-center p-2">
                    {error ? (
                        <p className="text-red-500 w-full">
                            Invalid word. Must be a single word, only ABC characters! Try again!
                        </p>
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        );
    } else if (gameMode === "1vC") {
        return (
            <div>
                <div className="w-full flex justify-center my-4">1 v Machine</div>
                <div className="flex w-full justify-around">
                    <div className="w-1/4">
                        <button className="btn w-full" onClick={() => handleVersusComputer("easy")}>
                            Easy
                        </button>
                    </div>
                    <div className="w-1/4">
                        <button className="btn w-full" onClick={() => handleVersusComputer("medium")}>
                            Medium
                        </button>
                    </div>
                    <div className="w-1/4">
                        <button className="btn w-full" onClick={() => handleVersusComputer("hard")}>
                            Hard
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default GameSetup;
