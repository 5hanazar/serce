import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import type { Member } from "@prisma/client";

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
    const user: Member = locals.user
    const data = await request.json();
    const now = getLocalTimestampInSeconds()
    await prisma.comment.create({
        data: {
            memberId: user.id,
            postId: data.postId,
            parentId: 0,
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
    const likeOfComment = await prisma.likeOfComment.findFirst({
        where: {
            memberId: user.id,
            commentId: data.commentId
        }
    })
    if (likeOfComment == null) {
        await prisma.likeOfComment.create({
            data: {
                memberId: user.id,
                commentId: data.commentId,
                createdDate: getLocalTimestampInSeconds()
            }
        })
    } else {
        await prisma.likeOfComment.delete({
            where: {
                memberId_commentId: {
                    memberId: user.id,
                    commentId: data.commentId
                }
            }
        })
    }
	return new Response(null, {
        status: 200
    });
}