import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
    const res = await fetch(url.pathname)    
    if (res.ok) {
        const data = await res.json()
        return data
    }
    throw error(res.status)
}
