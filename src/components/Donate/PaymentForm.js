"use client";
import React, { useState, useEffect } from 'react';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import getStripe from '@/src/lib/stripe';

// Temporarily disabled Stripe integration for deployment
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#374151',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#EF4444',
      iconColor: '#EF4444',
    },
  },
};

const CheckoutForm = ({ amount, donationType, donorInfo, onSuccess, onError }) => {
  // Temporarily disabled Stripe integration
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Temporarily show message that payment is disabled
    onError('Payment processing is temporarily disabled during deployment. Please check back later.');
    
    /* Commented out for deployment - will re-enable when Stripe is properly configured
    const stripe = useStripe();
    const elements = useElements();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          donationType,
          donorInfo,
        }),
      });

      const { clientSecret, setupClientSecret, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      const cardElement = elements.getElement(CardElement);

      if (donationType === 'monthly' && setupClientSecret) {
        // Handle recurring donation setup
        const { error: setupError } = await stripe.confirmSetupIntent(setupClientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: donorInfo.name,
              email: donorInfo.email,
            },
          },
        });

        if (setupError) {
          throw new Error(setupError.message);
        }

        onSuccess({
          type: 'recurring_setup',
          message: 'Monthly donation set up successfully!',
        });
      } else {
        // Handle one-time payment
        const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: donorInfo.name,
              email: donorInfo.email,
            },
          },
        });

        if (paymentError) {
          throw new Error(paymentError.message);
        }

        if (paymentIntent.status === 'succeeded') {
          onSuccess({
            type: 'payment',
            paymentIntent,
            message: 'Thank you for your donation!',
          });
        }
      }
    } catch (err) {
      setError(err.message);
      onError(err.message);
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Temporary message about disabled payment processing */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-yellow-800">Payment processing is temporarily disabled during deployment. Please check back later.</span>
        </div>
      </div>

      {/* Card Element Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
          <div className="text-gray-500 text-sm">Payment form temporarily disabled</div>
          {/* <CardElement options={CARD_ELEMENT_OPTIONS} /> */}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-red-800">{error}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={true} // Temporarily disabled
        className="w-full bg-gray-400 text-white font-bold py-4 px-8 rounded-lg text-lg cursor-not-allowed"
      >
        Payment Temporarily Disabled
      </button>
    </form>
  );
};

const PaymentForm = ({ amount, donationType, donorInfo, onSuccess, onError }) => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    // Temporarily disabled
    setStripePromise(null);
    // setStripePromise(getStripe());
  }, []);

  // Always show the form now, but with disabled state
  return (
    <CheckoutForm
      amount={amount}
      donationType={donationType}
      donorInfo={donorInfo}
      onSuccess={onSuccess}
      onError={onError}
    />
  );

  /* Commented out for deployment - will re-enable when Stripe is properly configured
  if (!stripePromise) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
        <span className="ml-2 text-gray-600">Loading payment form...</span>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        amount={amount}
        donationType={donationType}
        donorInfo={donorInfo}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
  */
};

export default PaymentForm;
