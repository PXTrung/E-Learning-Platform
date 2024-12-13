import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/path";
import authUtils from "../../utils/auth";
import CartIcon from "../cart/CartIcon";
import UserIconProduct from "../user_icon/UserIconProduct";
import { CiCircleChevLeft } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  const token = authUtils.getSessionToken();
  const location = useLocation();

  // Extract the path after /admin/
  const currentPath = location.pathname;

  return (
    <section id="header">
      <div className="header-icon">
        <Link to={"/"}>
          <FaHome className="Home-icon" />
        </Link>

        {currentPath !== "/home" ? (
          <>
            <CiCircleChevLeft
              size={32}
              color="#808990"
              className="Return-icon"
              onClick={() => navigate(-1)}
            />{" "}
            <p className="header-return" onClick={() => navigate(-1)}>
              Return
            </p>
          </>
        ) : (
          <p className="header-title">EStu</p>
        )}
      </div>

      <div className="header-right-side">
        {token && <CartIcon />}

        {token ? (
          <UserIconProduct />
        ) : (
          <div className="authentication">
            <Link
              to={`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.LOGIN}`}
              className="btn btn-login"
            >
              Login
            </Link>
            <Link
              to={`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.REGISTER}`}
              className="btn btn-register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
