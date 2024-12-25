import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";

const CompletePurchasePage = () => {
  return (
    <div className="content-product">
      <div className="payment-success-wrapper">
        <div className="payment-success-container">
          <h2 className="payment-success-title">
            Congratulations! Your Payment Was Successful{" "}
          </h2>
          <span className="payment-success-description">
            We're excited to have you on board!! The course has been added to
            your account, and you can start learning right away
          </span>
          <div className="payment-success-button-bar">
            <Link to={"/"} className="payment-success-go-home">
              <span className="inner-go-home">
                <span className="inner-go-home-title">Go to Home</span>
              </span>
            </Link>
            <Link
              to={`/${PATHS.PROFILE.IDENTITY}/courses`}
              className="payment-success-go-home"
            >
              <span className="inner-go-home">
                <span className="inner-go-home-title">Go to Library</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePurchasePage;
