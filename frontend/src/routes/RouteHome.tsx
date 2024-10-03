// libraries
import { useState, useEffect } from 'react';

// components
import GameSetup from "../components/GameSetup";

// utils
import { getInitialGameState } from "../../../backend/engine/getInitialGameState"

// types
import type { Game, GameMode } from "../../../backend/engine/engineTypes"
import { socket } from '../utils/socket';

const RouteHome = () => {
    const [game, setGame] = useState<Game>(getInitialGameState())

    // load data via websockets
    useEffect(() => {
        // load initial game state
        socket.on("game", (game: Game) => {
            console.log(game)
            setGame(game)
        })

        // clean up
        return () => {
            socket.off("game")
        }
    }, [])

    // set game mode
    const setGameMode = (gameMode: GameMode) => {
        const newGame = { ...game, gameMode: gameMode }
        socket.emit("move", newGame)
    }

    return (
        <div className="p-4 flex justify-center h-screen bg-neutral-content">
            <div className="flex flex-col w-3/4 h-full bg-neutral-content">
                <p className="w-full text-center py-2">Game Mode</p>
                <div className="flex w-full justify-center mb-4 justify-around">
                    <div className="w-full m-2 border-2 border-neutral rounded-2xl h-10 hover:bg-accent hover:border-accent">
                        <button onClick={() => setGameMode("1v1")} className="w-full h-full">
                            1 v 1
                        </button>
                    </div>
                    <div className="w-full m-2 border-2 border-neutral rounded-2xl h-10 hover:bg-accent hover:border-accent">
                        <button onClick={() => setGameMode("1vC")} className="w-full h-full">
                            1 v Machine
                        </button>
                    </div>
                </div>
                {/* <GameSetupNew /> */}
                <GameSetup game={game} />
            </div>
        </div>
    );
};

export default RouteHome;
