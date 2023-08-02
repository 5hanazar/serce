import prisma from "$lib/back";
import type { vPost } from "$lib/front";
import type { Member } from "@prisma/client";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
    const res = await fetch(url.pathname)    
    if (res.ok) {
        const post: vPost = await res.json()
        return post
    }
    throw error(res.status)
}
