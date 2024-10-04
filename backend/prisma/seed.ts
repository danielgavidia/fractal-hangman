import prisma from "./prisma";
import { getInitialGameState } from "../engine/engine";

const now = new Date();

const seedGame = getInitialGameState("123", now, "game", "easy");

async function main() {
	const game = await prisma.game.upsert({
		where: { id: "123" },
		update: {},
		create: {
			dateCreated: now,
			answerWord: {
				create: seedGame.answerWord,
			},
			keyboard: {
				create: seedGame.keyboard,
			},
			hangman: {
				create: seedGame.hangman,
			},
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
