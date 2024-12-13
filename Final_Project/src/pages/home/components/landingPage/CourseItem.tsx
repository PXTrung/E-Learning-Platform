import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../constants/path";
import useCart from "../../../../hooks/cart/useCart";
import { Course } from "../../../../services/interfaces";
import useEnrollment from "../../../../hooks/enrollment/useEnrollment";
import authUtils from "../../../../utils/auth";

interface Props {
  course: Course;
}

const CourseItem = ({ course }: Props) => {
  const navigate = useNavigate(); // Initialize the navigate hook
  const { addToCart, getCart } = useCart();
  const { getEnrollments } = useEnrollment();
  const [isCourseInCart, setIsCourseInCart] = useState<boolean | undefined>(
    false
  );

  const token = authUtils.getSessionToken();

  const [isCoursePaid, setIsCoursePaid] = useState<boolean | undefined>(false);

  const { data } = getCart();

  const enrollments = getEnrollments();

  useEffect(() => {
    if (data?.cartItems) {
      const isCoursePresent = data.cartItems.some(
        (i) => i.courseId === course.id
      );
      setIsCourseInCart(isCoursePresent);
    }

    if (enrollments.data?.data) {
      const isCoursePaid = enrollments.data?.data.some(
        (i) => i.course.id === course.id
      );
      setIsCoursePaid(isCoursePaid);
    }
  }, [data, enrollments, course.id]);

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    useGrouping: true,
  }).format(course?.price || 0);

  const handleClick = (id: string) => {
    navigate(`${id}`);
  };

  const handleAddToCart = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); //Prevent the click event from bubbling up
    addToCart(id);
  };

  const handleGoToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); //Prevent the click event from bubbling up
    navigate(`${PATHS.HOME.CART}`);
  };

  const handleGotoLibrary = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/${PATHS.PROFILE.IDENTITY}/courses`);
  };

  const navigateToLogin = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("clicked");
    navigate(`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.LOGIN}`);
  };

  return (
    <div
      className="card"
      key={course.id}
      onClick={() => handleClick(course.id)}
    >
      <img src={course.thumbnailUrl} alt="" className="card-image" />
      <div className="text_container">
        <div className="top-card">
          <div className="main_text">
            <p>{course.name}</p>
          </div>
          <div className="card_price">{formattedPrice} vnd</div>
        </div>
        <div className="bottom-card">
          {course.level == "Beginer" && (
            <div className="level beginer">
              <p>{course.level}</p>
            </div>
          )}
          {course.level == "Intermidiate" && (
            <div className="level intermidiate">
              <p>{course.level}</p>
            </div>
          )}
          {course.level == "Advanced" && (
            <div className="level advanced">
              <p>{course.level}</p>
            </div>
          )}

          {isCourseInCart ? (
            <div
              className="card_btn"
              id="goToCart_btn"
              onClick={(e) => handleGoToCart(e)}
            >
              <p>Go to Cart</p>
            </div>
          ) : isCoursePaid ? (
            <div
              className="card_btn"
              id="addToCart_btn"
              onClick={(e) => handleGotoLibrary(e)}
            >
              <p>Go to Library</p>
            </div>
          ) : !token ? (
            <div
              className="card_btn"
              id="addToCart_btn"
              onClick={(e) => navigateToLogin(e)}
            >
              <p>Add to Cart</p>
            </div>
          ) : (
            <div
              className="card_btn"
              id="addToCart_btn"
              onClick={(e) => handleAddToCart(course.id, e)}
            >
              <p>Add to Cart</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
