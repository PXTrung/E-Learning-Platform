import useSessions from "../../../../../hooks/session/useSessions";
import CourseAccordion from "./CourseAccordion";

interface Props {
  id?: string;
}
const CoursesList = ({ id }: Props) => {
  const { data, error } = useSessions(id || "");
  return (
    <div className="accordion-client_wrapper">
      {data?.data.map((i) => (
        <CourseAccordion session={i} key={i.id} courseId={id} />
      ))}
    </div>
  );
};

export default CoursesList;
