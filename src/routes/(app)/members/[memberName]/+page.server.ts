import prisma from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals }) {
    const user: Member = locals.user
    const member = await prisma.member.findUniqueOrThrow({
        where: {
            name: params.memberName
        }
    })
    member.followerCount = await prisma.follow.count({
        where: {
            memberId: member.id
        }
    })
    member.followingCount = await prisma.follow.count({
        where: {
            followerId: member.id
        }
    })
    const isFollowed = await prisma.follow.findFirst({
        where: {
            memberId: member.id,
            followerId: user.id
        }
    })
    member.isFollowed = isFollowed != null
    return { isOwner: member.id == user.id, member }
}