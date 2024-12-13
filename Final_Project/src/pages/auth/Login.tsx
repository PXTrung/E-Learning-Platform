import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaLock, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../assets/css/authentication.css";
import { PATHS } from "../../constants/path";
import useAuth from "../../hooks/auth/useAuth";
import { LoginFormValue, loginSchema } from "./authSchema/loginSchema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValue>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormValue) => {
    await login(data);
  };

  return (
    <>
      {/* <!-- ---------------------------------- Form Box ---------------------------------------------- --> */}

      <div className="form-box">
        {/* <!-- ----------------------------------Login Form------------------------------------------------ --> */}
        <form
          className="login-container"
          id="login"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="top">
            <header className="auth-header">Login</header>
          </div>

          <div className="input-box">
            <input
              type="email"
              className="input-field"
              {...register("email", { required: true })}
              placeholder="Email"
            />
            <FaRegUser className="auth-icon" />
          </div>
          {errors?.["email"] && (
            <span className="auth_validation">
              {errors?.["email"]?.message?.toString()}
            </span>
          )}

          <div className="input-box">
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            <FaLock className="auth-icon" />
            {errors?.["password"] && (
              <span className="auth_validation">
                {errors?.["password"]?.message?.toString()}
              </span>
            )}
          </div>

          <div className="input-box">
            <input type="submit" className="submit" value="login" />
          </div>

          <div className="two-col">
            <div className="one">
              <span>
                <a href="#">Forgot Password?</a>
              </span>
            </div>

            <div className="two">
              <span>
                Don't have account?{" "}
                <label htmlFor="">
                  <Link to={`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.REGISTER}`}>
                    Register
                  </Link>
                </label>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
