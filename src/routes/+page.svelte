<script>
  /** @type {import('./$types').PageData} */
  export let data;

  import { onMount } from "svelte";
  import { PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';

  onMount(async () => {
    fetch(`${PUBLIC_MEDUSA_BACKEND_URL}/store/carts`, {
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
    fetch(`${PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${id}/line-items`, {
      method: "POST",
      dentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variant_id,
        quantity: 1,
      }),
    }).then((response) => response.json());
    //.then(({ cart }) => setCart(cart));
  }
</script>

<section id="hero">
  <h2>Welcome to the Medusa SvelteKit Store</h2>
  <a href="#products">View Products</a>
</section>

<section id="products">
  <h3>Products</h3>
  <ul>
    {#each data.payload.products as product}
      <li>
        <img src="{product.thumbnail}" alt="">
        <h4>{product.title}</h4>
        <p>${ (product.variants[0].prices[1].amount / 100).toFixed(2) }</p>
        <button
          on:click={() => {
            addProductToCart(product.variants[0].id);
            alert("Added to Cart");
          }}
        >
          Add To Cart
        </button>
      </li>
    {/each}
  </ul>
</section>

<style>
  #hero {
    border-bottom: 1px #000000 solid;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    height: 100vh;
  }

  #products {
    padding: 2rem 0;
  }

  ul, li, a {
    list-style: none;
    text-decoration: none;
    color: inherit;
  }

  ul {
    display: grid;
    text-align: center;
    justify-items: center;
    grid-template-columns: repeat(3, 1fr);
    padding: 1.2rem;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    ul {
        grid-template-columns: repeat(2, 1fr);
        padding: 1rem;
        gap: 1.6rem;
    }
 } 

 @media (max-width: 480px) {
    ul {
        grid-template-columns: repeat(1, 1fr);
        padding: 0.8rem;
        gap: 3rem;      
    }
 }

  li {
    max-width: 18rem;
    padding: 1.2rem 0;
  }

  img {
    width: 100%;
  }

  h3 {
    text-align: center;
    padding: 2rem 0;
  }

  button {
    text-decoration: none;
    background: #000;
    color: #FFF;
    width: 100%;
    font-family: inherit;
    padding: 0.5rem 0;
    cursor: pointer;
    border: none;
  }

  button:hover {
    font-weight: 600;
  }
</style>
