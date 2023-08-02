import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import type { Member } from "@prisma/client";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, locals }) {
    const user: Member = locals.user
    params.commentId = parseInt(params.commentId)
    await prisma.comment.delete({
        where: {
            id: params.commentId,
            memberId: user.id
        }
    })
	return new Response(null, {
        status: 200
    });
}