import "../../../../assets/css/AddCourseModal.css";

interface ModalProps {
  onClick: (e: any) => void;
  isOpen: boolean;
}

const AddLevelModal = ({ onClick, isOpen }: ModalProps) => {
  return (
    <>
      <div
        className={`dark_bg ${isOpen && "popup_active"}`}
        id="addCourseWrapperBg"
        onClick={(e) => onClick(e)}
      >
        <div className={`popup ${isOpen && "popup_active"}`}>
          <div className="product_form_container">
            <div className="title">
              <p>Add Level</p>
              <button className="closeBtn" id="closeButton">
                &times;
              </button>
            </div>
            <form action="#">
              <div className="user_details">
                <div className="input_box">
                  <label htmlFor="name">Level Name</label>
                  <input type="text" id="name" placeholder="Enter Level name" />
                </div>
              </div>
              <div className="reg_btn">
                <input type="submit" value="Add" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLevelModal;
