import "../../../../../assets/css/AddCourseModal.css";
import AddLessonForm from "./form/AddLessonForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  sessionId: string;
}

const AddLectureModal = ({ onClick, isOpen, sessionId }: ModalProps) => {
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
              <p>Add Lesson</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <AddLessonForm sessionId={sessionId} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLectureModal;
