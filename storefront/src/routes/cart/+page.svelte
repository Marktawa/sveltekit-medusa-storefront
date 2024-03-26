<script>
    import { onMount } from "svelte";

    let data;
    let email;
    let total;
    let items = [];

    onMount(async () => {
        const id = localStorage.getItem("cart_id");
        const res = await fetch(`http://localhost:9000/store/carts/${id}`, {
            credentials: "include",
        });
        data = await res.json();
        items = data.cart.items;
        total = data.cart.total;
    });

    function addCustomer() {
        const id = localStorage.getItem("cart_id");
        fetch(`http://localhost:9000/store/carts/${id}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
            }),
        })
        .then((response) => response.json())
        .then(({ cart }) => {
            console.log("Customer ID is " + cart.customer_id)
            console.log("Customer email is " + cart.email)
        });
    }
</script>

<h1>Welcome to the Medusa SvelteKit Store</h1>
<h2>Cart</h2>

<ul>
    {#each items as item}
        <li>
            TITLE: {item.title} PRICE: {item.unit_price} QUANTITY: {item.quantity}
        </li>
    {/each}
</ul>
<p>The total price for your cart is {total}</p>
<p>Enter your email to Proceed to Checkout</p>
<input id="email" type="email" bind:value={email}>
<button type="submit" on:click={() => {
    addCustomer();
    alert('Added your Email');
    }}
>
    Submit
</button>
