import { FaRegPlayCircle } from "react-icons/fa";
import { Lessons } from "../../../../services/interfaces";
import { Link, useLocation } from "react-router-dom";

interface Props {
  lesson: Lessons;
  position: number;
  courseId?: string;
}

const PaidCourseAccordionItem = ({ lesson, position, courseId }: Props) => {
  const location = useLocation();

  return (
    <div className="answer-content">
      <div className="answer-content-item">
        <FaRegPlayCircle className="course-icon" />
        <Link
          to={`/course/${courseId}/session/${lesson.sessionId}/learning/${lesson.id}`}
          className="course-name "
        >
          {`${position}. ${lesson.name}`}
        </Link>
      </div>
      <span className="course-time">{lesson.duration}</span>
    </div>
  );
};

export default PaidCourseAccordionItem;
