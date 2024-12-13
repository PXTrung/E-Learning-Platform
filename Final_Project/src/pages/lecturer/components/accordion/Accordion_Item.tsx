import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { IoChevronDownOutline } from "react-icons/io5";
import { TbEditCircle } from "react-icons/tb";
import AddLectureModal from "../modal/lesson/AddLectureModal";
import "../../../../assets/css/Accordion.css";
import { Sessions } from "../../../../services/interfaces";
import useLessons from "../../../../hooks/lesson/useLessons";
import Accordion_Content from "./Accordion_Content";
import UpdateSessionModal from "../modal/session/UpdateSessionModal";
import DeleteSessionModal from "../modal/session/DeleteSessionModal";

// interface props {
//   title: string;
//   content: string[];
// }

interface props {
  items: Sessions;
  courseId: string;
}

const Accordion_Item = ({ items, courseId }: props) => {
  const [open, setOpen] = useState(false);
  const [openAddLectureModal, setOpenAddLectureModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string>("");

  console.log(items.id);

  const { data, error } = useLessons(items.id);

  const handleAddLectureModalClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setOpenAddLectureModal(!openAddLectureModal);
  };

  const handleUpdateModalClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setOpenUpdateModal(!openUpdateModal);
  };

  const handleDeleteModalClose = (e: any) => {
    if (
      e.target.id == "addCourseWrapperBg" ||
      e.target.id == "closeButton" ||
      e.target.id == "cancelButton"
    )
      setOpenDeleteModal(!openDeleteModal);
  };

  if (error) {
    console.log(error.message);
  }

  return (
    <>
      <div className="accordion-item">
        <div className="accordion-header">
          <div className="accordion-header-title">{items.name}</div>

          <AiOutlinePlusCircle
            className="accordion-icon-plus"
            style={{ color: "green" }}
            onClick={() => setOpenAddLectureModal(!openAddLectureModal)}
          />
          <AiOutlineMinusCircle
            className="accordion-icon-minus"
            style={{ color: "red" }}
            onClick={() => {
              setSelectedSession(items.id);
              setOpenDeleteModal(!openDeleteModal);
            }}
          />
          <TbEditCircle
            className="accordion-icon-edit"
            style={{ color: "purple" }}
            onClick={() => {
              setSelectedSession(items.id);
              setOpenUpdateModal(!openUpdateModal);
            }}
          />
          <IoChevronDownOutline
            className={open ? "accordion-icon active" : "accordion-icon"}
            onClick={() => setOpen(!open)}
          />
        </div>

        <div className={open ? "answercont show" : "answercont"}>
          <div className="answer">
            {data?.data.map((i) => (
              <Accordion_Content lesson={i} key={i.id} sessionId={items.id} />
            ))}
          </div>
        </div>
      </div>

      <AddLectureModal
        isOpen={openAddLectureModal}
        onClick={handleAddLectureModalClose}
        sessionId={items.id}
      />

      <UpdateSessionModal
        isOpen={openUpdateModal}
        onClick={handleUpdateModalClose}
        sessionId={selectedSession}
        courseId={courseId}
      />

      <DeleteSessionModal
        isOpen={openDeleteModal}
        onClick={handleDeleteModalClose}
        sessionId={selectedSession}
        courseId={courseId}
      />
    </>
  );
};

export default Accordion_Item;
