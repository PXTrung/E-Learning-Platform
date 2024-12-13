interface Props {
  itemCount: number;
}

const CartTitle = ({ itemCount }: Props) => {
  return (
    <div className="cart-items-title">
      <div className="cart-row-title">
        <div className="cart-col">
          <h2>Shopping Cart</h2>
        </div>
        <div className="cart-items-quantity">{itemCount} items</div>
      </div>
    </div>
  );
};

export default CartTitle;
