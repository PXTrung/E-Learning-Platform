import { FaRegUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { RegisterFormValue, registerSchema } from "./authSchema/registerSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from "../../hooks/auth/useAuth";
import "../../assets/css/authentication.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValue>({
    resolver: zodResolver(registerSchema),
  });

  const { signIn } = useAuth();

  const onSubmit = async (data: RegisterFormValue) => {
    await signIn(data);
  };

  return (
    <>
      {/* <!-- ---------------------------------- Form Box ---------------------------------------------- --> */}

      <div className="form-box">
        {/* <!-- ----------------------------------Registration Form------------------------------------------------ --> */}
        <form
          className="register-container"
          id="registerFirst"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="top">
            <header className="auth-header">Sign Up</header>
          </div>

          <div className="two-forms">
            <div className="input-box">
              <input
                type="text"
                className={
                  errors?.["firstName"]
                    ? "input-field border-red"
                    : "input-field"
                }
                {...register("firstName", { required: true })}
                placeholder="Firstname"
              />
              <FaRegUser className="auth-icon" />

              {errors?.["firstName"] && (
                <span className="auth_validation">
                  {errors?.["firstName"]?.message?.toString()}
                </span>
              )}
            </div>

            <div className="input-box">
              <input
                type="text"
                className={
                  errors?.["lastName"]
                    ? "input-field border-red"
                    : "input-field"
                }
                {...register("lastName", { required: true })}
                placeholder="Lastname"
              />
              <FaRegUser className="auth-icon" />

              {errors?.["lastName"] && (
                <span className="auth_validation">
                  {errors?.["lastName"]?.message?.toString()}
                </span>
              )}
            </div>
          </div>

          <div className="input-box">
            <input
              type="email"
              className={
                errors?.["email"] ? "input-field border-red" : "input-field"
              }
              {...register("email", { required: true })}
              placeholder="Email"
            />
            <FaRegEnvelope className="auth-icon" />

            {errors?.["email"] && (
              <span className="auth_validation">
                {errors?.["email"]?.message?.toString()}
              </span>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              className={
                errors?.["password"] ? "input-field border-red" : "input-field"
              }
              {...register("password", { required: true })}
              placeholder="Password"
            />
            <FaLock className="auth-icon" />

            {errors?.["password"] && (
              <span className="auth_validation">
                {errors?.["password"]?.message?.toString()}
              </span>
            )}
          </div>

          <div className="input-box">
            <input
              type="password"
              className={
                errors?.["confirmPassword"]
                  ? "input-field border-red"
                  : "input-field"
              }
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm Password"
            />
            <FaLock className="auth-icon" />

            {errors?.["confirmPassword"] && (
              <span className="auth_validation">
                {errors?.["confirmPassword"]?.message?.toString()}
              </span>
            )}
          </div>

          <div className="input-box">
            <button type="submit" className="submit">
              Register
            </button>
          </div>

          <div className="two-col">
            <div className="one">
              <input type="checkbox" id="register-check" />
              <label htmlFor="register-check"> Remember me</label>
            </div>

            <div className="two">
              <span>
                Have an account?{" "}
                <label htmlFor="">
                  <Link to={`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.LOGIN}`}>
                    Login
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

export default Register;
