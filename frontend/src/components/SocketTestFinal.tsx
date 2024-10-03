// libraries
import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// components
import Keyboard from './Keyboard';
import AnswerWord from './AnswerWord';
import Hangman from './Hangman';

// types
import type { Game } from "../../../backend/engine/engineTypes"

// utils
import { getInitialGameState } from "../../../backend/engine/getInitialGameState"
const socket: Socket = io('http://localhost:3001');

// app
const SocketTestFinal: React.FC = () => {
    const [game, setGame] = useState<Game>(getInitialGameState())
    console.log(game)

    useEffect(() => {
        // load initial game state
        socket.on("game", (game: Game) => {
            console.log(game)
            setGame(game)
        })

        // // receive new messages
        // socket.on("messages", (msgs: string[]) => {
        //     setMessages(msgs)
        // })

        // clean up
        return () => {
            socket.off("game")
        }
    }, [])

    return (
        <div>
            <div>gameMode: {game.gameMode}</div>
            <div>gameLive: {game.gameLive.toString()}</div>
            <div>gameWon: {game.gameWon.toString()}</div>
            <Hangman game={game} />
            <AnswerWord answerWord={game.answerWord} />
            <Keyboard keyboard={game.keyboard} />
        </div>
    );
};

export default SocketTestFinal;
