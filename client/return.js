document.addEventListener('DOMContentLoaded', async () => {
  // Load the publishable key from the server. The publishable key
  // is set in your .env file.
  const {publishableKey} = await fetch('http://127.0.0.1:4242/config').then(
    (r) => r.json()
  );
  if (!publishableKey) {
    addMessage(
      'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
  }

  const stripe = Stripe(publishableKey, {
    apiVersion: '2020-08-27',
  });

  const clientSecret = new URLSearchParams(window.location.search).get(
    'payment_intent_client_secret'
  );

  if (!clientSecret) {
    addMessage(
      `This page will only display information if you were automatically redirected`
    );
    return;
  }

  const {paymentIntent} = await stripe.retrievePaymentIntent(clientSecret);
  addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
});
