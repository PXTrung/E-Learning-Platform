import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import useCart from "../../hooks/cart/useCart";

const CartIcon = () => {
  const { getCart } = useCart();
  const { data } = getCart();
  return (
    <div className="cart-icon-container">
      <Link
        to={`${PATHS.HOME.IDENTITY}/${PATHS.HOME.CART}`}
        className="cart-icon-wrapper"
      >
        <IoCartOutline className="cart-icon" />
        <span className="cart-icon-quantity">{data?.itemCount}</span>
      </Link>
    </div>
  );
};

export default CartIcon;
