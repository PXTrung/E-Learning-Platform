import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCourse from "../../hooks/course/useCourse";
import useCourses from "../../hooks/course/useCourses";
import CourseDetailBanner from "../home/components/courseDetail/banner/CourseDetailBanner";
import Comment from "../home/components/courseDetail/comment/Comment";
import PaidCourseList from "./components/paidCourseDetail/PaidCourseList";
import Header from "../../components/header/Header";

const PaidCourseDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const courses = useCourses();

  useEffect(() => {
    if (courses.data) {
      const courseExists = courses.data.data.some((course) => course.id === id);

      if (!courseExists) {
        navigate("/not-found"); // Redirect to your 404 route, ensure the route is "/not-found"
      }
    }
  }, [id, courses.data, navigate]);

  const { data, error } = useCourse(id || "");

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <Header />
      <div className="content-product">
        <div className="course-detail-container">
          <div className="course-detail-infor">
            <div className="course-detail-content-container">
              <div>
                <h1 className="courseName">{data?.data.name}</h1>
                <div className="courseDescription">
                  {data?.data.description}
                </div>
              </div>
              <div>
                <div className="listCourses-header-container">
                  <div className="listCourses-header">
                    <h2>Learning Contents</h2>
                  </div>

                  <div className="listCourses-subHeader">
                    <ul>
                      <li>
                        <strong>{data?.data.numberOfLessons}</strong> Lessons
                      </li>
                      <li className="dot">.</li>
                      <li>
                        Total <strong>{data?.data.totalTime}</strong>
                      </li>
                    </ul>
                  </div>
                </div>

                <PaidCourseList id={data?.data.id} />
              </div>

              {data?.data && <Comment Course={data?.data} />}
            </div>
          </div>

          <CourseDetailBanner course={data?.data} />
        </div>
      </div>
    </>
  );
};

export default PaidCourseDetail;
