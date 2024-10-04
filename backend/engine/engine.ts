// libraries
import prisma from "../prisma/prisma";

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
	AnswerWord,
} from "./engineTypes";
import type { Key } from "readline";

// get game server
export const getLobbyGames2 = async () => {
	const gameServerPrisma = await prisma.game.findMany({
		include: {
			answerWord: true,
			keyboard: true,
			hangman: true,
		},
	});
	const lobbyGames = gameServerPrisma.map((x) => ({
		gameId: x.id,
		gameName: x.gameName,
		gameWon: x.gameWon,
		gameLive: x.gameLive,
		dateCreated: x.dateCreated,
		difficulty: x.difficulty,
		answerWordLength: x.answerWord.length,
		guessedCorrectly: x.keyboard.filter((x) => x.correct === true && !x.enabled).length,
		wrongCount: x.wrongCount,
	}));
	return lobbyGames;
};

// get specific game
export const getGame = async (id: string): Promise<Game> => {
	const gamePrisma = await prisma.game.findUnique({
		where: {
			id: id,
		},
		include: {
			answerWord: true,
			keyboard: true,
			hangman: true,
		},
	});
	const game = {
		dateCreated: gamePrisma?.dateCreated,
		gameId: gamePrisma?.id,
		gameName: gamePrisma?.gameName,
		gameLive: gamePrisma?.gameLive,
		gameWon: gamePrisma?.gameWon,
		wrongCount: gamePrisma?.wrongCount,
		wrongMax: gamePrisma?.wrongMax,
		difficulty: gamePrisma?.difficulty,
		answerWord: gamePrisma?.answerWord.map((x) => ({
			letter: x.letter,
			shown: x.shown,
		})),
		keyboard: gamePrisma?.keyboard.map((x) => ({
			letter: x.letter,
			enabled: x.enabled,
			correct: x.correct,
		})),
		hangman: gamePrisma?.hangman.map((x) => ({
			index: x.index,
			figurine: x.figurine,
		})),
	};
	return game;
};

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
	const games = Object.values(gameServer).map((x) => {
		const answerWordLength = x.answerWord.length;
		const guessedCorrectly = x.keyboard.filter((x) => x.correct === true && !x.enabled).length;
		const game = {
			gameId: x.gameId,
			gameName: x.gameName,
			gameWon: x.gameWon,
			gameLive: x.gameLive,
			dateCreated: x.dateCreated,
			difficulty: x.difficulty,
			answerWordLength: answerWordLength,
			guessedCorrectly: guessedCorrectly,
			wrongCount: x.wrongCount,
		};
		return game;
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

// move2
export const move2 = async (gameId: string, letter: string) => {
	// find unique game with gameId
	const game = await getGame(gameId);
	console.log(gameId);
	console.log(letter);

	// modify game
	// modify answerWord
	const answerWord = game.answerWord as AnswerWord;
	const newAnswerWord = answerWord.map((x) => {
		if (x.letter === letter) {
			return { ...x, shown: true };
		} else {
			return x;
		}
	});

	// modify keyboard
	const keyboard = game.keyboard as Keyboard;
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

	// update prisma
	await prisma.game.update({
		where: { id: gameId },
		data: {
			wrongCount: newWrongCount,
			gameLive: newGameLive().gameLive,
			gameWon: newGameLive().gameWon,
		},
	});

	await prisma.answerLetterObj.updateMany({
		where: {
			gameId: gameId,
			letter: letter,
		},
		data: {
			shown: true,
		},
	});

	await prisma.keyboardLetterObj.updateMany({
		where: {
			gameId: gameId,
			letter: letter,
		},
		data: {
			enabled: false,
		},
	});

	// update AnswerWord
	// const updateAnswerWord = await prisma.answerLetterObj.update()
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
