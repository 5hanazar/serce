import prisma, { getLocalTimestampInSeconds } from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function PUT({ request, locals }) {
	const user: Member = locals.user
    const data = await request.json();
    const follow = await prisma.follow.findFirst({
        where: {
            memberId: data.memberId,
            followerId: user.id
        }
    })
    if (follow == null) {
        await prisma.follow.create({
            data: {
                memberId: data.memberId,
                followerId: user.id,
                createdDate: getLocalTimestampInSeconds()
            }
        })
    } else {
        await prisma.follow.delete({
            where: {
                memberId_followerId: {
                    memberId: data.memberId,
                    followerId: user.id,
                }
            }
        })
    }
	return new Response(null, {
        status: 200
    });
}