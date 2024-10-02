import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.TOKEN_OPENAI });

const openaiChatCompletions = async (difficulty: string) => {
	const res = await openai.chat.completions.create({
		model: "gpt-4o-mini",
		messages: [
			{
				role: "system",
				content: `
            You are part of a backend system supporting a simple hangman game.
            Your role is to return a single English alpha word (only alphabet characters, no spaces).
            You will provide a word of varying difficulty, in the context of a hangman game.
            There are only three difficulty modalities: easy, medium and hard.
            Only return the word: do not return anything else.
            `,
			},
			{
				role: "user",
				content: `Return a single word of the following difficulty: ${difficulty}`,
			},
		],
	});
	console.log(res);
	return res.choices[0].message.content;
};

export default openaiChatCompletions;
