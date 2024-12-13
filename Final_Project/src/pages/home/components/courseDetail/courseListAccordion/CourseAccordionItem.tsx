import { FaRegPlayCircle } from "react-icons/fa";
import { Lessons } from "../../../../../services/interfaces";

interface Props {
  lesson: Lessons;
  position: number;
  courseId?: string;
}

const CourseAccordionItem = ({ lesson, position, courseId }: Props) => {
  return (
    <div className="answer-content">
      <div className="answer-content-item">
        <FaRegPlayCircle className="course-icon" />
        <a className="course-name ">{`${position}. ${lesson.name}`}</a>
      </div>
      <span className="course-time">{lesson.duration}</span>
    </div>
  );
};

export default CourseAccordionItem;
