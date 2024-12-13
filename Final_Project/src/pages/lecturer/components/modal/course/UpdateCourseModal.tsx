import useCategories from "../../../../../hooks/category/useCategories";
import useCourse from "../../../../../hooks/course/useCourse";
import UpdateCourseForm from "./form/UpdateCourseForm";

interface ModalProps {
  onClick: (e: any) => void;
  id: string;
  isOpen: boolean;
}

const UpdateCourseModal = ({ onClick, id, isOpen }: ModalProps) => {
  const categoryList = useCategories();
  console.log(id);
  const { data } = useCourse(id);
  console.log(data?.data);

  return (
    <>
      {data?.data && (
        <div
          className={`dark_bg ${isOpen && "popup_active"}`}
          id="addCourseWrapperBg"
          onClick={(e) => onClick(e)}
        >
          <div className={`popup ${isOpen && "popup-update"}`}>
            <div className="product_form_container">
              <div className="title">
                <p>Update Course</p>
                <button className="closeBtn" id="closeButton">
                  &times;
                </button>
              </div>
              <UpdateCourseForm
                course={data?.data}
                categories={categoryList.data?.data}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCourseModal;
