import { FaHome } from "react-icons/fa";
import CartIcon from "../cart/CartIcon";
import UserIconProduct from "../user_icon/UserIconProduct";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiCircleChevLeft } from "react-icons/ci";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the path after /admin/
  const currentPath = location.pathname;
  console.log(currentPath);

  return (
    <section className="profile-header">
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
        <CartIcon />

        <UserIconProduct />
      </div>
    </section>
  );
};

export default ProfileHeader;
