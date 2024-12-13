import { Rating } from "@mantine/core";
import { useEffect, useState } from "react";

interface Props {
  size?: string;
  stars?: number;
  disable?: boolean;
  OnChange?: (e: number) => void;
  fraction?: 1 | 2 | 3 | 4;
  empty?: boolean;
  opacity?: number;
}

const RatingBar = ({
  size,
  stars,
  disable,
  OnChange,
  fraction = 1,
  opacity = 1,
  empty,
}: Props) => {
  const [value, setValue] = useState(stars ? stars : 0);
  useEffect(() => {
    if (stars) {
      setValue(stars);
    }
  }, [stars]);

  const handleChange = (e: number) => {
    setValue(e);
    OnChange && OnChange(e);
  };
  return (
    <Rating
      value={value}
      onChange={handleChange}
      size={size}
      fractions={fraction}
      readOnly={disable ? true : false}
      opacity={opacity}
    />
  );
};

export default RatingBar;
