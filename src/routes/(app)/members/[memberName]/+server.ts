import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import type { Member } from "@prisma/client";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, locals }) {
    const user: Member = locals.user
    const member = await prisma.member.findUniqueOrThrow({
        where: {
            name: params.memberName
        }
    })
    const isFollowed = await prisma.follow.findFirst({
        where: {
            memberId: member.id,
            followerId: user.id
        }
    })
    const extra = {
        followerCount: await prisma.follow.count({
            where: {
                memberId: member.id
            }
        }),
        followingCount: await prisma.follow.count({
            where: {
                followerId: member.id
            }
        }),
        isFollowed: isFollowed != null,
        isMine: member.id == user.id
    }
    return json({ member, ...extra })
}