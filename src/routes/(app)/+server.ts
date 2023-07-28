import prisma, { getLocalTimestampInSeconds } from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const user: Member = locals.user
    const data = await request.json();
    await prisma.post.create({
        data: {
            active: true,
            memberId: user.id,
            description: data.description,
            createdDate: getLocalTimestampInSeconds()
        }
    })
	return new Response(null, {
        status: 200
    });
}