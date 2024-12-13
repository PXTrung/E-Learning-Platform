import { useState } from "react";
import { useParams } from "react-router-dom";
import "../../assets/css/SessionLecture.css";
import useCourse from "../../hooks/course/useCourse";
import Accordion from "./components/accordion/Accordion";
import AddSessionModal from "./components/modal/session/AddSessionModal";

const SessionLecture = () => {
  const [active, setActive] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data, error } = useCourse(id || "");

  const handleClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setActive(!active);
  };

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <div className="main_body">
        <div className="session_container">
          <div className="session_title">
            {data?.data && (
              <>
                <div className="session_image">
                  <img src={data.data.thumbnailUrl} alt="" />
                </div>
                <div className="session_description">
                  <h2>{data.data.name}</h2>
                  <span>{data.data.description}</span>
                </div>
              </>
            )}
          </div>
          <div className="session_body">
            <div className="session_content">
              <div className="session_content_header">
                <button onClick={() => setActive(!active)}>New Session</button>
              </div>
              <div className="session_content_body">
                <Accordion id={data?.data.id || ""} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddSessionModal
        isOpen={active}
        onClick={handleClose}
        courseId={id || ""}
      />
    </>
  );
};

export default SessionLecture;
