"use client";
import { useState } from "react";
import axios from "axios";

export default function CreateTodo(){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async () => {
        await axios.post("http://localhost:5000/todos", { title, description });
        alert("Todo Created!");
    };

    return (
        <div>
            <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={handleSubmit}>Create Todo</button>
        </div>
    );
}
