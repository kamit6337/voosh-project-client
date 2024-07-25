import { useDrop } from "react-dnd";
import Todo from "./Todo";

const ItemTypes = {
  CHILD: "child",
};

const TodosContainer = ({ todos, title, parentId, moveChild, id }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CHILD,
    drop: (item) => moveChild(item.id, item.parentId, id),
  });

  return (
    <div ref={drop} className="border border-my_gray rounded-md p-3 space-y-5">
      <p className="bg-todo_header py-1 px-3 font-semibold text-my_white text-xl rounded uppercase ">
        {title}
      </p>
      {todos.map((todo) => {
        return (
          <Todo
            key={todo._id}
            id={todo._id}
            todo={todo}
            parentId={parentId}
            moveChild={moveChild}
          />
        );
      })}
    </div>
  );
};

export default TodosContainer;
