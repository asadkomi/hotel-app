<<<<<<< HEAD
import { Stripe, loadStripe } from "@stripe/stripe-js";
=======
import { loadStripe } from "@stripe/stripe-js";
>>>>>>> stripe payment gateways fixed

let stripePromise;

const getStripe = () => {
<<<<<<< HEAD
  // const stripApiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
=======
>>>>>>> stripe payment gateways fixed
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;
