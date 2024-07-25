import Box from "@/components/custom/Box";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/lib/Loading";
import { postAuthReq } from "@/utils/api/authApi";
import Toastify, { ToastContainer } from "@/lib/Toastify";
import environment from "@/utils/environment";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const navigate = useNavigate();
  const { showErrorMessage } = Toastify();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      await postAuthReq("/login", values);
      navigate("/");
    } catch (error) {
      showErrorMessage({
        message:
          error instanceof Error
            ? error?.message
            : "Something went wrong. Please try later",
      });
    }
  };

  const googleOAuth = () => {
    const url = `${environment.SERVER_URL}/auth/google`;
    const openWindow = window.open(url, "_self");

    if (!openWindow) {
      showErrorMessage({
        message:
          "Error in Google OAuth login. Try login with Email and Password",
      });
    } else {
      openWindow.onerror = () => {
        showErrorMessage({
          message:
            "Error in Google OAuth login. Try login with Email and Password",
        });
      };
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box title="Login">
          <div>
            <input
              type="email"
              {...register("email")}
              className="input"
              placeholder="Email"
            />
            {errors.email?.message && (
              <p className="input_error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              className="input"
              placeholder="Password"
            />
            {errors.password?.message && (
              <p className="input_error">{errors.password?.message}</p>
            )}
          </div>
          <button className="btn_submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? <Loading /> : "Login"}
          </button>

          <div className="flex justify-center gap-2 font-semibold ">
            <p className="text-black">Dont't have an account?</p>
            <Link to={`/signup`} className="text-header_blue">
              Signup
            </Link>
          </div>
          <div className="flex justify-center">
            <div
              className="bg-header_blue p-2 rounded-lg text-white cursor-pointer"
              onClick={googleOAuth}
            >
              Login with{" "}
              <span className="font-semibold tracking-wider">Google</span>
            </div>
          </div>
        </Box>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
