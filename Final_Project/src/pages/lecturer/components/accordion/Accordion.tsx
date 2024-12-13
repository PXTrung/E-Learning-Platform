import "../../../../assets/css/Accordion.css";
import useSessions from "../../../../hooks/session/useSessions";
import Accordion_Item from "./Accordion_Item";

interface Props {
  id: string;
}

const Accordion = ({ id }: Props) => {
  const { data, error } = useSessions(id);

  if (error) {
    console.log(error.message);
  }

  return (
    <div className="accordion_wrapper">
      {data?.data.map((i) => (
        <Accordion_Item items={i} key={i.id} courseId={id} />
      ))}
    </div>
  );
};

export default Accordion;
