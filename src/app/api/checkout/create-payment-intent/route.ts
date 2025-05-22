// src/app/api/checkout/create-payment-intent/route.ts
import { NextResponse } from 'next/server';

// This is a mock database/service. In a real app, you'd fetch this from your actual database.
import { resourcesData, ResourceData } from '@/data/resourcesPageData'; // Adjust path as needed

interface CreatePaymentIntentRequest {
  resourceId: string;
  amount: number; // Amount in smallest currency unit (e.g., cents for USD)
  currency: string;
  // You might also include userId here after implementing authentication
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as CreatePaymentIntentRequest;
    const { resourceId, amount, currency } = body;

    if (!resourceId || amount == null || !currency) {
      return NextResponse.json({ message: 'Missing required fields: resourceId, amount, or currency.' }, { status: 400 });
    }

    // 1. Validate the resource and amount against your database (using mock data here)
    const resource = resourcesData.find(r => r.id === resourceId);

    if (!resource) {
      return NextResponse.json({ message: 'Resource not found.' }, { status: 404 });
    }

    if (!resource.premium || !resource.price) {
      return NextResponse.json({ message: 'Resource is not premium or price is not set.' }, { status: 400 });
    }

    // Convert stored price (e.g., "$29.99") to a number for comparison/use
    const expectedAmount = parseFloat(resource.price.replace('$', ''));
    if (isNaN(expectedAmount)) {
        return NextResponse.json({ message: 'Invalid price format for resource.' }, { status: 500 });
    }

    // Optional: Validate if the amount sent from frontend matches the resource's price
    // For simplicity, we'll assume the frontend sends the correct amount based on resource.price
    // but in a real app, always verify on the backend.
    // The `amount` in the request should ideally be in the smallest currency unit (e.g., cents)
    // For this example, let's assume `amount` from request is in dollars and convert it for Stripe.
    const amountInCents = Math.round(expectedAmount * 100);


    // ** SIMULATING PAYMENT GATEWAY INTERACTION (e.g., Stripe) **
    console.log(`Backend: Creating payment intent for resourceId: ${resourceId}, amount: ${amountInCents} ${currency.toUpperCase()}`);

    // Simulate different payment flows for demo purposes
    const simulateStripeElements = Math.random() > 0.5; // 50% chance

    if (simulateStripeElements) {
      // Simulate creating a Stripe PaymentIntent and returning a clientSecret
      const mockClientSecret = `pi_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`;
      console.log(`Backend: Simulated Stripe Elements. Client Secret: ${mockClientSecret}`);
      return NextResponse.json({
        clientSecret: mockClientSecret,
        paymentMethodType: 'stripe_elements_simulation', // Custom type for frontend to know how to proceed
        message: 'Payment intent created successfully (Stripe Elements Simulation).',
      }, { status: 200 });
    } else {
      // Simulate a redirect-based flow (e.g., Stripe Checkout, PayPal)
      const mockRedirectUrl = `https://example-payment-gateway.com/checkout_session_${Date.now()}`;
      console.log(`Backend: Simulated Redirect Flow. Redirect URL: ${mockRedirectUrl}`);
      return NextResponse.json({
        redirectUrl: mockRedirectUrl,
        paymentMethodType: 'redirect_simulation', // Custom type for frontend
        message: 'Payment session created, proceed to redirect (Redirect Simulation).',
      }, { status: 200 });
    }

  } catch (error) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred.';
    return NextResponse.json({ message: 'Error creating payment intent.', error: errorMessage }, { status: 500 });
  }
}
