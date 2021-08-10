import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  // const stripApiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY;
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
  }

  return stripePromise;
};

export default getStripe;
