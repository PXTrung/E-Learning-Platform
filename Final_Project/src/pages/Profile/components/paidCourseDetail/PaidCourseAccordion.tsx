import { IoChevronDownOutline } from "react-icons/io5";
import { Sessions } from "../../../../services/interfaces";
import { useState } from "react";
import useLessons from "../../../../hooks/lesson/useLessons";
import PaidCourseAccordionItem from "./PaidCourseAccordionItem";

interface Props {
  session: Sessions;
  courseId?: string;
}

const PaidCourseAccordion = ({ session, courseId }: Props) => {
  const [toggle, setToggle] = useState(false);
  const { data } = useLessons(session.id);
  return (
    <div className="accordion-client-item">
      <div className="accordion-header" onClick={() => setToggle(!toggle)}>
        <div className="accordion-header-title">{session.name}</div>
        <IoChevronDownOutline
          className={toggle ? "accordion-icon active" : "accordion-icon"}
        />
      </div>

      <div className={toggle ? "answercont show" : "answercont"}>
        <div className="answer-client">
          {data?.data.map((i, index) => (
            <PaidCourseAccordionItem
              lesson={i}
              position={++index}
              courseId={courseId}
              key={i.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaidCourseAccordion;
