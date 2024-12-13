import noNameUser from "../../../../../../assets/images/User-NoName.png";
import { Ratings } from "../../../../../../services/interfaces";
import RatingBar from "../../rating/RatingBar";

interface Props {
  ratings: Ratings;
}

const UserReview = ({ ratings }: Props) => {
  return (
    <div className="comment-wrapper">
      <div className="comment-header">
        <div className="comment-user-avatarHolder">
          <img
            src={ratings.user.avatarUrl ? ratings.user.avatarUrl : noNameUser}
            alt=""
            className="comment-user-avatar"
          />
        </div>

        <div className="comment-userName-container">
          <span className="comment-userName">{ratings.user.userName}</span>
          <span className="comment-userName-isEdit">
            {ratings.isEdit ? "  (Edited)" : ""}
          </span>
          <RatingBar size="xs" stars={ratings.star} disable />
        </div>
      </div>

      <div className="comment-body">
        <div>
          <p>{ratings.review}</p>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
