import { Container } from "@/types";
import TodosContainer from "./TodosContainer";

const PendingTodos = ({ todos, id, moveChild }: Container) => {
  return (
    <TodosContainer
      title="todo"
      todos={todos}
      parentId={id}
      moveChild={moveChild}
      id={id}
    />
  );
};

export default PendingTodos;
