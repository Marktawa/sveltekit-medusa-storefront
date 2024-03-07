<script>
    import { onMount } from "svelte";

    let data;
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
