/** @format */
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import React from "react";
import Todo from "./components/todo/Todo";
import { db } from "./firebase";
import type { TodoType } from "./types/Todo";

function App() {
  const [todos, setTodos] = React.useState<TodoType | []>([]);
  const [input, setInput] = React.useState<string>('');

  const createTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input === '') {
      alert('Please Enter a Valid Todo')
      return null;
    }

    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false
    })
    setInput('')
  }

  React.useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id })
      })
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])


  const toggleComplete = async (todo: TodoType) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }

  const deleteTodo = async (todoId: TodoType['id']) => {
    await deleteDoc(doc(db, 'todos', todoId))
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <h3>Todo App</h3>
      <form onSubmit={createTodo}>
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Add Todo" />
        <button>+</button>
      </form>
      <ul style={{ margin: 0, padding: 0 }}>
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
