import { useDraggable } from "@dnd-kit/core";
import { Course } from "../../../../services/interfaces";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../constants/path";

interface Props {
  course: Course;
  enrollmentId: string;
}

const CourseCard = ({ course, enrollmentId }: Props) => {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: enrollmentId,
  });

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/${PATHS.PROFILE.IDENTITY}/courses/${id}`);
    console.log("click");
  };

  return (
    <div
      className="card"
      onClick={(e) => handleClick(e, course.id)}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <img
        src={course.thumbnailUrl}
        alt="course image"
        className="card-image"
      />
      <div className="text_container">
        <div className="top-card">
          <div className="main_text">
            <p>{course.name}</p>
          </div>
          <div className="card_price">{course.price} vnd</div>
        </div>
        <div className="bottom-card">
          {course.level == "Beginer" && (
            <div className="level beginer">
              <p>{course.level}</p>
            </div>
          )}
          {course.level == "Intermidiate" && (
            <div className="level intermidiate">
              <p>{course.level}</p>
            </div>
          )}
          {course.level == "Advanced" && (
            <div className="level advanced">
              <p>{course.level}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
