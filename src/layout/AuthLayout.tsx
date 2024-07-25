import AuthHeader from "@/components/auth/AuthHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex flex-col">
      <header className="h-16 w-full bg-header_blue ">
        <AuthHeader />
      </header>
      <div className="">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
