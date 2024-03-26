<script>
    import { onMount } from "svelte";

    onMount(async () => {
        const id = localStorage.getItem("cart_id");
        fetch(`http://localhost:9000/store/carts/${id}/payment-sessions`, {
            method: "POST",
            credentials: "include",
        })
        .then((response) => response.json())
        .then(({ cart }) => {
            console.log(cart.payment_sessions)
        })
    });

function completeCart() {
    const id = localStorage.getItem("cart_id");
    fetch(`http://localhost:9000/store/carts/${id}/complete`, {
        method: "POST",
        dentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then(({ type, data }) => {
        console.log(type, data)
    })
  }
</script>

<h1>Welcome to the Medusa SvelteKit Store</h1>
<h2>Checkout</h2>

<button on:click={() => { 
        completeCart(); 
        alert('Cart Complete');
        }}
>
    Complete Cart
</button>

