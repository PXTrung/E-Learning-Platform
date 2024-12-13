import useLesson from "../../../../../hooks/lesson/useLesson";
import UpdateLessonForm from "./form/UpdateLessonForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  lessonId: string;
  sessionId: string;
}

const UpdateLessonModal = ({
  onClick,
  isOpen,
  lessonId,
  sessionId,
}: ModalProps) => {
  const { data } = useLesson(lessonId);

  return (
    <>
      {data?.data && (
        <div
          className={`dark_bg ${isOpen && "popup_active"}`}
          id="addCourseWrapperBg"
          onClick={(e) => onClick(e)}
        >
          <div className={`popup ${isOpen && "popup_active"}`}>
            <div className="product_form_container">
              <div className="title">
                <p>Update Lesson</p>
                <button className="closeBtn" id="closeButton">
                  &times;
                </button>
              </div>
              <UpdateLessonForm lesson={data.data} sessionId={sessionId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateLessonModal;
