// libraries
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// components
import GameSetup from "../components/GameSetup";

// utils
import { getInitialGameState } from "../../../backend/engine/getInitialGameState";

// types
import type { Game, GameMode } from "../../../backend/engine/engineTypes";
import { socket } from "../utils/socket";

const RouteHome = () => {
    const [games, setGames] = useState<string[]>([]);
    const [gameId, setGameId] = useState("")
    const navigate = useNavigate();

    // load data via websockets
    useEffect(() => {
        socket.emit("lobby")
        // load initial game state
        socket.on("games", (games: string[]) => {
            console.log(games);
            setGames(games);
        });

        // clean up
        return () => {
            socket.off("connect");
            socket.off("disconnect");
        };
    }, []);

    function createGame() {
        socket.emit("creategame", gameId)
    }

    // set game mode
    // const setGameMode = (gameMode: GameMode) => {
    //     const newGame = { ...game, gameMode: gameMode }
    //     socket.emit("move", newGame)
    // }

    return (
        <div className="p-4 flex justify-center h-screen bg-neutral-content">
            <div className="flex flex-col w-3/4 h-full bg-neutral-content">
                <p className="w-full text-center py-2">New Game</p>
                <div className="flex w-full flex-col justify-center mb-4 justify-around border-b-2 border-neutral pb-4">
                    <input className="input input-bordered m-2 border-2 py-2 border-neutral rounded-2xl border-black" placeholder="name your game here" type="text" value={gameId} onChange={(e) => setGameId(e.target.value)}></input>
                    {/* <button onClick={() => setGameMode("1vC")} className="w-full h-full"> */}
                    <button onClick={createGame} className="w-full m-2 border-2 border-neutral rounded-2xl hover:bg-accent hover:border-accent w-full h-full">Start</button>
                </div>
                {/* <GameSetup game={game} /> */}
                <p className="w-full text-center">Current Games</p>
                {games.map((gameId, index) => {
                    return (
                        <div
                            key={index}
                            className="flex w-full justify-between items-center border-b-2 border-base-200 h-20"
                        >
                            <p className="text-sm">{gameId}</p>
                            <Link className="btn btn-outline" to={`/game/${gameId}`}>go</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RouteHome;
