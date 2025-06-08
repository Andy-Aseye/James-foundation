import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Check if Stripe is properly configured
const isStripeConfigured = process.env.STRIPE_SECRET_KEY && 
  process.env.STRIPE_SECRET_KEY !== 'sk_test_your_secret_key_here' &&
  process.env.STRIPE_SECRET_KEY.startsWith('sk_');

let stripe = null;
if (isStripeConfigured) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });
}

export async function POST(request) {
  // Return early if Stripe is not configured
  if (!isStripeConfigured || !stripe) {
    return NextResponse.json(
      { error: 'Payment processing is not configured. Please contact support.' },
      { status: 503 }
    );
  }

  try {
    const { amount, currency = 'usd', donationType, donorInfo } = await request.json();

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      return NextResponse.json(
        { error: 'Amount must be at least $0.50' },
        { status: 400 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        donationType: donationType || 'one-time',
        donorName: donorInfo?.name || '',
        donorEmail: donorInfo?.email || '',
        foundation: 'The James Foundation',
      },
      description: `Donation to The James Foundation - ${donationType === 'monthly' ? 'Monthly' : 'One-time'} donation`,
    });

    // For recurring donations, create a customer and setup intent
    let setupIntent = null;
    if (donationType === 'monthly' && donorInfo?.email) {
      try {
        const customer = await stripe.customers.create({
          email: donorInfo.email,
          name: donorInfo.name,
          metadata: {
            foundation: 'The James Foundation',
            donationType: 'monthly',
          },
        });

        setupIntent = await stripe.setupIntents.create({
          customer: customer.id,
          payment_method_types: ['card'],
          usage: 'off_session',
          metadata: {
            monthlyAmount: amount.toString(),
            foundation: 'The James Foundation',
          },
        });
      } catch (error) {
        console.error('Error creating customer/setup intent:', error);
        // Continue with one-time payment if recurring setup fails
      }
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      setupClientSecret: setupIntent?.client_secret,
      paymentIntentId: paymentIntent.id,
      customerId: setupIntent?.customer,
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
