import { Container } from "@/types";
import TodosContainer from "./TodosContainer";



const InProgressTodos = ({ todos, id, moveChild }: Container) => {
  return (
    <>
      <TodosContainer
        title="in progress"
        todos={todos}
        parentId={id}
        moveChild={moveChild}
        id={id}
      />
    </>
  );
};

export default InProgressTodos;
