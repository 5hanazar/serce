import { base } from "$app/paths";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
    let res = await fetch(url.pathname)
    let data   
    if (res.ok) {
        data = await res.json()
        res = await fetch(`${base}/comments?postId=${data.post.id}`)
        data.comments = (await res.json()).comments
        return data
    }
    throw error(res.status)
}
