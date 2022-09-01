/** @format */
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import * as React from "react";
import { v4 as uuidv4 } from 'uuid';
import DraggableList from "./components/DraggableList";
import { db } from "./firebase";
import { TodoDocType } from "./types/Todo";

function App() {
  const [todos, setTodos] = React.useState<TodoDocType[]>([]);
  const [input, setInput] = React.useState<string>("");

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input === "") {
      // eslint-disable-next-line no-alert
      alert("Please Enter a Valid Todo");
      return null;
    }

    const id = uuidv4()
    await updateDoc(doc(db, 'todos', todos[0].id), {
      'todo-list': arrayUnion({ id, text: input, completed: false })
    })

    setInput("");
  };

  React.useEffect(() => {
    const q = query(collection(db, "todos"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = [];

      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5rem",
      }}
    >
      <h3>Todo App</h3>
      <form onSubmit={createTodo}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Add Todo"
        />
        <button>+</button>
      </form>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
          margin: 0,
          padding: 0,
        }}
      >
        {todos.length > 0 && <DraggableList items={todos} docId={todos[0].id}/>}
      </ul>
    </div>
  );
}
// items={"hello I'm mo yo hey hoe".split(' ').map((todo, i) => ({ completed: false, id: i, text: todo }))}
export default App;
