import { Container } from "@/types";
import TodosContainer from "./TodosContainer";

const DoneTodos = ({ todos, id, moveChild }: Container) => {
  return (
    <>
      <TodosContainer
        title="done"
        todos={todos}
        parentId={id}
        moveChild={moveChild}
        id={id}
      />
    </>
  );
};

export default DoneTodos;
