import prisma, { getLocalTimestampInSeconds } from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const user: Member = locals.user
    const posts = await prisma.post.findMany({
        include: {
            member: true
        }
    })
    return { posts }
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