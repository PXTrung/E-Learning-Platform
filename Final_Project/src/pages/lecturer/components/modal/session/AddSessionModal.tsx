import "../../../../../assets/css/AddCourseModal.css";
import AddSessionForm from "./form/AddSessionForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  courseId: string;
}

const AddSessionModal = ({ onClick, isOpen, courseId }: ModalProps) => {
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
              <p>Add Session</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <AddSessionForm id={courseId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSessionModal;
