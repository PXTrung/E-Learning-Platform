import RatingBar from "../../rating/RatingBar";

interface Props {
  OnClick: () => void;
  star?: number;
}

const AverageStar = ({ OnClick, star }: Props) => {
  let formatedNumber = Number(star?.toPrecision(3));
  console.log(formatedNumber);
  return (
    <div>
      <h4 className="course-rating-title">Learner's Rating</h4>
      <div className="overall-rating-container">
        <div className="overall-rating">
          <div className="rating-average-container">
            <div className="rating-average-wrapper">
              {star ? (
                <div className="rating-average-number">
                  <span>{formatedNumber}</span>
                </div>
              ) : (
                <div className="rating-average-no-review">
                  <span>No Rating</span>
                </div>
              )}

              <div className="rating-average-star">
                <RatingBar
                  size="md"
                  stars={formatedNumber}
                  fraction={4}
                  disable
                />
              </div>
            </div>
          </div>
          <div className="rating-average-container">
            <div className="rating-average-button-wrapper">
              <button className="rating-average-button" onClick={OnClick}>
                Your Rating
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AverageStar;
