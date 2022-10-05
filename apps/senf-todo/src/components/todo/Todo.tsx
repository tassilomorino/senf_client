import type { FunctionComponent } from "react";
import type { TodoType } from "../../types/Todo";
import { ListItem, TodoContainer } from "./styled.todo";

interface TodoProps {
  todo: TodoType;
  toggleComplete: (todo: todo) => void;
  deleteTodo: (todoId: number) => void;
}

const Todo: FunctionComponent<TodoProps> = ({
  todo,
  toggleComplete,
  deleteTodo,
}) => {
  return (
    <ListItem>
      <TodoContainer>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed}
        />
        <p onClick={() => toggleComplete(todo)}>{todo.text}</p>
        <button onClick={() => deleteTodo(todo.id)}>X</button>
      </TodoContainer>
    </ListItem>
  );
};

export default Todo;
