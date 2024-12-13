import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import useCart from "../../hooks/cart/useCart";
import CartItem from "./components/Cart/CartItem";
import CartTitle from "./components/Cart/CartTitle";
import CheckoutForm from "./components/checkout/CheckoutForm";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const publishableKey =
  "pk_test_51Q0z3bBaTHc1s49ot8YH821Hw49xyphqc2xBVR9k4Sylvic0rAH5OAf5KY7vVA63S6wqLCCqMS9usnm61hKjn2FF00Ubufxmfy";

//const stripePromise = await loadStripe(publishableKey);

interface Props {
  options: StripeElementsOptions;
  clientSecret: string;
}

const CheckoutPage = ({ options, clientSecret }: Props) => {
  const { getCart } = useCart();
  const { data } = getCart();

  const stripePromise = loadStripe(publishableKey);

  return (
    <div className="content-product">
      <div className="cart-container">
        <div className="cart-row">
          <div className="cart-items">
            {data && <CartTitle itemCount={data.itemCount} />}

            {data?.cartItems.map((i) => (
              <CartItem cartItem={i} key={i.courseId} />
            ))}

            <div className="back-to-shop">
              <Link to={"/"}>
                <FaArrowLeft />

                <span className="text-muted">Back to shop</span>
              </Link>
            </div>
          </div>
          {clientSecret ? (
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm total={data?.total} />
            </Elements>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
