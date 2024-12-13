import { Link } from "react-router-dom";
import CartItem from "./components/Cart/CartItem";
import CartTitle from "./components/Cart/CartTitle";
import CartTotal from "./components/Cart/CartTotal";
import { FaArrowLeft } from "react-icons/fa6";
import useCart from "../../hooks/cart/useCart";

interface Props {
  onCreateOrder: () => void;
}

const Cart = ({ onCreateOrder }: Props) => {
  const { getCart } = useCart();
  const { data } = getCart();

  return (
    <div className="content-product">
      <div className="cart-container">
        <div className="cart-row">
          <div className="cart-items">
            {data && <CartTitle itemCount={data.itemCount} />}

            {data?.cartItems.map((i) => (
              <CartItem cartItem={i} key={i.courseId} />
            ))}

            {data?.itemCount == 0 ? (
              <div className="cart-item">
                <div className="cart-item-row">
                  <h4>There is no item in cart currently</h4>
                </div>
              </div>
            ) : (
              ""
            )}

            <div className="back-to-shop">
              <Link to={"/"}>
                <FaArrowLeft />

                <span className="text-muted">Back to shop</span>
              </Link>
            </div>
          </div>

          {data && <CartTotal cartInfor={data} onCreateOrder={onCreateOrder} />}
        </div>
      </div>
    </div>
  );
};

export default Cart;
