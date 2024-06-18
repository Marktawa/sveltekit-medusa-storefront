/** @type {import(./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch(`http://localhost:9000/store/products`);
    const payload = await res.json();
    return { payload };
}

