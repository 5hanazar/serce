import prisma, { formatTime, getRelativeTime } from "$lib/back";
import type { Member } from "@prisma/client";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, locals }) {
    const user: Member = locals.user
    if (params.memberName == 'me') {
        params.memberName = user.name
    }
    //await new Promise(resolve => setTimeout(resolve, 2000));
    const member = await prisma.member.findUniqueOrThrow({
        where: {
            nickname: params.memberName
        }
    })
    member.lastOnline = getRelativeTime(member.lastOnline)
    member.createdDate = formatTime(member.createdDate)
    const isFollowed = await prisma.follow.findFirst({
        where: {
            memberId: member.id,
            followerId: user.id
        }
    })
    const extra = {
        postCount: await prisma.post.count({
            where: {
                memberId: member.id
            }
        }),
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