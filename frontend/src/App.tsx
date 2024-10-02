import { useState } from "react";
import { alphabet } from "./components/alphabet";

import Letter from "./components/Letter";
import Keyboard from "./components/Keyboard";

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

const App = () => {
	const word = "kaleidoscope";
	const [lettersArr, setLettersArr] = useState(getLetterArray(word));
	const [keyboardLetters, setKeyboardLetters] = useState(getKeyboardLetterArray(alphabet));
	console.log(keyboardLetters);

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
	return (
		<div>
			<br />
			<div className="flex justify-between">
				{lettersArr.map((x, index) => {
					return <Letter key={index} letter={x.letter} shown={x.shown} />;
				})}
			</div>
			<br />
			<Keyboard
				keyboardLetters={keyboardLetters}
				handleKeyboardLetter={handleKeyboardLetter}
			/>
		</div>
	);
};

export default App;
