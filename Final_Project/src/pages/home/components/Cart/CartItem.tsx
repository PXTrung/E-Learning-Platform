import useCart from "../../../../hooks/cart/useCart";
import { CartItems } from "../../../../services/interfaces";

interface Props {
  cartItem: CartItems;
}

const CartItem = ({ cartItem }: Props) => {
  const { removeFromCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    useGrouping: true,
  }).format(cartItem?.price || 0);

  const handleClick = (id: string) => {
    removeFromCart(id);
    console.log("called");
  };

  return (
    <div className="cart-item">
      <div className="cart-item-row">
        <div className="cart-item-col-2">
          <img
            src={cartItem.courseThumbnail}
            alt="course"
            className="cart-item-image"
          ></img>
        </div>

        <div className="cart-item-col">
          <div className="cart-item-title">{cartItem.courseName}</div>
        </div>

        <div className="cart-item-col-end">
          <span className="cart-item-price">{formattedPrice} vnd</span>
          <span
            className="cart-item-delete-icon"
            onClick={() => handleClick(cartItem.courseId)}
          >
            X
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
