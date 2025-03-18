import axios from "axios";

export async function getServerSideProps(){
    const { data } = await axios.get("http://localhost:5000/todos?page=1&limit=5");
    return { props: { todos: data }};
}

export default function Todos({ todos }){
    return(
        <div>
            <h2>Todo List</h2>
            {todos.map(todo => (
                <a key={todo._id} href={`/todos/${todo._id}`}>
                    <h3>{todo.title}</h3>
                </a>
            ))}
        </div>
    );
}