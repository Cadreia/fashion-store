import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = (price / 579.6) * 100; // price in USD cents
  const publishableKey =
    "pk_test_51KD9fXAkLfDYqjnf5ZeYzYPs2tpaRmIsA3AIak4oi6KnIYLRhKFWgbYP7PJLHdrsAhiYePQUuqWIjdQAdZQxAP5z00bTkGYQPD";

  const onToken = (token) => {
    console.log(token);
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: Math.ceil(priceForStripe),
        token,
      },
    })
      .then((response) => {
        alert("Payment Successful");
      })
      .catch((error) => {
        console.log(`Payment error: ${JSON.parse(error)}`);
        alert(
          "There was an issue with your payment. Please make sure you use the provided credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Make Payment"
      name="Ladda Store Ltd."
      image="https://stripe.com/img/documentation/checkout/marketplace.png"
      billingAddress
      shippingAddress
      description={`Your total is ${price} CFA`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
