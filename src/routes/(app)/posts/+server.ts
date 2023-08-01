import prisma, { getLocalTimestampInSeconds } from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const user: Member = locals.user
    const data = await request.json();
    const now = getLocalTimestampInSeconds()
    await prisma.post.create({
        data: {
            active: true,
            memberId: user.id,
            description: data.description,
            lastUpdate: now,
            createdDate: now
        }
    })
	return new Response(null, {
        status: 200
    });
}

export async function PUT({ request, locals }) {
	const user: Member = locals.user
    const data = await request.json();
    const likeOfPost = await prisma.likeOfPost.findFirst({
        where: {
            memberId: user.id,
            postId: data.postId
        }
    })
    if (likeOfPost == null) {
        await prisma.likeOfPost.create({
            data: {
                memberId: user.id,
                postId: data.postId,
                createdDate: getLocalTimestampInSeconds()
            }
        })
    } else {
        await prisma.likeOfPost.delete({
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