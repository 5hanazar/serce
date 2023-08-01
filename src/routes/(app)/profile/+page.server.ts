import prisma from '$lib/back';
import type { Member } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const user: Member = locals.user
    user.followerCount = await prisma.follow.count({
        where: {
            memberId: user.id
        }
    })
    return { user }
}