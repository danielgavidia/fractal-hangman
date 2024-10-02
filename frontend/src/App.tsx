import { useState } from "react";

import Letter from "./components/Letter";
import Keyboard from "./components/Keyboard";

// convert word to array of {letter: string, shown: boolean}
const getLetterArray = (word: string) => {
	const arr = word.split("");
	const arrObj = arr.map((x) => ({ letter: x, shown: false }));
	return arrObj;
};

const App = () => {
	const word = "kaleidoscope";
	const [lettersArr, setLettersArr] = useState(getLetterArray(word));

	// logic for showing letters
	const showLetter = (letter: string): void => {
		const newLetters = lettersArr.map((x) => {
			if (x.letter === letter) {
				return { ...x, shown: true };
			} else {
				return x;
			}
		});
		setLettersArr(newLetters);
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
			<Keyboard showLetter={showLetter} />
		</div>
	);
};

export default App;
