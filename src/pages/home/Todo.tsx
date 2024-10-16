import TodoDetails from "@/components/todo/TodoDetails";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateTodo from "@/components/todo/UpdateTodo";
import { useDrag } from "react-dnd";
import DeleteTodo from "@/components/todo/DeleteTodo";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import formatUTCDate from "@/utils/javascript/formatUTCDate";
import { TODO } from "@/types";
import { useEffect, useState } from "react";
import timeDifferenceFromNow from "@/utils/javascript/timeDifferenceFromNow";

const DONE = "done";

const ItemTypes = {
  CHILD: "child",
};

type Todo = {
  todo: TODO;
  id: string;
  parentId: string;
};

const Todo = ({ todo, id, parentId }: Todo) => {
  const { title, description, createdAt, dueDate, status } = todo;
  const [remainTime, setRemainTime] = useState("");

  useEffect(() => {
    if (!dueDate || status === DONE) return;

    const interval = setInterval(() => {
      const timeRemain = timeDifferenceFromNow(dueDate);

      setRemainTime(timeRemain);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dueDate, status]);

  const [, drag] = useDrag({
    type: ItemTypes.CHILD,
    item: { id, parentId },
  });

  return (
    <div
      ref={drag}
      className="bg-todo_bg p-3 text-my_black rounded-md h-52 flex flex-col justify-between"
    >
      <div className="flex justify-between">
        <div className="space-y-2">
          <p className="text-lg font-semibold">{title}</p>
          <p>{description}</p>
        </div>
        {status !== DONE && (
          <div className="w-24 text-sm text-red-500">
            <p>{remainTime}</p>
          </div>
        )}
      </div>
      <p className="-mb-10 text-xs">Created at: {formatUTCDate(createdAt)}</p>
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
