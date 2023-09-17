import prisma from '$lib/back';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '$env/static/private'

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const user = await request.json();
    const buf = await prisma.member.findUnique({
        where: {
            nickname: user.nickname
        }
    })
    if (!(buf != null && buf.password == user.password)) return new Response(null, { status: 401 });
    const token = jwt.sign(JSON.stringify(user), PRIVATE_KEY)
	return new Response(token, {
        headers: {
            'Set-Cookie': `user=${token};path=/;SameSite=None;Secure`
        },
        status: 200
    });
}