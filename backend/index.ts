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
app.post("/word", (req, res) => {
	const { difficulty } = req.body;
	const resOpenai = openaiChatCompletions(difficulty);
	res.status(200).json({ resOpenai: resOpenai });
});
