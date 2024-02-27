<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<h1>Welcome to the Medusa SvelteKit Store</h1>
<h2>Products</h2>
<ul>
    {#each data.payload.products as product}
        <li>{product.title} - ${product.variants[0].prices[0].amount}</li>
    {/each}
</ul>

