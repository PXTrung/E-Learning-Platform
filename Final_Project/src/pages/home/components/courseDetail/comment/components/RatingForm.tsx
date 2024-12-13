import React, { LegacyRef, useRef, useState } from "react";
import RatingBar from "../../rating/RatingBar";
import useRating from "../../../../../../hooks/rating/useRating";
import { CreateRatingData } from "../../../../../../services/interfaces";

interface Props {
  isActive: boolean;
  courseId: string;
}

const RatingForm = ({ isActive, courseId }: Props) => {
  const [stars, setStars] = useState(0);
  const [text, setText] = useState("");
  const { createRating, createRatingMutation } = useRating();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    let data: CreateRatingData = {
      star: stars,
      review: text,
      courseId: courseId,
    };
    createRating(data);
  };

  // console.log(stars);
  // console.log(text);

  return (
    <div
      className={
        isActive ? "rating-form-container show" : "rating-form-container"
      }
    >
      <div className="rating-form">
        <div className="rating-form-group">
          <h4 className="course-rating-title">Send your rating</h4>

          <p className="rating-form-title">1. Your rating about this course</p>
          <RatingBar size="md" OnChange={(e: number) => setStars(e)} />
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
                onChange={handleTextChange}
              />
            </form>
          </div>
        </div>
        <div className="comment-button-bar">
          <div className="comment-button-container">
            <button className="comment-button-cancel">
              <div className="comment-button-cancel-inner">
                <span className="comment-button-cancel-innerText">Cancel</span>
              </div>
            </button>
            <button className="comment-button-submit" onClick={handleSubmit}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingForm;
