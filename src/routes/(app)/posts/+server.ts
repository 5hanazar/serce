import prisma, { formatTime, getLocalTimestampInSeconds, getRelativeTime } from '$lib/back';
import type { Member } from '@prisma/client';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ locals }) {
    const user: Member = locals.user;
	const buf = await prisma.post.findMany({
		include: {
			member: true,
		},
	});
	const posts = await Promise.all(
		buf.map(async (r) => {
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
			return r;
		})
	);
	return json({ posts })
}

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