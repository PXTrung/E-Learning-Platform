import { IoAdd } from "react-icons/io5";
import { FaMinus } from "react-icons/fa";
import { Course } from "../../../../services/interfaces";

interface Props {
  variant: string;
  course: Course;
  enrollmentId: string;
  onAddToGroup?: (id: string) => void;
  onRemoveFromGroup?: (id: string) => void;
}
const GroupCourseCard = ({
  variant,
  course,
  onAddToGroup,
  enrollmentId,
  onRemoveFromGroup,
}: Props) => {
  const handleIconClick = () => {
    console.log("icon clicked");
  };
  return (
    <>
      {variant == "add" && (
        <div
          className="card"
          style={{ height: "310px" }}
          onClick={() => {
            if (onAddToGroup) onAddToGroup(enrollmentId);
          }}
        >
          <div className="card-image-container">
            <img
              src={course.thumbnailUrl}
              alt="Course Image"
              className="course-group-card-image"
            />
            <div className="course-group-card-icon-container">
              <div className="course-group-card-icon-wrapper course-group-card-add">
                <IoAdd
                  fontSize={32}
                  fontWeight={900}
                  color="#73EC8B"
                  onClick={handleIconClick}
                />
              </div>
            </div>
          </div>
          <div className="text_container">
            <div className="top-card">
              <div className="main_text">
                <p>{course.name}</p>
              </div>
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
      )}
      {variant == "delete" && (
        <div
          className="card"
          style={{ height: "310px" }}
          onClick={() => {
            if (onRemoveFromGroup) onRemoveFromGroup(enrollmentId);
          }}
        >
          <div className="card-image-container">
            <img
              src={course.thumbnailUrl}
              alt="Course Image"
              className="course-group-card-image"
            />
            <div className="course-group-card-icon-container">
              <div className="course-group-card-icon-wrapper course-group-card-delete">
                <FaMinus
                  fontSize={31}
                  fontWeight={900}
                  color="#FF0000"
                  onClick={handleIconClick}
                />
              </div>
            </div>
          </div>
          <div className="text_container">
            <div className="top-card">
              <div className="main_text">
                <p>{course.name}</p>
              </div>
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
      )}
    </>
  );
};

export default GroupCourseCard;
