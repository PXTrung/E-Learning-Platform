import { Skeleton } from "@mantine/core";

interface Props {
  amount: number;
}

const CardSkeleton = ({ amount }: Props) => {
  const cards = [];
  for (let i = 0; i < amount; i++) {
    cards.push(
      <div className="card-skeleton" key={i}>
        <div className="card-image">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="text_container">
          <div className="top-card">
            <div className="main_text">
              <Skeleton height={8} />
            </div>
            <div className="card_price">
              <Skeleton height={8} width="45%" />
            </div>
          </div>
          <div className="bottom-card-skeleton">
            <div className="main_text-skeleton">
              <Skeleton height={8} width={200} ml={5} />
            </div>
            <div className="main_text-skeleton">
              <Skeleton height={30} width={120} mb={20} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{cards}</>;
};

export default CardSkeleton;
