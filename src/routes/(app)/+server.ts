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

export async function PUT({ request, locals }) {
	const user: Member = locals.user
    const data = await request.json();
    const star = await prisma.star.findFirst({
        where: {
            memberId: user.id,
            postId: data.postId
        }
    })
    if (star == null) {
        await prisma.star.create({
            data: {
                memberId: user.id,
                postId: data.postId,
                createdDate: getLocalTimestampInSeconds()
            }
        })
    } else {
        await prisma.star.delete({
            where: {
                memberId_postId: {
                    memberId: user.id,
                    postId: data.postId
                }
            }
        })
    }
	return new Response(null, {
        status: 200
    });
}