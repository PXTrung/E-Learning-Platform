import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaBars, FaChevronLeft } from "react-icons/fa6";
import "../../assets/css/courseViewer.css";

import { useNavigate, useParams } from "react-router-dom";
import useLesson from "../../hooks/lesson/useLesson";
import CourseVideo from "./components/courseViewer/courseVideo/CourseVideo";
import LessonList from "./components/courseViewer/lessonListAccordion/LessonList";
import useCourse from "../../hooks/course/useCourse";

const CourseViewer = () => {
  const [commentToggle, setCommentToggle] = useState(false);
  const { courseId, id } = useParams<{ courseId: string; id: string }>();
  const { data, error } = useLesson(id || "");
  const course = useCourse(courseId || "");
  const navigate = useNavigate();

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <section className="course-viewer-layout">
        <div className="course-viewer-topBar">
          <div className="back-button">
            <FaChevronLeft
              className="back-button-icon"
              onClick={() => navigate(-1)}
            />
          </div>
          <a href="" aria-label="Home icon" className="course-viewer-logo">
            <FaHome className="Home-icon" />
          </a>
          <div className="course-viewer-title">{data?.data.name}</div>
          <div className="course-viewer-action">
            <button
              aria-label="Toggle Button"
              className="course-viewer-toggle-btn"
            >
              <FaBars onClick={() => setCommentToggle(!commentToggle)} />
            </button>
          </div>
        </div>

        <CourseVideo lesson={data?.data} course={course.data?.data} />

        <LessonList
          active={commentToggle}
          setActive={setCommentToggle}
          courseId={courseId}
        />
      </section>
    </>
  );
};

export default CourseViewer;
