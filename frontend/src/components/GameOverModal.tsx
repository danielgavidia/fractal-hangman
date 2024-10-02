import { useNavigate } from "react-router-dom";

interface GameOverModal {
	won: boolean;
	word: string;
}

const GameOverModal: React.FC<GameOverModal> = ({ won, word }) => {
	const navigate = useNavigate();
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
				{won ? (
					<div className="flex flex-col items-center justify-center">
						<p className="p-2">You won!</p>
						<p className="p-2">The word was: {word}</p>
						<div className="p-2">
							<button
								onClick={() => navigate("/home")}
								className="btn bg-primary text-secondary-content"
							>
								New Game
							</button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center">
						<p className="p-2">You lost!</p>
						<p className="p-2">The word was: {word}</p>
						<div className="p-2">
							<button
								onClick={() => navigate("/home")}
								className="btn bg-primary text-secondary-content"
							>
								New Game
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default GameOverModal;
