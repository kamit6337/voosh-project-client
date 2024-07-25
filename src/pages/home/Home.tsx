import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PendingTodos from "./PendingTodos";
import NewTodo from "@/components/NewTodo";
import InProgressTodos from "./InProgressTodos";
import DoneTodos from "./DoneTodos";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { todosState, updateTodoStatus } from "@/redux/slice/todoSlice";
import { useMemo } from "react";
import { patchReq } from "@/utils/api/api";
import Toastify, { ToastContainer } from "@/lib/Toastify";

const PENDING = "pending";
const PROGRESS = "progress";
const DONE = "done";

const Home = () => {
  const dispatch = useDispatch();
  const { showErrorMessage } = Toastify();
  const { todos } = useSelector(todosState);

  const [pendingTodos, inProgressTodos, doneTodos] = useMemo(() => {
    if (todos?.length === 0) return [[], [], []];

    const todosPending = todos.filter((todo) => todo.status === PENDING);

    const todosInProgress = todos.filter((todo) => todo.status === PROGRESS);

    const todosDone = todos.filter((todo) => todo.status === DONE);

    return [todosPending, todosInProgress, todosDone];
  }, [todos]);

  const moveChild = async (childId, fromParentId, toParentId) => {
    if (fromParentId === toParentId) return;

    try {
      const response = await patchReq("/todos/status", {
        id: childId,
        status: toParentId,
      });

      dispatch(updateTodoStatus(response));
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  return (
    <>
      <div className="px-5 py-10 space-y-5">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full bg-header_blue py-2 flex justify-center rounded-md">
              Add Task
            </button>
          </DialogTrigger>
          <NewTodo />
        </Dialog>

        <div className="shadow-lg p-5 rounded-md space-y-3">
          <div className="flex items-center gap-2">
            <label className="w-20 text-my_black">Search:</label>
            <input placeholder="Search..." className="input rounded-md" />
          </div>
          <div className="flex items-center gap-2">
            <label className="w-20 text-my_black">Sort By:</label>
            <input placeholder="Search..." className="input rounded-md" />
          </div>
        </div>
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2">
            <PendingTodos
              id={PENDING}
              todos={pendingTodos}
              moveChild={moveChild}
            />
            <InProgressTodos
              id={PROGRESS}
              todos={inProgressTodos}
              moveChild={moveChild}
            />
            <DoneTodos id={DONE} todos={doneTodos} moveChild={moveChild} />
          </div>
        </DndProvider>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
