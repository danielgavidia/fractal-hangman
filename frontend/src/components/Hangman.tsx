import type { Game } from "../../../types/engineTypes";

interface HangmanProps {
	game: Game;
}

const Hangman: React.FC<HangmanProps> = ({ game }) => {
	const hangman = game.hangman;
	const wrongCount = game.wrongCount;
	const hangmanFigurine = hangman.find((x) => x.index === wrongCount)?.figurine;
	return (
		<div className="flex justify-center">
			<pre className="font-mono">{hangmanFigurine}</pre>
		</div>
	);
};

export default Hangman;
