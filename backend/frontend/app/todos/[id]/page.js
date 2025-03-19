"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

export default function TodoDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/todos/${id}`).then(res => setTodo(res.data));
  }, [id]);

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/todos/${id}`, todo);
    alert("Todo Updated!");
  };

  if (!todo) return <p>Loading...</p>;

  return (
    <div>
      <input value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
      <textarea value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
