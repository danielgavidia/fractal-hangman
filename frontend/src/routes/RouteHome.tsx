import { useState } from "react";
import GameSetup from "../components/GameSetup";

const RouteHome = () => {
	const [gameMode, setGameMode] = useState<string>("");

	return (
		<div className="p-4 flex justify-center">
			<div className="flex flex-col w-1/2">
				<p className="w-full text-center py-2">Game Mode</p>
				<div className="flex w-full justify-center mb-4 justify-around">
					<div className="w-full m-2 border-2 border-gray-200 rounded-lg">
						<button onClick={() => setGameMode("1v1")} className="w-full h-full">
							1 v 1
						</button>
					</div>
					<div className="w-full m-2 border-2 border-gray-200 rounded-lg">
						<button onClick={() => setGameMode("1vC")} className="w-full h-full">
							1 v Machine
						</button>
					</div>
				</div>
				<GameSetup gameMode={gameMode} />
			</div>
		</div>
	);
};

export default RouteHome;
