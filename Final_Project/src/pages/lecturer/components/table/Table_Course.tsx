import { useState } from "react";
import searchIcon from "../../../../assets/images/search.png";

import { FaRegEdit } from "react-icons/fa";
import AddCourseModal from "../modal/course/AddCourseModal";
import "../../../../assets/css/table.css";
import useCourses from "../../../../hooks/course/useCourses";
import { Link } from "react-router-dom";
import UpdateCourseModal from "../modal/course/UpdateCourseModal";
import CourseRowSkeleton from "../../../../components/skeleton/CourseRowSkeleton";
import { Pagination } from "@mantine/core";
import useStore from "../../../../store";

const Table_Course = () => {
  const [active, setActive] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const { data, error, isLoading } = useCourses();
  const { courseQuery } = useStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    courseQuery.setName(value);
  };

  const handleClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setActive(!active);
  };

  const handleUpdateModalClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setUpdateModalActive(!updateModalActive);
  };

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div className="table_container">
        <div className="table_caption">Manage Courses</div>

        <div className="table">
          <section className="table_header">
            <div className="input-group">
              <img src={searchIcon} alt="Search Icon" />
              <input
                type="text"
                placeholder="Search Data..."
                onChange={handleOnChange}
              />
            </div>

            <button className="add_btn" onClick={() => setActive(!active)}>
              Add
            </button>
          </section>

          <section className="table_body">
            <table className="dashboard_table">
              <thead>
                <tr className="product_rows">
                  <th> Thumbnail </th>
                  <th> Name </th>
                  <th> Category </th>
                  <th> Level </th>
                  <th> Price (Vnd) </th>
                  <th> Action </th>
                </tr>
              </thead>

              <tbody>
                {!isLoading ? (
                  data?.data.map((i) => (
                    <tr className="product_rows" key={i.id}>
                      <td>
                        <img src={i.thumbnailUrl} alt="" />
                      </td>

                      <td>
                        <Link to={`${i.id}`} className="table_link">
                          {i.name}
                        </Link>
                      </td>

                      <td>
                        <Link to={`${i.id}`} className="table_link">
                          {i.category}
                        </Link>
                      </td>

                      <td>
                        <Link to={`${i.id}`} className="table_link">
                          {i.level}
                        </Link>
                      </td>

                      <td>
                        <Link to={`${i.id}`} className="table_link">
                          <strong>{i.price}</strong>
                        </Link>
                      </td>

                      <td>
                        <FaRegEdit
                          className="edit_icon_table"
                          onClick={() => {
                            setSelectedCourse(i.id);
                            setUpdateModalActive(!updateModalActive);
                          }}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <CourseRowSkeleton amount={5} />
                )}
              </tbody>
            </table>
          </section>

          <section className="table_footer">
            <Pagination
              total={data?.totalPages || 10}
              value={courseQuery.page}
              onChange={courseQuery.setPage}
              color="indigo"
            />
          </section>
        </div>
      </div>

      <AddCourseModal isOpen={active} onClick={handleClose} />
      {updateModalActive && (
        <UpdateCourseModal
          onClick={handleUpdateModalClose}
          id={selectedCourse}
          isOpen={updateModalActive}
        />
      )}
    </>
  );
};

export default Table_Course;
