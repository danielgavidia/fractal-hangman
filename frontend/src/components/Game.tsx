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
import GameOverModal from './GameOverModal';
const socket: Socket = io('http://localhost:3001');

// app
const SocketTestFinal: React.FC = () => {
    const [game, setGame] = useState<Game>(getInitialGameState())
    console.log(game)

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

    // move
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

        // modify wrongCount
        const newWrongCount = newKeyboard.filter(x => !x.correct).length

        // modify gameWon

        // modify gameStatus (gameLive + gameWon)
        const correctLettersCount = newAnswerWord.filter(x => x.shown === true).length
        const newGameLive = () => {
            if (newWrongCount === game.wrongMax) {
                return {
                    gameLive: false,
                    gameWon: false
                }
            } else if (correctLettersCount === newAnswerWord.length) {
                return {
                    gameLive: false,
                    gameWon: true
                }
            } else {
                return {
                    gameLive: true,
                    gameWon: true,
                }
            }
        }

        // modify game
        const newGame = {
            ...game,
            answerWord: newAnswerWord,
            keyboard: newKeyboard,
            wrongCount: newWrongCount,
            gameLive: newGameLive().gameLive,
            gameWon: newGameLive().gameWon
        }
        socket.emit("move", newGame)
        return
    }

    return (
        <div className='w-full'>
            {game.gameLive ? (
                <div>
                    <div>gameMode: {game.gameMode}</div>
                    <div>gameLive: {game.gameLive.toString()}</div>
                    <div>gameWon: {game.gameWon.toString()}</div>
                    <Hangman game={game} />
                    <AnswerWord answerWord={game.answerWord} />
                    <Keyboard keyboard={game.keyboard} move={move} />
                </div>
            ) : (
                <div><GameOverModal game={game} /></div>
            )}

        </div>
    );
};

export default SocketTestFinal;
