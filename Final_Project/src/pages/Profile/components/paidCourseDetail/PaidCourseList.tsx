import React from "react";
import useSessions from "../../../../hooks/session/useSessions";
import PaidCourseAccordion from "./PaidCourseAccordion";

interface Props {
  id?: string;
}

const PaidCourseList = ({ id }: Props) => {
  const { data, error } = useSessions(id || "");
  return (
    <div className="accordion-client_wrapper">
      {data?.data.map((i) => (
        <PaidCourseAccordion session={i} key={i.id} courseId={id} />
      ))}
    </div>
  );
};

export default PaidCourseList;
