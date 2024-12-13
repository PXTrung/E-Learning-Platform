import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import noNameUser from "../../../../../assets/images/User-NoName.png";
import RatingBar from "../rating/RatingBar";
import AverageStar from "./components/AverageStar";
import RatingForm from "./components/RatingForm";
import UserReview from "./components/UserReview";
import useRating from "../../../../../hooks/rating/useRating";
import { Course, Ratings } from "../../../../../services/interfaces";
import authUtis from "../../../../../utils/auth";
import EditRatingForm from "./components/EditRatingForm";

interface Props {
  Course: Course;
}

const Comment = ({ Course }: Props) => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);

  const { getRatings } = useRating();

  const { data } = getRatings(Course.id);

  const token = authUtis.decodeCurrentToken();
  const currentUserReview = data?.data.find(
    (rating: Ratings) =>
      rating.user.id.toLowerCase() === token?.id.toLowerCase()
  );

  const handleActive = () => {
    setActive(!active);
  };

  // Disable body scroll when modal is open
  useEffect(() => {
    if (toggle) {
      document.documentElement.style.overflow = "hidden"; // Hide scrollbar
    } else {
      document.documentElement.style.overflow = "auto"; // Re-enable scrollbar
    }

    // Cleanup to reset on unmount or modal close
    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [toggle]);

  return (
    <>
      {/* <!-- =================================== comment ====================================================== --> */}
      <div className="course-comment">
        <button id="toggle-course-comment" onClick={() => setToggle(!toggle)}>
          <FaRegCommentDots className="course-comment-icon" />
          <span>Comments</span>
        </button>
      </div>

      {/* <!-- ============ comment modal ================== --> */}
      <div
        className={
          toggle
            ? "course-comment-modal-container comment-modal-active"
            : "course-comment-modal-container"
        }
      >
        <div
          className={
            toggle
              ? "course-comment-modal comment-modal-active"
              : "course-comment-modal"
          }
        >
          <div className="close-comment-modal-btn">
            <FaXmark
              className="close-comment-icon"
              onClick={() => setToggle(!toggle)}
            />
          </div>

          <div className="course-comment-modal-body">
            <AverageStar OnClick={handleActive} star={Course.averageRating} />
            {Course.id && !currentUserReview ? (
              <RatingForm isActive={active} courseId={Course.id} />
            ) : (
              <EditRatingForm
                isActive={active}
                courseId={Course.id}
                rating={currentUserReview}
              />
            )}

            <div className="comments-list-container">
              <div className="comments-list-header">
                <h2 className="comments-list-header-title">
                  {data?.totalCount} Comments
                </h2>
              </div>

              <div className="comments-list-wrapper">
                {data?.data.map((i) => (
                  <UserReview ratings={i} key={i.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
