export type TodoType = {
  id: string;
  text: string;
  completed: boolean;
};

export type TodoDocType = {
  id: string;
  'todo-list': TodoType[];
}