import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Admin_Layout.css";
import "../../assets/css/Dropdown_Profile_Menu.css";
import noName from "../../assets/images/User-NoName.png";
import edit from "../../assets/images/icons/edit.png";
import logout from "../../assets/images/icons/log-out.png";
import user from "../../assets/images/icons/user.png";
import authUtils from "../../utils/auth";
import { PATHS } from "../../constants/path";

const UserIconProduct = () => {
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();

  const handleLogout = () => {
    authUtils.removeSessionToken();
    Navigate("/");
  };

  const handleNavigateToProfile = () => {
    Navigate(`/${PATHS.PROFILE.IDENTITY}/courses`);
  };

  return (
    <>
      <div className="user-product">
        <img src={noName} alt="No Name User" onClick={() => setOpen(!open)} />
      </div>
      <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
        <h3>Trung Spring</h3>
        <ul>
          <li className="dropdownItem" onClick={handleNavigateToProfile}>
            <img src={user} alt="Profile" />
            <a> Profile </a>
          </li>
          <li className="dropdownItem" onClick={handleLogout}>
            <img src={logout} alt="Log Out" />
            <a> Logout </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserIconProduct;
