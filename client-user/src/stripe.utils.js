import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51NjNVwSJiOoEgBlU3CJxSILyYex82psZ7A4OVYMSEbCdT1gheHlxlTosjfsc8xjAO8CN10VcQGJOfp1kr9hGfWWz002qTKXMmP');

export default stripePromise;
