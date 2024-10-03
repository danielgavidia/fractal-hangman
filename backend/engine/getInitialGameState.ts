// libraries
import { v4 as uuidv4 } from "uuid";

// utils
import { hangmanStages } from "../utils/hangman";
import { alphabet } from "../utils/alphabet";

// types
import type { Game, AnswerWord, Keyboard, Hangman, Letter } from "./engineTypes";

// get initial game state
export const getInitialGameState = (id: string): Game => {
	const answerWord = getAnswerWord("word");
	const keyboard = getKeyboard(alphabet);
	const hangman = getHangman(hangmanStages);
	const uniqueId = uuidv4();

	const initialGameState: Game = {
		uniqueId: id,
		gameMode: "1v1",
		gameLive: true,
		gameWon: false,
		wrongCount: 0,
		wrongMax: 6,
		difficulty: "easy",
		answerWord: answerWord,
		keyboard: keyboard,
		hangman: hangman,
	};
	return initialGameState;
};

// convert word to array of {letter: string, shown: boolean}
export const getAnswerWord = (word: string): AnswerWord => {
	const arr = word.split("");
	const arrObj = arr.map((x) => ({ letter: x, shown: false }));
	return arrObj;
};

// convert alphabet array to array of {keyboardLetter: string, enabled: boolean, correct: boolean}
export const getKeyboard = (alphabet: Letter[]): Keyboard => {
	const arr = alphabet.map((x) => ({
		letter: x,
		enabled: true,
		correct: true,
	}));
	return arr;
};

// convert hangman array to array of {stage: number, figure: string}
export const getHangman = (hangmanStages: string[]): Hangman => {
	const arr = hangmanStages.map((x, index) => ({
		index: index,
		figurine: x,
	}));
	return arr;
};

// check if word is valid
export const isValidWord = (input: string): boolean => {
	const alphaOnlyRegex = /^[A-Za-z]+$/;
	return alphaOnlyRegex.test(input);
};
