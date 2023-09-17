import * as cookie from "cookie";
import jwt from "jsonwebtoken";
import prisma, { getLocalTimestampInSeconds } from "$lib/back";
import { PRIVATE_KEY } from '$env/static/private'
import { base } from "$app/paths";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const myCookie = cookie.parse(event.request.headers.get("cookie") || "");
	const user = await decrypt(myCookie.user);
    const p = event.url.pathname;
    if (p == `${base}/login`) {
        if (user != null) {
            const buf = await prisma.member.findUnique({
                where: {
                    nickname: user.nickname
                },
            });
            if (buf != null && buf.password == user.password) return new Response('Redirect', {status: 303, headers: { Location: `${base}/posts` }});
        }
    } else {
        if (user == null) return new Response('Redirect', {status: 303, headers: { Location: `${base}/login` }});
        else {
            const buf = await prisma.member.findUnique({
                where: {
                    nickname: user.nickname
                },
            });
            if (buf != null && buf.password == user.password) {
                event.locals.last = buf.lastOnline
                await prisma.member.update({
                    data: {
                        lastOnline: getLocalTimestampInSeconds()
                    },
                    where: {
                        id: buf.id
                    }
                })
                event.locals.user = buf
            }
            else return new Response('Redirect', {status: 303, headers: { Location: `${base}/login` }});
        }
    }
    if (p == `${base}`) return new Response('Redirect', {status: 303, headers: { Location: `${base}/posts` }});
	const response = await resolve(event);
	return response;
}
const decrypt = (token: any, drop = false) => {
	return new Promise<{
        nickname: string;
        password: string;
    } | null>(async (resolve, reject) => {
		if (token == undefined) {
			if (drop) reject(401);
			else resolve(null);
		} else {
			jwt.verify(token, PRIVATE_KEY, (err: any, v: any) => {
				if (err) {
					if (drop) reject(401);
					else resolve(null);
				} else resolve(v);
			});
		}
	});
};