const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const TodoSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: {type: Date, default: Date.now},
});

const Todo = mongoose.model("Todo", TodoSchema);

// Create a Todo
app.post("/todos", async(req, res) => {
    const {title, description} = req.body;
    const todo = new Todo({title, description});
    await todo.save();
    res.json(todo);
});

// Get Todos with Pagination
app.get("/todos", async (req, res) => {
    const {page = 1, limit = 5} = req.query;
    const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(Number(limit));
    res.json(todos);
});

// Get Single Todo
app.get("/todos/:id", async(req, res) => {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
});

// Update a Todo
app.put("/todos/:id", async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(updatedTodo);
});

app.listen(5000, () => console.log("Server running on port 5000"));