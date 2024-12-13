import { useEffect, useState } from "react";
import RatingBar from "../../rating/RatingBar";
import useRating from "../../../../../../hooks/rating/useRating";
import {
  CreateRatingData,
  EditRatingData,
  Ratings,
} from "../../../../../../services/interfaces";

interface Props {
  isActive: boolean;
  courseId: string;
  rating?: Ratings;
}

const EditRatingForm = ({ isActive, courseId, rating }: Props) => {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState(rating?.review || "");
  const [isDisable, setIsDisable] = useState(true);
  const { editRating, editRatingMutation } = useRating();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleEditSubmit = () => {
    let data: EditRatingData = {
      id: rating?.id || "",
      star: stars,
      review: text,
    };
    editRating(data);
  };

  useEffect(() => {
    if (editRatingMutation.isSuccess) {
      setIsDisable(true);
    }
  }, [editRatingMutation.isSuccess]);

  return (
    <div
      className={
        isActive ? "rating-form-container show" : "rating-form-container"
      }
    >
      <div className="rating-form">
        <div className="rating-form-group">
          <div className="course-rating-title-container">
            <h4 className="course-rating-title">Edit your rating</h4>
            <h4
              className={`course-rating-toggle${
                isDisable ? " edit" : " cancel"
              }`}
              onClick={() => setIsDisable(!isDisable)}
            >
              {isDisable ? "Edit" : "Cancel"}
            </h4>
          </div>
          <p className="rating-form-title">1. Your rating about this course</p>
          <RatingBar
            size="md"
            stars={rating?.star}
            OnChange={(e: number) => setStars(e)}
            disable={isDisable}
            opacity={isDisable ? 0.5 : 1}
          />
        </div>
        <div className="rating-form-group">
          <p className="rating-form-title">
            2. Write your comment about this course
          </p>
          <div className="comment-input-wrapper">
            <form action="" className="comment-input-wrapper">
              <textarea
                aria-label="comment-input"
                id="comment"
                className={isDisable ? "disable" : ""}
                value={text}
                onChange={handleTextChange}
                disabled={isDisable}
              />
            </form>
          </div>
        </div>
        {!isDisable && (
          <div className="comment-button-bar">
            <div className="comment-button-container">
              <button className="comment-button-cancel">
                <div className="comment-button-cancel-inner">
                  <span className="comment-button-cancel-innerText">
                    Cancel
                  </span>
                </div>
              </button>
              <button
                className="comment-button-submit"
                onClick={handleEditSubmit}
              >
                Edit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditRatingForm;
