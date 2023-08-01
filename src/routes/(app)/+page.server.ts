import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import type { Member } from "@prisma/client";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
	const user: Member = locals.user;
	const buf = await prisma.post.findMany({
		include: {
			member: true,
		},
	});
	const posts = await Promise.all(
		buf.map(async (r) => {
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
			return r;
		})
	);
	return { user, posts };
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
