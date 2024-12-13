import { FaHouse } from "react-icons/fa6";
import { FaRoad } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa6";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <ul>
          <li>
            <a href="#" className="sidebar-item">
              <FaHouse className="sidebar-item-icon" />
              <p>Home</p>
            </a>
          </li>
          <li>
            <a href="#" className="sidebar-item">
              <FaRoad className="sidebar-item-icon" />
              <p>Roadmap</p>
            </a>
          </li>
          <li>
            <a href="#" className="sidebar-item">
              <FaNewspaper className="sidebar-item-icon" />
              <p>Blog</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
