import AuthHeader from "@/components/auth/AuthHeader";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="flex flex-col">
      <header className="h-16 w-full bg-dark_blue text-light_white">
        <AuthHeader />
      </header>
      <div className="">
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
