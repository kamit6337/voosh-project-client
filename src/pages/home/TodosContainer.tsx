import { useDrop } from "react-dnd";
import Todo from "./Todo";
import { TODO } from "@/types";

const ItemTypes = {
  CHILD: "child",
};

type Container = {
  todos: TODO[];
  title: string;
  parentId: string;
  id: string;
  moveChild: (arg0: string, arg1: string, arg2: string) => void;
};

const TodosContainer = ({
  todos,
  title,
  parentId,
  moveChild,
  id,
}: Container) => {
  const [, drop] = useDrop({
    accept: ItemTypes.CHILD,
    drop: (item: { id: string; parentId: string }) =>
      moveChild(item.id, item.parentId, id),
  });

  return (
    <div ref={drop} className="border border-my_gray rounded-md p-3 space-y-5">
      <p className="bg-todo_header py-1 px-3 font-semibold text-my_white text-xl rounded uppercase ">
        {title}
      </p>
      <div className="space-y-5 min-h-20">
        {todos.map((todo) => {
          return (
            <Todo
              key={todo._id}
              id={todo._id}
              todo={todo}
              parentId={parentId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TodosContainer;
