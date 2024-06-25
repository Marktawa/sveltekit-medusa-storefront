/** @type {import(./$types').PageLoad} */
import { PUBLIC_MEDUSA_BACKEND_URL } from '$env/static/public';

export async function load({ fetch }) {
    const res = await fetch(`${PUBLIC_MEDUSA_BACKEND_URL}/store/products`);
    const payload = await res.json();
    return { payload };
}

