import TodosContainer from "./TodosContainer";

const InProgressTodos = ({ todos, id, moveChild }) => {
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
