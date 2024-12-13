import { Pagination } from "@mantine/core";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../../../../assets/css/table.css";
import searchIcon from "../../../../assets/images/search.png";
import useCategories from "../../../../hooks/category/useCategories";
import useStore from "../../../../store";
import AddCategoryModal from "../modal/category/AddCategoryModal";
import UpdateCategoryModal from "../modal/category/UpdateCategoryModal";

const Table_Category = () => {
  const [addModalActive, setAddModalActive] = useState(false);
  const [updateModalActive, setUpdateModalActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const { data, error } = useCategories();

  const { categoryQuery } = useStore();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    categoryQuery.setName(value);
  };

  const handleAddModalClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setAddModalActive(!addModalActive);
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
        <div className="table_caption">Manage Category</div>

        <div className="table">
          <section className="table_header">
            <div className="input-group">
              <img src={searchIcon} alt="Search Icon" />
              <input
                type="search"
                placeholder="Search Data..."
                onChange={handleOnChange}
              />
            </div>

            <button
              className="add_btn"
              onClick={() => setAddModalActive(!addModalActive)}
            >
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
                {data?.data.map((i, index) => (
                  <tr key={i.id} className="level_rows">
                    <td>{index + 1}</td>
                    <td>{i.name}</td>
                    <td>
                      <FaRegEdit
                        className="edit_icon_table"
                        onClick={() => {
                          setSelectedCategory(i.id);
                          setUpdateModalActive(!updateModalActive);
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="table_footer">
            <Pagination
              total={data?.totalPages || 10}
              value={categoryQuery.page}
              onChange={categoryQuery.setPage}
              color="indigo"
            />
          </section>
        </div>
      </div>

      <AddCategoryModal isOpen={addModalActive} onClick={handleAddModalClose} />
      {updateModalActive && (
        <UpdateCategoryModal
          onClick={handleUpdateModalClose}
          id={selectedCategory}
          isOpen={updateModalActive}
        />
      )}
    </>
  );
};

export default Table_Category;
