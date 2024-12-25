import { FaGaugeHigh } from "react-icons/fa6";
import { FaFilm } from "react-icons/fa6";
import { FaClock } from "react-icons/fa6";
import { FaBatteryFull } from "react-icons/fa6";
import { Course } from "../../../../../services/interfaces";
import useCart from "../../../../../hooks/cart/useCart";
import { PATHS } from "../../../../../constants/path";
import { useNavigate } from "react-router-dom";
import useEnrollment from "../../../../../hooks/enrollment/useEnrollment";

interface Props {
  course?: Course;
}

const CourseDetailBanner = ({ course }: Props) => {
  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    useGrouping: true,
  }).format(course?.price || 0);

  const navigate = useNavigate(); // Initialize the navigate hook
  const { addToCart, getCart } = useCart();
  const { getEnrollments } = useEnrollment();
  const { data } = getCart();
  const enrollments = getEnrollments();

  const isCourseInCart = data?.cartItems.some((i) => i.courseId == course?.id);

  const isCoursePaid = enrollments.data?.data.some(
    (i) => i.course.id === course?.id
  );

  const handleAddToCart = (id: string) => {
    addToCart(id);
  };

  const handleGoToCart = () => {
    navigate(`/${PATHS.HOME.IDENTITY}/${PATHS.HOME.CART}`);
  };

  return (
    <div className="course-detail-display">
      <div className="course-detail-banner">
        <div className="banner-image">
          <img src={course?.thumbnailUrl} alt="" />
        </div>
        <h5>{formattedPrice} vnd</h5>
        {isCourseInCart ? (
          <button className="buyBtn" onClick={() => handleGoToCart()}>
            <span className="inner-buyBtn">Go to Cart</span>
          </button>
        ) : isCoursePaid ? (
          <button className="buyBtn">
            <span className="inner-buyBtn">Paid</span>
          </button>
        ) : (
          <button
            className="buyBtn"
            onClick={() => handleAddToCart(course?.id || "")}
          >
            <span className="inner-buyBtn">Add to Cart</span>
          </button>
        )}

        <ul>
          <li>
            <FaGaugeHigh className="icon-banner" />
            <span>Level {course?.level}</span>
          </li>
          <li>
            <FaFilm className="icon-banner" />
            <span>
              Total <strong>{course?.numberOfLessons}</strong> lessons
            </span>
          </li>
          <li>
            <FaClock className="icon-banner" />
            <span>
              Duration <strong>{course?.totalTime}</strong>
            </span>
          </li>
          <li>
            <FaBatteryFull className="icon-banner" />
            <span>learn everywhere, everytime</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseDetailBanner;
