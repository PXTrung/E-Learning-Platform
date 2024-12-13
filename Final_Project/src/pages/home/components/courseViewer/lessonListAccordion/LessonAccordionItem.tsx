import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { Lessons } from "../../../../../services/interfaces";

interface Props {
  lesson: Lessons;
  position: number;
  courseId?: string;
}

const LessonAccordionItem = ({ lesson, position, courseId }: Props) => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {lesson.id == id ? (
        <div className="answer-content-small answer-content-active">
          <div className="answer-content-item ">
            <FaRegCirclePause className="course-icon answer-content-active" />
            <Link to={`/course/${courseId}/learning/${lesson.id}`}>
              {position}. {lesson.name}
            </Link>
          </div>
          <span className="course-time">{lesson.duration}</span>
        </div>
      ) : (
        <div className="answer-content-small">
          <div className="answer-content-item ">
            <FaRegCirclePlay className="course-icon" />
            <Link
              to={`/course/${courseId}/session/${lesson.sessionId}/learning/${lesson.id}`}
              replace={true}
            >
              {position}. {lesson.name}
            </Link>
          </div>
          <span className="course-time">{lesson.duration}</span>
        </div>
      )}
    </>
  );
};

export default LessonAccordionItem;
