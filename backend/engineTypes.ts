// game engine
export interface Engine {
	gameMode: GameMode;
	gameLive: boolean;
	gameWon: boolean;
	wrongCount: number;
	wrongMax: number;
	difficulty: Difficulty;
	answerWord: AnswerWord;
	keyboard: Keyboard;
	hangman: Hangman;
}

// game mode
export type GameMode = "1v1" | "1vC" | "";
export type Difficulty = "easy" | "medium" | "hard";

// hangman
export type Hangman = HangmanObj[];

export interface HangmanObj {
	index: number;
	figurine: string;
}

// answer word
export type AnswerWord = AnswerLetterObj[];

export interface AnswerLetterObj {
	letter: Letter;
	shown: boolean;
}

// keyboard
export interface KeyboardLetterObj {
	letter: Letter;
	enabled: boolean;
	correct: boolean;
}

export type Keyboard = KeyboardLetterObj[];

// letter
export type Letter =
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z";
