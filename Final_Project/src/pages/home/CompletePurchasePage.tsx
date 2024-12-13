import { Link } from "react-router-dom";

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
            <a href="#" className="payment-success-go-home">
              <span className="inner-go-home">
                <span className="inner-go-home-title">Go to Library</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletePurchasePage;
