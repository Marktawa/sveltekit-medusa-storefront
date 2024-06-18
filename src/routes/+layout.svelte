<div class="pagewrapper">
    <header id="header">
        <a href="/">HOME</a>
        <h1><a href="/">MY STORE</a></h1>
        <a href="/cart">CART</a>
    </header>
    <main id="main">
      <slot />
    </main>
    <footer id="footer">
        <p>Copyright 2024.</p>
        <p>Made Using Sveltekit and Medusa</p>
    </footer>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    
    .pagewrapper {
        max-width: 1440px;
        font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Ubuntu, sans-serif;
        margin: 0 auto;
    }
    
    header {
        padding: 0.6rem 1.2rem;
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
        border-bottom: 1px solid #000;
    }
    
    a {
        list-style: none;
        text-decoration: none;
        color: inherit;
    }
    
    footer {
        font-size: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
        padding: 0.75rem 1.5rem;
        border-top: 1px solid #000;
    }
    </style>