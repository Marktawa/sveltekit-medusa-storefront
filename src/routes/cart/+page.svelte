<script>
    import { onMount } from "svelte";
    import { PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';

    let data;
    let email;
    let total;
    let items = [];

    onMount(async () => {
        const id = localStorage.getItem("cart_id");
        const res = await fetch(`${PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${id}`, {
            credentials: "include",
        });
        data = await res.json();
        items = data.cart.items;
        total = data.cart.total;
    });

    function addCustomer() {
        const id = localStorage.getItem("cart_id");
        fetch(`${PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${id}`, {
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
                console.log("Customer ID is " + cart.customer_id);
                console.log("Customer email is " + cart.email);
            });
    }
</script>

<h2>Cart</h2>
<section id="cart">
    <table>
        <thead>
            <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {#each items as item}
                <tr>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>${(item.unit_price / 100).toFixed(2)}</td>
                    <td>${(item.total / 100).toFixed(2)} </td>
                </tr>
            {/each}
        </tbody>
    </table>
</section>
<section id="summary">
    <h4>SUMMARY</h4>
    <ul>
        <li>
            <p>Subtotal</p>
            <p>${(total / 100).toFixed(2)}</p>
        </li>
        <li>
            <p>Shipping</p>
            <p>$0.00</p>
        </li>
        <li>
            <p>Taxes</p>
            <p>$0.00</p>
        </li>
        <li id="total">
            <p>Total</p>
            <p>${(total / 100).toFixed(2)}</p>
        </li>
    </ul>
    <p>Enter your email to proceed to Checkout</p>
    <input id="email" type="email" bind:value={email} />
    <button
        type="submit"
        on:click={() => {
            addCustomer();
            alert("Added your Email");
        }}
    >
        Submit
    </button>

    <a href="/checkout">Go To Checkout</a>
</section>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    h2 {
        text-align: center;
        padding: 4rem 0 2rem 0;
        font-size: 4rem;
    }

    table {
        margin: 0 auto;
        table-layout: fixed;
        border-collapse: collapse;
        max-width: 16rem;
    }

    thead {
        border-bottom: 1px #000 solid;
    }

    tbody td {
        font-weight: 400;
        text-align: left;
    }

    thead th {
        text-align: left;
    }

    th,
    td {
        padding: 1.2rem;
    }

    @media (max-width: 420px) {
        th,
        td {
            padding: 1.2rem 0.8rem;
        }
    }

    #cart {
        padding: 2rem 0;
    }

    #summary {
        max-width: 16rem;
        margin: 0 auto;
        padding: 2rem 0;
    }

    #summary h4 {
        text-align: center;
        border-bottom: 1px #000 solid;
        font-size: 2rem;
        padding: 1rem;
    }

    #summary li {
        display: flex;
        justify-content: space-between;
        font-weight: 400;
        padding: 1rem 0;
    }

    #summary #total {
        border-top: 1px #000 solid;
        font-weight: 600;
        font-size: 1.2rem;
    }

    #summary a {
        display: block;
        text-decoration: none;
        width: 100%;
        background: #000;
        padding: 0.3rem 0;
        color: #fff;
        text-align: center;
        margin-top: 4rem;
    }

    #summary a:hover {
        font-weight: 600;
    }

    ul ~ p {
        padding-top: 1rem;
        font-weight: 400;
        text-align: justify;
    }

    input {
        width: 98%;
        margin: 0.5rem 0;
        padding: 0.4rem 0;
        padding-left: 0.2rem;
        border: 1px #000 solid;
    }

    button {
        text-decoration: none;
        background: #000;
        color: #fff;
        width: 100%;
        font-family: inherit;
        padding: 0.3rem 0;
        font-size: 1rem;
        cursor: pointer;
        border: none;
    }

    button:hover {
        font-weight: 600;
    }
</style>
