import prisma, { formatTime, getRelativeTime } from "$lib/back";
import type { Member } from "@prisma/client";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, locals }) {
	const user: Member = locals.user;
	const r = await prisma.post.findFirstOrThrow({
		include: {
			member: true
		},
        where: {
            id: parseInt(params.postId)
        }
	});
    r.member.lastOnline = getRelativeTime(r.member.lastOnline)
    r.member.createdDate = formatTime(r.member.createdDate)
    r.createdDateRelative = getRelativeTime(r.createdDate)
    r.createdDate = formatTime(r.createdDate)
    r.likeCount = await prisma.likeOfPost.count({
        where: {
            postId: r.id,
        },
    });
    r.commentCount = await prisma.comment.count({
        where: {
            postId: r.id,
        },
    });
    const isLiked = await prisma.likeOfPost.findFirst({
        where: {
            memberId: user.id,
            postId: r.id
        }
    })
    r.isLiked = isLiked != null
    r.isMine = r.memberId == user.id
	return json({ post: r });
}

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