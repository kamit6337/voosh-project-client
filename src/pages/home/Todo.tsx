import { useDrag } from "react-dnd";

const ItemTypes = {
  CHILD: "child",
};

const Todo = ({ todo, id, parentId, moveChild }) => {
  const { title, description } = todo;

  const [, drag] = useDrag({
    type: ItemTypes.CHILD,
    item: { id, parentId },
  });

  return (
    <div ref={drag} className="bg-todo_bg p-3 text-my_black rounded-md">
      <p>{title}</p>
      <p>{description}</p>
      <p>Created At</p>
      <div className="text-end text-sm text-my_white space-x-2">
        <button className="bg-delete_btn todo_btn">Delete</button>
        <button className="bg-edit_btn todo_btn">Edit</button>
        <button className="bg-detail_btn todo_btn">View Details</button>
      </div>
    </div>
  );
};

export default Todo;
