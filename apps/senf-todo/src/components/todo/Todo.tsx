import type { FunctionComponent } from 'react';
import {
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
} from "firebase/firestore";
import type { TodoType } from '../../types/Todo';
import { ListItem, TodoContainer } from './Styled.Todo';
import { db } from '../../firebase';

interface TodoProps {
    todo: TodoType;
}


const todosRef = (docId) => doc(db, `todos/${docId}`)
const toggleComplete = async (todo: TodoType, docId: string) => {
    await updateDoc(todosRef(docId), {
        'todo-list': arrayRemove(todo)
    })
    await updateDoc(todosRef(docId), {
        "todo-list": arrayUnion({
            id: todo.id,
            text: todo.text,
            completed: !todo.completed
        }),
    });
};

const deleteTodo = async (todo: TodoType, docId: string) => {
    await updateDoc(todosRef(docId), {
        "todo-list": arrayRemove(todo)
    });
};

const Todo: FunctionComponent<TodoProps> = ({ todo, docId }) => {
    return (
        <ListItem>
            <TodoContainer>
                <input onChange={() => toggleComplete(todo, docId)} type="checkbox" checked={todo.completed} />
                <p>{todo.text}</p>
                <button onClick={() => deleteTodo(todo, docId)}>X</button>
            </TodoContainer>
        </ListItem>
    );
}

export default Todo;