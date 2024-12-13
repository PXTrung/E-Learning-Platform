import "../../../../../assets/css/AddCourseModal.css";
import useCategories from "../../../../../hooks/category/useCategories";
import AddCourseForm from "./form/AddCourseForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
}

const AddCourseModal = ({ onClick, isOpen }: ModalProps) => {
  const { data, error } = useCategories();

  if (error) {
    console.log(error);
  }
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
              <p>Add Course</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <AddCourseForm categories={data?.data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseModal;
