import type { Member, Post } from "@prisma/client";
import { error } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
    const res = await fetch(url.pathname)    
    if (res.ok) {
        const posts: (Post & { member: Member })[] = await res.json()
        return { posts }
    }
    throw error(res.status)
}

/** @type {import('./$types').Actions} */
/*export const actions = {
    default: async ({ locals, request }) => {
        const user: Member = locals.user
        const data = await request.formData();
        await prisma.post.create({
            data: {
                active: true,
                memberId: user.id,
                description: data.get('description')?.toString() || '',
                createdDate: getLocalTimestampInSeconds()
            }
        })
    }
};*/
