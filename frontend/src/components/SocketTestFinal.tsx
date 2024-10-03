import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001'); // Change URL if needed

import type { Game } from "../../../backend/engineTypes.ts"

const SocketTestFinal: React.FC = () => {
    // const [message, setMessage] = useState<string>('');
    // const [messages, setMessages] = useState<string[]>([]);

    const [game, setGame] = useState<Game>()
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
            // socket.off("messages")
        }
    }, [])

    // const sendMessage = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     // Emit 'chat message' event to the server
    //     const messagesNew = [...messages, message]
    //     socket.emit('chat messages', messagesNew);
    //     setMessage(''); // Clear the input field
    // };

    return (
        <div>
            <div>gameMode: {game?.gameMode}</div>
            <div>gameLive: {game?.gameLive.toString()}</div>
            <div>gameWon: {game?.gameWon.toString()}</div>
            {/* <form onSubmit={sendMessage}>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message"
                />
                <button type="submit">Send</button>
            </form>

            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default SocketTestFinal;
