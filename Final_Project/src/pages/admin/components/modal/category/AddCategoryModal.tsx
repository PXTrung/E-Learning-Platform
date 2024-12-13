import "../../../../../assets/css/AddCourseModal.css";
import AddCategoryForm from "./form/AddCategoryForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
}

const AddCategoryModal = ({ onClick, isOpen }: ModalProps) => {
  return (
    <>
      <div
        className={`dark_bg ${isOpen && "popup_active"}`}
        id="addCourseWrapperBg"
        onClick={(e) => onClick(e)}
      >
        <div className={`popup ${isOpen && "popup_active"}`}>
          <div className="product_form_container">
            <div className="title">
              <p>Add Category</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <AddCategoryForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategoryModal;
