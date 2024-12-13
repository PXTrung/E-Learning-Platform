import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import { CartInformation } from "../../../../services/interfaces";
import { PATHS } from "../../../../constants/path";

interface Props {
  cartInfor: CartInformation;
  onCreateOrder: () => void;
}

const CartTotal = ({ cartInfor, onCreateOrder }: Props) => {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    useGrouping: true,
  }).format(cartInfor.total || 0);

  const handleClick = () => {
    onCreateOrder();
    navigate(`/${PATHS.HOME.IDENTITY}/${PATHS.HOME.CHECKOUT}`);
  };

  return (
    <div className="cart-chekcout">
      <div className="cart-checkout-total">
        <div className="cart-total-label">Total:</div>
        <div className="cart-total-price">{formattedPrice} Vnd</div>
      </div>
      <button className="checkout-button" onClick={handleClick}>
        Checkout
      </button>
    </div>
  );
};

export default CartTotal;
