// import { loadStripe } from '@stripe/stripe-js';

// Temporarily disabled Stripe integration for deployment
// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
// let stripePromise;

const getStripe = () => {
  // Temporarily disabled Stripe integration
  console.warn('Stripe integration temporarily disabled for deployment');
  return null;
  
  /* Commented out for deployment - will re-enable when Stripe is properly configured
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
  */
};

export default getStripe;
