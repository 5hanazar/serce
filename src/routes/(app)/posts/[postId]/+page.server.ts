import prisma from "$lib/back";
import type { Member } from "@prisma/client";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
	const user: Member = locals.user;
	const r = await prisma.post.findFirstOrThrow({
		include: {
			member: true
		},
        where: {
            id: parseInt(params.postId)
        }
	});
    r.likeCount = await prisma.likeOfPost.count({
        where: {
            postId: r.id,
        },
    });
    const buf = await prisma.comment.findMany({
        include: {
            member: true
        },
        where: {
            postId: r.id,
        },
    });
    r.comments = await Promise.all(
		buf.map(async (r) => {
			r.likeCount = await prisma.likeOfComment.count({
				where: {
					commentId: r.id,
				},
			});
            const isLiked = await prisma.likeOfComment.findFirst({
                where: {
                    memberId: user.id,
                    commentId: r.id
                }
            })
            r.isLiked = isLiked != null
            r.isMine = r.memberId == user.id
			return r;
		})
	);

    const isLiked = await prisma.likeOfPost.findFirst({
        where: {
            memberId: user.id,
            postId: r.id
        }
    })
    r.isLiked = isLiked != null
    r.isMine = r.memberId == user.id

	return { post: r };
}
