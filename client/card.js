document.addEventListener('DOMContentLoaded', async () => {
  // Load the publishable key from the server. The publishable key
  // is set in your .env file.
  const {publishableKey} = await fetch('http://127.0.0.1:4242/config').then((r) => r.json());
  if (!publishableKey) {
    addMessage(
      'No publishable key returned from the server. Please check `.env` and try again'
    );
    alert('Please set your Stripe publishable API key in the .env file');
  }

  const stripe = Stripe(publishableKey);
  const elements = stripe.elements();
  const style = {
    base: {
      fontSize: '16px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      fontSmoothing: 'antialiased',
      color: '#0A2540',
    }
  }
  var cardNumberElement = elements.create('cardNumber', {
    style: style,
  });
  var cardExpiryElement = elements.create('cardExpiry', {
    style: style,
  });
  var cardCvcElement = elements.create('cardCvc', {
    style: style,
  });
  cardNumberElement.mount('#card-number-element');
  cardExpiryElement.mount('#card-expiry-element');
  cardCvcElement.mount('#card-cvc-element');

  // When the form is submitted...
  const form = document.getElementById('payment-form-1');
  let submitted = false;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Disable double submission of the form
    if(submitted) { return; }
    submitted = true;
    form.querySelector('button').disabled = true;

    // Make a call to the server to create a new
    // payment intent and store its client_secret.
    const {error: backendError, clientSecret} = await fetch(
      'http://127.0.0.1:4242/create-payment-intent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currency: 'eur',
          paymentMethodType: 'card',
        }),
      }
    ).then((r) => r.json());

    if (backendError) {
      addMessage(backendError.message);

      // reenable the form.
      submitted = false;
      form.querySelector('button').disabled = false;
      return;
    }

    addMessage(`Client secret returned.`);

    const nameInput = document.querySelector('#name');
    // Confirm the card payment given the clientSecret
    // from the payment intent that was just created on
    // the server.
    const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: nameInput.value,
          },
        },
      }
    );

    if (stripeError) {
      addMessage(stripeError.message);
      // reenable the form.
      submitted = false;
      form.querySelector('button').disabled = false;
      return;
    }

    addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
  });
});
