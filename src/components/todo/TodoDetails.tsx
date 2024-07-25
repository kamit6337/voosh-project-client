import { useSelector } from "react-redux";
import { DialogClose, DialogContent } from "../ui/dialog";
import { todosState } from "@/redux/slice/todoSlice";
import { useMemo } from "react";
import { TODO } from "@/types";

const TodoDetails = ({ id }: { id: string }) => {
  const { todos } = useSelector(todosState);

  const todo = useMemo(() => {
    if (!id || todos.length === 0) return {};
    const findTodo = todos.find((todo: TODO) => todo._id === id);
    return findTodo;
  }, [todos, id]);

  return (
    <>
      <DialogContent className="w-96 h-[500px] ">
        <form className="h-full flex flex-col justify-between">
          <div className="space-y-5">
            <p className="text-lg font-semibold text-my_black">Task Details</p>
            <div className="flex flex-col gap-5">
              <div className="flex ">
                <p>Title:</p>
                <p>{todo?.title}</p>
              </div>
              <div className="flex ">
                <p>Description:</p>
                <p>{todo?.description}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-end gap-3 text-my_black">
            <DialogClose asChild>
              <button className="bg-cancel_btn px-4 py-2 rounded-md">
                Close
              </button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </>
  );
};

export default TodoDetails;
