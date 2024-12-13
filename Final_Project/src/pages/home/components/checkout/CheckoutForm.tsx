import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
import { FaAddressCard } from "react-icons/fa";

interface Props {
  total?: number;
}

const CheckoutForm = ({ total }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");

  const formattedPrice = new Intl.NumberFormat("de-DE", {
    style: "decimal",
    useGrouping: true,
  }).format(total || 0);

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: "tabs", // Layout option for Payme`ntElement
  };

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/complete`, // URL để điều hướng sau khi thanh toán
        },
        redirect: "if_required",
      });

      if (error) {
        setMessage(error.message);
        setIsLoading(false);
        console.log(message);
      } else if (paymentIntent.status === "succeeded") {
        await api.payment.confirmPayment();
        navigate("/complete");
      } else {
        setMessage("Payment failed. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="cart-chekcout-stripe">
        <div className="cart-checkout-banner">
          <div className="cart-checkout-banner-header">
            <div className="cart-checkout-total">
              <div className="cart-total-label-stripe">
                Total: {formattedPrice} vnd
              </div>
            </div>
          </div>
          <div className="cart-checkout-banner-body">
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              className="payment-button"
              onClick={handleSubmit}
            >
              <FaAddressCard className="payment-icon" />
              <span id="button-text">
                {isLoading ? "Loading..." : "Payment Confirm"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
