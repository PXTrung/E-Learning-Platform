import React, { useState } from "react";
import { Lessons } from "../../../../services/interfaces";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import UpdateLessonModal from "../modal/lesson/UpdateLessonModal";
import useLesson from "../../../../hooks/lesson/useLesson";
import DeleteLessonModal from "../modal/lesson/DeleteLessonModal";

interface Props {
  lesson: Lessons;
  sessionId: string;
}

const Accordion_Content = ({ lesson, sessionId }: Props) => {
  const [openUpdateLessonModal, setOpenUpdateLessonModal] = useState(false);
  const [openDeleteLessonModal, setOpenDeleteLessonModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string>("");

  const handleUpdateLessonModalClose = (e: any) => {
    if (e.target.id == "addCourseWrapperBg" || e.target.id == "closeButton")
      setOpenUpdateLessonModal(!openUpdateLessonModal);
  };

  const handleDeleteLessonModalClose = (e: any) => {
    if (
      e.target.id == "addCourseWrapperBg" ||
      e.target.id == "closeButton" ||
      e.target.id == "cancelButton"
    )
      setOpenDeleteLessonModal(!openDeleteLessonModal);
  };

  return (
    <>
      <div className="answer-content" key={lesson.id}>
        <a href="#">{lesson.name}</a>

        <div className="answer-icon">
          <AiOutlineMinusCircle
            className="accordion-icon-minus-small"
            style={{ color: "red" }}
            onClick={() => {
              setSelectedLesson(lesson.id);
              setOpenDeleteLessonModal(!openDeleteLessonModal);
            }}
          />

          <TbEditCircle
            className="accordion-icon-edit-small"
            style={{ color: "purple" }}
            onClick={() => {
              setSelectedLesson(lesson.id);
              setOpenUpdateLessonModal(!openUpdateLessonModal);
            }}
          />
        </div>
      </div>

      <UpdateLessonModal
        isOpen={openUpdateLessonModal}
        onClick={handleUpdateLessonModalClose}
        lessonId={selectedLesson}
        sessionId={sessionId}
      />

      <DeleteLessonModal
        isOpen={openDeleteLessonModal}
        onClick={handleDeleteLessonModalClose}
        lessonId={selectedLesson}
        sessionId={sessionId}
      />
    </>
  );
};

export default Accordion_Content;
