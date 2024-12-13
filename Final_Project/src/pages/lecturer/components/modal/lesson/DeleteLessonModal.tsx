import { ImWarning } from "react-icons/im";
import useDeleteLesson from "../../../../../hooks/lesson/useDeleteLesson";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  lessonId: string;
  sessionId: string;
}

const DeleteLessonModal = ({
  onClick,
  isOpen,
  lessonId,
  sessionId,
}: ModalProps) => {
  const { mutate, isSuccess } = useDeleteLesson(lessonId, sessionId);

  const handleClick = () => {
    mutate();
  };

  // Use useEffect to show the toast after the mutation is successful
  useEffect(() => {
    if (isSuccess) toast.success("Delete Lesson Successfully");
    console.log("Success");
  }, [isSuccess]);

  return (
    <>
      <div
        className={`dark_bg ${isOpen && "popup_active"}`}
        id="addCourseWrapperBg"
        onClick={(e) => onClick(e)}
      >
        <div className={`popup ${isOpen && "popup_active"}`}>
          <div className="delete_form_container">
            <div className="title">
              <p>Delete Lesson</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>

            <div className="delete_area_container">
              <div className="delete_area">
                <div className="delete_icon_holder">
                  <ImWarning className="delete_icon" style={{ color: "red" }} />
                </div>
                <div className="delete_area_description">
                  Are you sure you want to delete this !
                </div>
                <div className="delete_area_footer">
                  <button id="cancelButton">Cancel</button>
                  <button onClick={handleClick}>Proceed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteLessonModal;
