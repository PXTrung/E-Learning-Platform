import { Button } from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { FaArrowLeftLong } from "react-icons/fa6";
import CourseCard from "./components/card/CourseCard";
import folder from "../../assets/images/Folder_Image.png";
import { useNavigate, useParams } from "react-router-dom";
import useCourseGroup from "../../hooks/courseGroup/useCourseGroup";
import { PATHS } from "../../constants/path";

const CourseGroupPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourseGroupById } = useCourseGroup();
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/${PATHS.PROFILE.IDENTITY}/courses`);
  };

  const { data } = getCourseGroupById(id || "");
  return (
    <div className="group-course-container">
      {/* <div className="group-course-header-button">
        <Button color="violet" leftSection={<CiEdit size={20} />}>
          Edit Group
        </Button>
      </div> */}
      <div className="group-course-title-container">
        <FaArrowLeftLong
          fontSize={23}
          onClick={handleNavigation}
          style={{ cursor: "pointer" }}
        />
        <div className="group-course-title">
          <div className="group-course-image">
            <img src={folder} alt="folder icon" />
          </div>
          <span>/</span>
          <span>{data?.data.name}</span>
        </div>
      </div>
      <div className="group-course-content-container">
        <div className="profile-course-body-container">
          {data?.data.enrollments.map((i) => (
            <CourseCard course={i.course} key={i.id} enrollmentId={i.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGroupPage;
