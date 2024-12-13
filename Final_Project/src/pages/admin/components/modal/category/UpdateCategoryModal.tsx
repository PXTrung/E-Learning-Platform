import useCategory from "../../../../../hooks/category/useCategory";
import UpdateCategoryForm from "./form/UpdateCategoryForm";

interface ModalProps {
  onClick: (e: any) => void;
  id: string;
  isOpen: boolean;
}

const UpdateCategoryModal = ({ onClick, id, isOpen }: ModalProps) => {
  const { data } = useCategory(id || "");
  console.log(data?.data.id);

  return (
    <>
      <div
        className={`dark_bg ${isOpen && "popup_active"}`}
        id="addCourseWrapperBg"
        onClick={(e) => {
          onClick(e);
        }}
      >
        <div className={`popup ${isOpen && "popup_active"}`}>
          <div className="product_form_container">
            <div className="title">
              <p>Update Category</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <UpdateCategoryForm category={data?.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateCategoryModal;
