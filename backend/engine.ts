import type { Engine, GameMode, AnswerLetterObj, Letter } from "./engineTypes";

// game function
const game = (engine: Engine) => {
	return;
};

// step 0: choose game mode
const chooseGameMode = (engine: Engine, gameMode: GameMode): Engine => {
	const newEngine = { ...engine, gameMode: gameMode };
	return newEngine;
};

// step 1: choose word
const chooseAnswerWord = (engine: Engine, word: string): Engine => {
	const letters = word.split("");
	const answerWord: AnswerLetterObj[] = letters.map((x) => ({
		letter: x as Letter,
		shown: false,
	}));
	const newEngine = { ...engine, answerWord: answerWord };
	return newEngine;
};

// step 2: choose letter
const chooseKeyboardLetter = (engine: Engine, letter: Letter): Engine => {
	const answerWord = engine.answerWord;
	const answerWordLetters = answerWord.map((x) => x.letter);
	const keyboard = engine.keyboard;

	// modify answerWord
	const newAnswerWord = answerWord.map((x) => {
		if (x.letter === letter) {
			return { ...x, shown: true };
		} else {
			return x;
		}
	});

	// modify Keyboard
	const newKeyboard = keyboard.map((x) => {
		if (answerWordLetters.includes(x.letter) && letter === x.letter) {
			// if keyboard letter exists in answer letter && keyboard letter = letter passed
			return { ...x, enabled: false, correct: true };
		} else if (!answerWordLetters.includes(x.letter) && letter == x.letter) {
			// if keyboard letter does not exist in answer letter && keyboard letter = letter passed
			return { ...x, enabled: true, correct: true };
		} else {
			return { ...x, enabled: false, correct: false };
		}
	});

	// new engine
	const newEngine = { ...engine, answerWord: newAnswerWord, keyboard: newKeyboard };
	return newEngine;
};
