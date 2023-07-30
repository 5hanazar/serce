import type { Member } from '@prisma/client';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
    const user: Member = locals.user
    return { user }
}