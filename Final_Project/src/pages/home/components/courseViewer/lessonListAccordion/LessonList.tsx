import { FaXmark } from "react-icons/fa6";
import LessonAccordion from "./LessonAccordion";
import useSessions from "../../../../../hooks/session/useSessions";

interface Props {
  active: boolean;
  setActive: (active: boolean) => void;
  courseId?: string;
}

const LessonList = ({ active, setActive, courseId }: Props) => {
  const { data } = useSessions(courseId || "");
  return (
    <>
      {/* <!-- ================================== Overlay ============================================= --> */}
      <div
        className={
          active
            ? "course-viewer-overlay listCourseToggle"
            : "course-viewer-overlay"
        }
      ></div>

      {/* <!-- ============================== List Session Lessons ================================ --> */}
      <div
        className={
          active
            ? "course-sesstion-list listCourseToggle"
            : "course-sesstion-list"
        }
      >
        <div className="course-session-list-container">
          <header>
            <h1>Lessons List</h1>
            <button
              aria-label="Close Button"
              className="course-session-list-button"
            >
              <FaXmark
                className="close-comment-icon"
                onClick={() => setActive(!active)}
              />
            </button>
          </header>
          {data?.data.map((i, index) => (
            <LessonAccordion
              session={i}
              key={i.id}
              position={++index}
              courseId={courseId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default LessonList;
