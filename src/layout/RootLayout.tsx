import Header from "@/components/Header";
import useGetAllTodos from "@/hooks/useGetAllTodos";
import useLoginCheck from "@/hooks/useLoginCheck";
import Loading from "@/lib/Loading";
import { addAllTodos } from "@/redux/slice/todoSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RootLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, isSuccess } = useLoginCheck();

  const {
    isLoading: getTodosIsLoading,
    error: getTodosError,
    data,
  } = useGetAllTodos(isSuccess);

  useEffect(() => {
    if (data) {
      dispatch(addAllTodos(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (error) {
      navigate(`/login?msg=${error.message}`);
      return;
    }

    if (getTodosError) {
      navigate(`/login?msg=${getTodosError.message}`);
      return;
    }
  }, [error, navigate, getTodosError]);

  if (isLoading || getTodosIsLoading) {
    return <Loading hScreen={true} small={false} />;
  }

  if (!isSuccess) return;

  return (
    <>
      <div className="h-16 w-full bg-header_blue">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default RootLayout;
