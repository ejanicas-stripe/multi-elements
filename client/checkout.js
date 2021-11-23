// A reference to Stripe.js initialized with a fake API key.
const stripe = Stripe(
  'pk_test_51JUpzcHCUVQL0Wfza1TxJFoclfcxffeBu9NhpOVtr12YkjjsP3EIXIUIqysuVB8QyAKXIOLg00iVMTeuJ2xXaJBr00UY756VaC'
);
let elements;

initialize();

document
  .querySelector('#payment-form-2')
  .addEventListener('submit', handleUPESubmit);

// Fetches a payment intent and captures the client secret
async function initialize() {
  const response = await fetch('http://127.0.0.1:4242/create-payment-intent', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      currency: 'eur',
      paymentMethodType: 'ideal,sofort,giropay',
    }),
  });
  const {clientSecret} = await response.json();

  const appearance = {
    theme: 'stripe',
  };
  elements = stripe.elements({appearance, clientSecret});

  const paymentElement = elements.create('payment');
  paymentElement.mount('#payment-element');
}

async function handleUPESubmit(e) {
  e.preventDefault();
  setLoading(true);
  console.log('Submit');
  const {error} = await stripe.confirmPayment({
    elements,
    confirmParams: {
      // Make sure to change this to your payment completion page
      return_url: 'http://localhost:8000/return.html',
    },
  });

  // This point will only be reached if there is an immediate error when
  // confirming the payment. Otherwise, your customer will be redirected to
  // your `return_url`. For some payment methods like iDEAL, your customer will
  // be redirected to an intermediate site first to authorize the payment, then
  // redirected to the `return_url`.
  if (error.type === 'card_error' || error.type === 'validation_error') {
    addMessage(error.message);
  } else {
    addMessage('An unexpected error occured.');
  }

  setLoading(false);
}

// Show a spinner on payment submission
function setLoading(isLoading) {
  if (isLoading) {
    // Disable the button and show a spinner
    document.querySelector('#submit').disabled = true;
    document.querySelector('#spinner').classList.remove('hidden');
    document.querySelector('#button-text').classList.add('hidden');
  } else {
    document.querySelector('#submit').disabled = false;
    document.querySelector('#spinner').classList.add('hidden');
    document.querySelector('#button-text').classList.remove('hidden');
  }
}
