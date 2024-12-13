import { Skeleton } from "@mantine/core";

interface Props {
  amount: number;
}

const CourseRowSkeleton = ({ amount }: Props) => {
  const rows = [];
  for (let i = 0; i < amount; i++) {
    rows.push(
      <tr className="product_rows" key={i}>
        <td>
          <Skeleton height={40} width="100%" />
        </td>

        <td>
          <Skeleton height={8} width="100%" />
        </td>

        <td>
          <Skeleton height={8} width="100%" />
        </td>

        <td>
          <Skeleton height={8} width="100%" />
        </td>

        <td>
          <Skeleton height={8} width="100%" />
        </td>

        <td>
          <Skeleton height={25} width="100%" />
        </td>
      </tr>
    );
  }
  return <>{rows}</>;
};

export default CourseRowSkeleton;
