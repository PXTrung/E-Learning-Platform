import { useState } from "react";
import {
  IoAccessibilityOutline,
  IoAppsOutline,
  IoBookOutline,
  IoMenuOutline,
  IoSchoolOutline,
  IoSearchOutline,
} from "react-icons/io5";
import "../assets/css/Admin_Layout.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "../constants/path";
import { ToastContainer } from "react-toastify";
import UserIcon from "../components/user_icon/UserIcon";

const Admin_Layout = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();

  // Extract the path after /admin/
  const currentPath = location.pathname.replace(
    `/${PATHS.ADMIN.IDENTITY}/`,
    ""
  );
  console.log(currentPath);

  return (
    <>
      <div className="container">
        <div className={`navigation ${active ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#">
                <span className="icon">
                  <IoBookOutline size={"1.75rem"} />
                </span>
                <span className="title">Estu</span>
              </a>
            </li>

            <li
              className={currentPath == PATHS.ADMIN.CATEGORY ? "hovered" : ""}
            >
              <Link key={"Category"} to={`${PATHS.ADMIN.CATEGORY}`}>
                <span className="icon">
                  <IoAppsOutline size={"1.75rem"} />
                </span>
                <span className="title">Category</span>
              </Link>
            </li>

            <li className={currentPath == PATHS.ADMIN.COURSE ? "hovered" : ""}>
              <Link key={"Course"} to={`${PATHS.ADMIN.COURSE}`}>
                <span className="icon">
                  <IoSchoolOutline size={"1.75rem"} />
                </span>
                <span className="title">Course</span>
              </Link>
            </li>

            <li className={currentPath == PATHS.ADMIN.USER ? "hovered" : ""}>
              <Link key={"User"} to={`${PATHS.ADMIN.USER}`}>
                <span className="icon">
                  <IoAccessibilityOutline size={"1.75rem"} />
                </span>
                <span className="title">User</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className={`main ${active ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle">
            <IoMenuOutline onClick={() => setActive(!active)} />
          </div>

          <UserIcon />
        </div>

        <Outlet />
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

export default Admin_Layout;
