// libraries

// utils
import { hangmanStages } from "./hangman";
import { alphabet } from "./alphabet";
import { words } from "./words";

// types
import type {
	Game,
	Keyboard,
	Hangman,
	Letter,
	Difficulty,
	LobbyGame,
	GameServer,
} from "../../types/engineTypes";

// get initial game state
export const getInitialGameState = (
	gameId: string,
	dateCreated: Date,
	gameName: string,
	difficulty: Difficulty
): Game => {
	const answerWord = getAnswerWord(difficulty);
	const keyboard = getKeyboard(alphabet);
	const hangman = getHangman(hangmanStages);

	const initialGameState: Game = {
		gameId: gameId,
		dateCreated: dateCreated,
		gameName: gameName,
		gameMode: "1v1",
		gameLive: true,
		gameWon: false,
		wrongCount: 0,
		wrongMax: 6,
		difficulty: difficulty,
		answerWord: answerWord,
		keyboard: keyboard,
		hangman: hangman,
	};
	return initialGameState;
};

// get lobbyGame
export function getLobbyGames(gameServer: GameServer): LobbyGame[] {
	const games = Object.values(gameServer).map((game) => {
		const answerWordLength = game.answerWord.length;
		const guessedCorrectly = game.answerWord.filter((item) => item.shown === true).length;
		const res = {
			gameId: game.gameId,
			gameName: game.gameName,
			gameWon: game.gameWon,
			gameLive: game.gameLive,
			dateCreated: game.dateCreated,
			difficulty: game.difficulty,
			answerWordLength: answerWordLength,
			guessedCorrectly: guessedCorrectly,
			wrongCount: game.wrongCount,
		};
		return res;
	});
	return games;
}

// get initial AnswerWord
function getRandomWord(wordsArray: string[]): string {
	const randomIndex = Math.floor(Math.random() * wordsArray.length);
	return wordsArray[randomIndex];
}

export const getAnswerWord = (difficulty: Difficulty) => {
	const wordsArray = words[difficulty];
	const answerWord = getRandomWord(wordsArray)
		.split("")
		.map((x) => ({ letter: x, shown: false }));
	return answerWord;
};

// getKeyboard
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

// move
export const move = (game: Game, letter: string): Game => {
	// modify answerWord
	const answerWord = game.answerWord;
	const newAnswerWord = answerWord.map((x) => {
		if (x.letter === letter) {
			return { ...x, shown: true };
		} else {
			return x;
		}
	});

	// modify keyboard
	const keyboard = game.keyboard;
	const answerWordLetters = answerWord.map((x) => x.letter);
	const newKeyboard = keyboard.map((x) => {
		if (answerWordLetters.includes(x.letter) && letter === x.letter) {
			return { ...x, enabled: false, correct: true };
		} else if (!answerWordLetters.includes(x.letter) && letter === x.letter) {
			return { ...x, enabled: false, correct: false };
		} else {
			return x;
		}
	});

	// modify wrongCount
	const newWrongCount = newKeyboard.filter((x) => !x.correct).length;

	// modify gameStatus (gameLive + gameWon)
	const correctLettersCount = newAnswerWord.filter((x) => x.shown === true).length;
	const newGameLive = () => {
		if (newWrongCount === game.wrongMax) {
			return {
				gameLive: false,
				gameWon: false,
			};
		} else if (correctLettersCount === newAnswerWord.length) {
			return {
				gameLive: false,
				gameWon: true,
			};
		} else {
			return {
				gameLive: true,
				gameWon: true,
			};
		}
	};

	// modify game
	const newGame = {
		...game,
		answerWord: newAnswerWord,
		keyboard: newKeyboard,
		wrongCount: newWrongCount,
		gameLive: newGameLive().gameLive,
		gameWon: newGameLive().gameWon,
	};
	return newGame;
};
