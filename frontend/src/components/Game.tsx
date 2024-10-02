import { useState, useEffect } from "react";
import { alphabet } from "../utils/alphabet";
import { hangmanStages } from "../utils/hangman";
import Letter from "./Letter";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";

// convert word to array of {letter: string, shown: boolean}
const getLetterArray = (word: string) => {
	const arr = word.split("");
	const arrObj = arr.map((x) => ({ letter: x, shown: false }));
	return arrObj;
};

// convert alphabet array to array of {keyboardLetter: string, enabled: boolean, correct: boolean}
const getKeyboardLetterArray = (alphabet: string[]) => {
	const arr = alphabet.map((x) => ({
		keyboardLetter: x,
		enabled: true,
		correct: true,
	}));
	return arr;
};

// convert hangman array to array of {stage: number, figure: string}
const getHangmanArray = (hangmanStages: string[]) => {
	const arr = hangmanStages.map((x, index) => ({
		stage: index,
		figure: x,
	}));
	return arr;
};

// Game
interface Game {
	word: string;
}

const Game: React.FC<Game> = ({ word }) => {
	const maxWrong = 6;
	const [lettersArr, setLettersArr] = useState(getLetterArray(word));
	const [keyboardLetters, setKeyboardLetters] = useState(getKeyboardLetterArray(alphabet));
	const [wrongMoveCount, setWrongMoveCount] = useState<number>(0);
	const [won, setWon] = useState<boolean>(false);
	const [gameLive, setGameLive] = useState<boolean>(true);
	const hangmanArray = getHangmanArray(hangmanStages);

	// logic for showing letters
	const handleKeyboardLetter = (letter: string): void => {
		// show answer letters
		const newLetters = lettersArr.map((x) => {
			if (x.letter === letter) {
				return { ...x, shown: true };
			} else {
				return x;
			}
		});
		setLettersArr(newLetters);

		// mutate keyboardLetters for disabled
		const newKeyboardLetters = keyboardLetters.map((x) => {
			// check if keyboardLetter exists in lettersArr (answer letters)
			if (
				lettersArr.map((x) => x.letter).includes(x.keyboardLetter) &&
				letter === x.keyboardLetter
			) {
				// if it exists, change enabled to false and correct to true
				return { ...x, enabled: false, correct: true };
			} else if (
				!lettersArr.map((x) => x.letter).includes(x.keyboardLetter) &&
				letter === x.keyboardLetter
			) {
				// if it does not exist, change enabled to false and correct to false
				return { ...x, enabled: false, correct: false };
			} else {
				return x;
			}
		});
		setKeyboardLetters(newKeyboardLetters);
	};

	// useEffect for updating moveCount and win-lose
	useEffect(() => {
		// losing functionality
		const wrongMoves = keyboardLetters.filter((x) => !x.correct);
		setWrongMoveCount(wrongMoves.length);
		if (wrongMoves.length === maxWrong) {
			setWon(false);
			setGameLive(false);
		}

		// winning functionality
		const correctLetters = lettersArr.filter((x) => x.shown === true);
		if (correctLetters.length === lettersArr.length) {
			setWon(true);
			setGameLive(false);
		}
	}, [keyboardLetters]);

	return (
		<div>
			{gameLive ? (
				<div>
					<div>Won game: {won.toString()}</div>
					<div>Max # of wrong moves allowed: {maxWrong}</div>
					<div>Current # of wrong moves: {wrongMoveCount}</div>
					<div>
						<div>The Hangman</div>
						<pre className="font-mono">
							{hangmanArray.find((x) => x.stage === wrongMoveCount)?.figure}
						</pre>
					</div>
					<div className="flex justify-between">
						{lettersArr.map((x, index) => {
							return <Letter key={index} letter={x.letter} shown={x.shown} />;
						})}
					</div>
					<Keyboard
						keyboardLetters={keyboardLetters}
						handleKeyboardLetter={handleKeyboardLetter}
					/>
				</div>
			) : (
				<GameOverModal won={won} word={word} />
			)}
		</div>
	);
};

export default Game;
