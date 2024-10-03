import express from "express";
import openaiChatCompletions from "./openai";

// setup
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});

// routes
app.post("/word", async (req, res) => {
	const { difficulty } = req.body;
	const resOpenai = await openaiChatCompletions(difficulty);
	res.status(200).json({ resOpenai: resOpenai });
});

// socket
import { Server } from "socket.io";
const io = new Server(3001, {
	cors: {
		origin: "*",
	},
});

const data = {
	messages: ["Seed message 1", "Seed message 2"],
};

io.on("connection", (socket) => {
	console.log("User connected");
	socket.emit("initial data", data.messages);
	socket.on("chat messages", (msgs) => {
		// Update data
		data.messages = msgs;

		// Broadcast to everyone except the sender
		socket.broadcast.emit("messages", data.messages);

		// Emit to all clients including the sender
		io.emit("messages", data.messages);
	});

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});
