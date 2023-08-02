import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import type { Member } from "@prisma/client";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, locals }) {
    const user: Member = locals.user
    params.postId = parseInt(params.postId)
    await prisma.post.delete({
        where: {
            id: params.postId,
            memberId: user.id
        }
    })
	return new Response(null, {
        status: 200
    });
}