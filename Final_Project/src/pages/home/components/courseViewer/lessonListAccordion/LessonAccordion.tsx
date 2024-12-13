import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import useLessons from "../../../../../hooks/lesson/useLessons";
import { Sessions } from "../../../../../services/interfaces";
import LessonAccordionItem from "./LessonAccordionItem";
import { useParams } from "react-router-dom";

interface Props {
  session: Sessions;
  position: number;
  courseId?: string;
}

const LessonAccordion = ({ session, position, courseId }: Props) => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { data } = useLessons(session.id);
  const [toggle, setToggle] = useState(
    sessionId?.toLowerCase() == session.id ? true : false
  );

  return (
    <div className="accordion-courseViewer-wrapper">
      <div className="accordion-courseViewer-item">
        <div
          className="accordion-header-small"
          onClick={() => setToggle(!toggle)}
        >
          <div className="accordion-header-title-small">
            {position}. {session.name}
          </div>
          <IoChevronDownOutline
            className={toggle ? "accordion-icon active" : "accordion-icon"}
          />
        </div>

        <div className={toggle ? "answercont show" : "answercont"}>
          <div className="answer-courseViewer">
            {data?.data.map((i, index) => (
              <LessonAccordionItem
                lesson={i}
                position={++index}
                courseId={courseId}
                key={i.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonAccordion;
