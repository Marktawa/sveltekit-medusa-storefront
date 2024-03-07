<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import { onMount } from "svelte";

  onMount(async () => {
    fetch(`http://localhost:9000/store/carts`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => response.json())
      .then(({ cart }) => {
        localStorage.setItem("cart_id", cart.id);
        console.log("The cart ID is " + localStorage.getItem("cart_id"));
      });
  });

  function addProductToCart(variant_id) {
    const id = localStorage.getItem("cart_id");
    fetch(`http://localhost:9000/store/carts/${id}/line-items`, {
        method: "POST",
        dentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            variant_id,
            quantity: 1,
        }),
    })
        .then((response) => response.json());
        //.then(({ cart }) => setCart(cart));
  }
</script>

<h1>Welcome to the Medusa SvelteKit Store</h1>
<h2>Products</h2>
<ul>
  {#each data.payload.products as product}
    <li>{product.title} - ${product.variants[0].prices[0].amount}</li>
    <button on:click={() => { 
      addProductToCart(product.variants[0].id); 
      alert('Added to Cart');
      }}
>
    Add To Cart
</button>
  {/each}
</ul>
