import prisma, { MY_PATH, formatTime, getLocalTimestampInSeconds, getRelativeTime } from "$lib/back";
import type { Member } from "@prisma/client";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
    const user: Member = locals.user;
    const query = parseInt(url.searchParams.get('postId') || '0')
    let where = undefined
    if (query > 0) {
        where = {
            postId: query
        }
    }
	const buf = await prisma.comment.findMany({
        include: {
            member: true
        },
        where
    });
    const comments = await Promise.all(
		buf.map(async (r) => {
            r.member.lastOnline = getRelativeTime(r.member.lastOnline)
            r.member.createdDate = formatTime(r.member.createdDate)
            r.createdDateRelative = getRelativeTime(r.createdDate)
            r.createdDate = formatTime(r.createdDate)
			r.likeCount = await prisma.likeOfComment.count({
				where: {
					commentId: r.id,
				},
			});
            const isLiked = await prisma.likeOfComment.findFirst({
                where: {
                    memberId: user.id,
                    commentId: r.id
                }
            })
            r.isLiked = isLiked != null
            r.isMine = r.memberId == user.id
			return r;
		})
	);
	return json({ comments })
}

import fs from "fs";
export async function POST({ request, locals }) {
    const user: Member = locals.user

    const input = Object.fromEntries(await request.formData());
	const data = await JSON.parse(input.data);

    const now = getLocalTimestampInSeconds()
    const comment = await prisma.comment.create({
        data: {
            memberId: user.id,
            postId: data.postId,
            parentId: 0,
            description: data.description.trim(),
            files: "",
            lastUpdate: now,
            createdDate: now
        }
    })

    let fls = "";
	for await (const key of Object.keys(input)) {
		if (key.startsWith("image")) {
			const f = input[key] as File;
			const buffer = await f.arrayBuffer();
			const nm = `c${comment.id}_${parseInt(key.substring(5))}.${f.name.split(".").pop()}`;
			fs.writeFileSync(`${MY_PATH}/${nm}`, new DataView(buffer));
			fls += `${nm};`;
		}
	}
	if (fls.length > 0) {
		fls = fls.slice(0, -1);
		await prisma.comment.update({
			data: {
				files: fls,
			},
			where: {
				id: comment.id,
			},
		});
	}

	return new Response(null, {
        status: 200
    });
}

export async function PUT({ request, locals }) {
	const user: Member = locals.user
    const data = await request.json();
    const likeOfComment = await prisma.likeOfComment.findFirst({
        where: {
            memberId: user.id,
            commentId: data.commentId
        }
    })
    if (likeOfComment == null) {
        await prisma.likeOfComment.create({
            data: {
                memberId: user.id,
                commentId: data.commentId,
                createdDate: getLocalTimestampInSeconds()
            }
        })
    } else {
        await prisma.likeOfComment.delete({
            where: {
                memberId_commentId: {
                    memberId: user.id,
                    commentId: data.commentId
                }
            }
        })
    }
	return new Response(null, {
        status: 200
    });
}