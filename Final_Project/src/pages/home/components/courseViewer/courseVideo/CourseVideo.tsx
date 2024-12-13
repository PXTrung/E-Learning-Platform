import ReactPlayer from "react-player";
import testVideo from "../../../../../assets/video/Maroon 5 - Payphone ft. Wiz Khalifa (Explicit) (Official Music Video).mp4";
import videoPlaceholder from "../../../../../assets/images/ImgPlaceHolder.png";
import { Course, Lessons } from "../../../../../services/interfaces";
import { useEffect, useState } from "react";

interface Props {
  lesson?: Lessons;
  course?: Course;
}

const CourseVideo = ({ lesson, course }: Props) => {
  const [play, setPlay] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    setPlay(false);
    setShowPreview(true);
  }, [lesson]);

  const handleClickPreview = () => {
    setShowPreview(false);
    setPlay(!play);
  };

  console.log(play);

  return (
    <>
      {/* <!-- ========================== Course Video ======================================= --> */}
      <div className="course-viewer-video">
        <div className="course-video-container">
          <div className="course-video-wrapper ">
            {/* {some browser block autoplay unless it mute. So if you want to enable autoplay remember set muted = true} */}
            <div className="course-video-player">
              <ReactPlayer
                url={lesson?.videoUrl}
                controls={true}
                playing={play}
                light={showPreview ? course?.thumbnailUrl : false}
                width={"100%"}
                height={"100%"}
                onClickPreview={handleClickPreview}
              />
            </div>
          </div>
        </div>

        <div className="course-viewer-description-container">
          <div className="course-viewer-courseName">
            <header>
              <h1>{lesson?.name}</h1>
              <p>Updated on 12/02/2003</p>
            </header>
          </div>

          <div className="course-viewer-courseDescription">
            <p>{lesson?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseVideo;
