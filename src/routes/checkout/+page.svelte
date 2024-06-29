<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { loadStripe } from '@stripe/stripe-js';
  import { PUBLIC_STRIPE_KEY } from '$env/static/public';
  import { PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';
  import { Elements, PaymentElement } from 'svelte-stripe';
  import Medusa from '@medusajs/medusa-js';

  let stripe = null;
  let clientSecret = null;
  let error = null;
  let elements;
  let processing = false;

  let cartId = null;

  onMount(async () => {
    stripe = await loadStripe(PUBLIC_STRIPE_KEY);
    const client = new Medusa({ baseUrl: PUBLIC_MEDUSA_BACKEND_URL, maxRetries: 3 });
    cartId = localStorage.getItem("cart_id");

    try {
      const { cart } = await client.carts.createPaymentSessions(cartId);
      const isStripeAvailable = cart.payment_sessions?.some(
        (session) => session.provider_id === 'stripe'
      );

      if (!isStripeAvailable) return;

      const { cart: updatedCart } = await client.carts.setPaymentSession(cartId, {
        provider_id: 'stripe',
      });

      setClientSecret(updatedCart.payment_session.data.client_secret);
    } catch (error) {
      console.error('Error creating payment session:', error);
    }
  });

  function setClientSecret(secret) {
    clientSecret = secret;
  }

  async function submit() {
    // avoid processing duplicates
    if (processing) return

    processing = true

    // confirm payment with stripe
    const result = await stripe.confirmPayment({
      elements,
      redirect: 'if_required'
    })

    // log results, for debugging
    console.log({ result })

    if (result.error) {
      // payment failed, notify user
      error = result.error
      processing = false
    } else {
      // payment succeeded, redirect to "thank you" page
      const client = new Medusa();
      const response = await client.carts.complete(cartId);
      console.log(response);
      goto('../thanks')
    }
  }
</script>

<h2>Checkout</h2>

{#if error}
  <p class="error">{error.message} Please try again.</p>
{/if}

{#if clientSecret}
  <Elements
    {stripe}
    {clientSecret}
    variables={{ colorPrimary: '#000' }}
    rules={{ '.Input': { border: 'solid 1px #000' } }}
    bind:elements
  >
    <form on:submit|preventDefault={submit}>
      <PaymentElement />

      <button disabled={processing}>
        {#if processing}
          Processing...
        {:else}
          Pay
        {/if}
      </button>
    </form>
  </Elements>
{:else}
  Loading...
{/if}

<style>
  h2 {
    padding: 4rem 0 2rem 0;
    text-align: center;
    font-size: 3rem;
  }

  .error {
    color: tomato;
    margin: 2rem 0 0;
  }

  form {
    max-width: 24rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0 auto;
  }

  button {
    padding: 0.5rem 0;
    border: solid 1px #000;
    color: #FFF;
    background: #000;
    font-size: 1rem;
    margin: 1rem 0;
    font-family: inherit;
  }

  button:hover {
    font-weight: 600;
    cursor: pointer;
  }
</style>