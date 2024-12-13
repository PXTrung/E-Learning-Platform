import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import searchIcon from "../../../../assets/images/search.png";
import AddLevelModal from "../modal/AddLevelModal";

const Table_Level = () => {
  const [active, setActive] = useState(false);

  const handleClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setActive(!active);
  };

  return (
    <>
      <div className="table_container">
        <div className="table_caption">Manage Level</div>

        <div className="table">
          <section className="table_header">
            <div className="input-group">
              <img src={searchIcon} alt="Search Icon" />
              <input type="search" placeholder="Search Data..." />
            </div>

            <button className="add_btn" onClick={() => setActive(!active)}>
              Add
            </button>
          </section>

          <section className="table_body">
            <table className="dashboard_table">
              <thead>
                <tr className="level_rows">
                  <th> Order </th>
                  <th> Name </th>
                  <th> Action </th>
                </tr>
              </thead>
              <tbody>
                <tr className="level_rows">
                  <td>1</td>
                  <td>Beginer</td>
                  <td>
                    <FaRegEdit className="edit_icon_table" />
                  </td>
                </tr>
                <tr className="level_rows">
                  <td>2</td>
                  <td>Intermidiate</td>
                  <td>
                    <FaRegEdit />
                  </td>
                </tr>
                <tr className="level_rows">
                  <td>3</td>
                  <td>Advanced</td>
                  <td>
                    <FaRegEdit />
                  </td>
                </tr>
                <tr className="level_rows">
                  <td>4</td>
                  <td>All level</td>
                  <td>
                    <FaRegEdit />
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section className="table_footer">
            <div className="table_pagination">
              <button>Prev</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
              <button>5</button>
              <button>Next</button>
            </div>
          </section>
        </div>
      </div>

      <AddLevelModal isOpen={active} onClick={handleClose} />
    </>
  );
};

export default Table_Level;
