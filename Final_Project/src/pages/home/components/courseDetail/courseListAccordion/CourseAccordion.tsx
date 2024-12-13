import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import useLessons from "../../../../../hooks/lesson/useLessons";
import { Sessions } from "../../../../../services/interfaces";
import CourseAccordionItem from "./CourseAccordionItem";

interface Props {
  session: Sessions;
  courseId?: string;
}

const CourseAccordion = ({ session, courseId }: Props) => {
  const [toggle, setToggle] = useState(false);
  const { data, error } = useLessons(session.id);
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
            <CourseAccordionItem
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

export default CourseAccordion;
