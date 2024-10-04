import { getegid } from "process";
import prisma from "../prisma/prisma";

export const getGame = async (gameId: string) => {
	const gamePrisma = await prisma.game.findUnique({
		where: {
			id: gameId,
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

const res = await getGame("4dbed721-46e7-4f54-8146-10bd25b1e7ab");
console.log(res);
