/** @type {import('./$types').PageServerLoad} */
import prisma from '$lib';
import type { Member } from '@prisma/client';

export async function load({ locals }) {
    const user: Member = locals.user
    const posts = await prisma.post.findMany({
        include: {
            member: true
        }
    })
    return { posts }
}

/*export async function load({ url, fetch, locals }) {
    const user: Member = locals.user
    const res = await fetch(url.pathname)    
    if (res.ok) {
        const allMembers: Member[] = await res.json()
        return { allMembers }
    }
    throw error(res.status)
}*/