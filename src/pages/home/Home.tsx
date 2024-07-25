import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import PendingTodos from "./PendingTodos";
import NewTodo from "@/components/todo/NewTodo";
import InProgressTodos from "./InProgressTodos";
import DoneTodos from "./DoneTodos";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { sortTodos, todosState, updateTodo } from "@/redux/slice/todoSlice";
import { useMemo, useState } from "react";
import { patchReq } from "@/utils/api/api";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import SearchTodos from "@/components/todo/SearchTodos";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TODO } from "@/types";
import Helmet from "react-helmet";

const PENDING = "pending";
const PROGRESS = "progress";
const DONE = "done";

const Home = () => {
  const dispatch = useDispatch();
  const { showErrorMessage } = Toastify();
  const { todos } = useSelector(todosState);
  const [searchTodos, setSearchTodos] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [pendingTodos, inProgressTodos, doneTodos] = useMemo(() => {
    if (todos?.length === 0) return [[], [], []];

    const todosPending = todos.filter((todo: TODO) => todo.status === PENDING);

    const todosInProgress = todos.filter(
      (todo: TODO) => todo.status === PROGRESS
    );

    const todosDone = todos.filter((todo: TODO) => todo.status === DONE);

    return [todosPending, todosInProgress, todosDone];
  }, [todos]);

  const handleSearch = (value: string) => {
    if (!value) {
      setSearchTodos([]);
      setSearchInput("");
      return;
    }

    setSearchInput(value);
    const filterTodos = todos.filter((todo: TODO) =>
      todo.title.toLowerCase().includes(value.toLowerCase())
    );

    setSearchTodos(filterTodos);
  };

  const moveChild = async (
    childId: string,
    fromParentId: string,
    toParentId: string
  ) => {
    if (fromParentId === toParentId) return;

    try {
      const response = await patchReq("/todos/status", {
        id: childId,
        status: toParentId,
      });

      dispatch(updateTodo(response));
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
      <Helmet>
        <title>Home</title>
        <meta name="discription" content="Home page of Voosh project" />
      </Helmet>
      <div className="px-5 py-10 space-y-5">
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-full md:w-52 bg-dark_blue py-2 flex justify-center rounded-md text-light_white">
              Add Task
            </button>
          </DialogTrigger>
          <NewTodo />
        </Dialog>

        <div className="shadow-xl p-5 rounded-md flex flex-col gap-3 md:flex-row justify-between">
          <div className="flex items-center gap-2">
            <p className="w-16 text-my_black">Search:</p>
            <input
              value={searchInput}
              placeholder="Search..."
              className="input rounded-md md:w-96 flex-1"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="w-16  text-my_black">Sort By:</p>
            <Select onValueChange={(value) => dispatch(sortTodos(value))}>
              <SelectTrigger className="w-[180px] border-2 border-gray-300 text-my_black ">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="created">Recent Created</SelectItem>
                  <SelectItem value="updated">Recent Updated</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {searchTodos.length > 0 || searchInput ? (
          <SearchTodos todos={searchTodos} />
        ) : (
          <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-5">
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
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
