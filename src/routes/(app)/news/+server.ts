import prisma from '$lib/back.js';
import type { Member } from '@prisma/client';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, locals }) {
	const user: Member = locals.user
    const last: number = locals.last
    const count = await prisma.post.count({
        where: {
            memberId: {
                not: user.id
            },
            createdDate: {
                gte: last
            }
        }
    })
    if (count > 0) return new Response(null, {
        status: 200
    });
	return new Response(null, {
        status: 204
    });
}