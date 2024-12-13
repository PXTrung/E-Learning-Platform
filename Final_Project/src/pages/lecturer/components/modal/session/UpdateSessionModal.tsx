import "../../../../../assets/css/AddCourseModal.css";
import useSession from "../../../../../hooks/session/useSession";
import UpdateSessionForm from "./form/UpdateSessionForm";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
  sessionId: string;
  courseId: string;
}

const UpdateSessionModal = ({
  onClick,
  isOpen,
  sessionId,
  courseId,
}: ModalProps) => {
  const { data } = useSession(sessionId);

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
                <p>Add Session</p>
                <button className="closeBtn" id="closeButton">
                  &times;
                </button>
              </div>
              <UpdateSessionForm session={data.data} courseId={courseId} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateSessionModal;
