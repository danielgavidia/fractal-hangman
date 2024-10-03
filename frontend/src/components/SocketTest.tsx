import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:3001'); // Change URL if needed

const SocketTest: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    console.log(messages)

    useEffect(() => {
        // load initial messages
        socket.on('initial data', (initialMessages: string[]) => {
            setMessages(initialMessages)
        })

        // receive new messages
        socket.on("messages", (msgs: string[]) => {
            setMessages(msgs)
        })

        // clean up
        return () => {
            socket.off("initial data")
            socket.off("messages")
        }
    }, [])

    // useEffect(() => {
    //     // Listen for 'my message' event from server
    //     socket.on('my message', (msg: string) => {
    //         setMessages((prevMessages) => [...prevMessages, msg]);
    //     });

    //     // Clean up on component unmount
    //     return () => {
    //         socket.off('my message');
    //     };
    // }, []);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        // Emit 'chat message' event to the server
        const messagesNew = [...messages, message]
        socket.emit('chat messages', messagesNew);
        setMessage(''); // Clear the input field
    };

    return (
        <div>
            <form onSubmit={sendMessage}>
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
            </ul>
        </div>
    );
};

export default SocketTest;
