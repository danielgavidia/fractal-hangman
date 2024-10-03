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

    const endGame = () => {
        const newGame = { ...game, gameLive: false }
        socket.emit("move", newGame)
    }

    const move = (letter: string): void => {
        // modify answerWord
        const answerWord = game.answerWord
        const newAnswerWord = answerWord.map(x => {
            if (x.letter === letter) {
                return { ...x, shown: true }
            } else {
                return x
            }
        })

        // modify keyboard
        const keyboard = game.keyboard
        const answerWordLetters = answerWord.map(x => x.letter)
        const newKeyboard = keyboard.map((x) => {
            if (answerWordLetters.includes(x.letter) && letter === x.letter) {
                return { ...x, enabled: false, correct: true }
            } else if (
                !answerWordLetters.includes(x.letter) && letter === x.letter
            ) {
                return { ...x, enabled: false, correct: false }
            } else {
                return x
            }
        })

        // modify game
        const newGame = { ...game, answerWord: newAnswerWord, keyboard: newKeyboard }
        socket.emit("move", newGame)
        return
    }

    return (
        <div>
            <div>gameMode: {game.gameMode}</div>
            <div>gameLive: {game.gameLive.toString()}</div>
            <div>gameWon: {game.gameWon.toString()}</div>
            <button onClick={() => endGame()}>End Game</button>
            <Hangman game={game} />
            <AnswerWord answerWord={game.answerWord} />
            <Keyboard keyboard={game.keyboard} move={move} />
        </div>
    );
};

export default SocketTestFinal;
