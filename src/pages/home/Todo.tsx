import TodoDetails from "@/components/todo/TodoDetails";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateTodo from "@/components/todo/UpdateTodo";
import { useDrag } from "react-dnd";
import DeleteTodo from "@/components/todo/DeleteTodo";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import formatUTCDate from "@/utils/javascript/formatUTCDate";
import { TODO } from "@/types";

const ItemTypes = {
  CHILD: "child",
};

type Todo = {
  todo: TODO;
  id: string;
  parentId: string;
};

const Todo = ({ todo, id, parentId }: Todo) => {
  const { title, description, createdAt } = todo;

  const [, drag] = useDrag({
    type: ItemTypes.CHILD,
    item: { id, parentId },
  });

  return (
    <div
      ref={drag}
      className="bg-todo_bg p-3 text-my_black rounded-md h-52 flex flex-col justify-between"
    >
      <div className="space-y-2">
        <p className="text-lg font-semibold">{title}</p>
        <p>{description}</p>
      </div>
      <p className="-mb-10 text-sm">Created at: {formatUTCDate(createdAt)}</p>
      <div className="text-sm text-my_white gap-1 flex justify-end items-end">
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="bg-delete_btn todo_btn">Delete</button>
          </AlertDialogTrigger>
          <DeleteTodo id={id} />
        </AlertDialog>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-edit_btn todo_btn">Edit</button>
          </DialogTrigger>
          <UpdateTodo id={id} />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <button className="bg-detail_btn todo_btn">View Details</button>
          </DialogTrigger>
          <TodoDetails id={id} />
        </Dialog>
      </div>
    </div>
  );
};

export default Todo;
