import { Outlet, useNavigate } from "react-router-dom";
import "../assets/css/authentication.css";
import { ToastContainer } from "react-toastify";

const Auth_Layout = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="authenticate-body">
        <div className="auth-wrapper ">
          <nav className="nav">
            <div className="nav-logo" onClick={navigateToHome}>
              <p>Estu .</p>
            </div>
          </nav>

          <Outlet />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Auth_Layout;
