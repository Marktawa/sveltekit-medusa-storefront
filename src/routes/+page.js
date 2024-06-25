import { MEDUSA_BACKEND_URL } from '$env/static/public';

/** @type {import(./$types').PageLoad} */
export async function load({ fetch }) {
    const res = await fetch(`${MEDUSA_BACKEND_URL}/store/products`);
    const payload = await res.json();
    return { payload };
}

