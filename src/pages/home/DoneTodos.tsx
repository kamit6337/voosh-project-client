import TodosContainer from "./TodosContainer";

const DoneTodos = ({ todos, id, moveChild }) => {
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
