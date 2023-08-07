import prisma, { MY_PATH, formatTime, getLocalTimestampInSeconds, getRelativeTime } from "$lib/back";
import type { Member } from "@prisma/client";
import { json } from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET({ url, locals }) {
	const user: Member = locals.user;
	const query = parseInt(url.searchParams.get("memberId") || "-1");
	let where = undefined;
	if (query >= 0) {
		if (query == 0)
			where = {
				memberId: user.id,
			};
		else
			where = {
				memberId: query,
			};
	}
	//await new Promise(resolve => setTimeout(resolve, 2000));
	const buf = await prisma.post.findMany({
		include: {
			member: true,
		},
		where,
		orderBy: {
			createdDate: "desc",
		},
	});
	const posts = await Promise.all(
		buf.map(async (r) => {
			r.member.lastOnline = getRelativeTime(r.member.lastOnline);
			r.member.createdDate = formatTime(r.member.createdDate);
			r.createdDateRelative = getRelativeTime(r.createdDate);
			r.createdDate = formatTime(r.createdDate);
			r.likeCount = await prisma.likeOfPost.count({
				where: {
					postId: r.id,
				},
			});
			r.commentCount = await prisma.comment.count({
				where: {
					postId: r.id,
				},
			});
			const isLiked = await prisma.likeOfPost.findFirst({
				where: {
					memberId: user.id,
					postId: r.id,
				},
			});
			r.isLiked = isLiked != null;
			r.isMine = r.memberId == user.id;
			return r;
		})
	);
	return json({ posts });
}

import fs from "fs";
export async function POST({ request, locals }) {
	const user: Member = locals.user;

	const input = Object.fromEntries(await request.formData());
	const data = await JSON.parse(input.data);

	const now = getLocalTimestampInSeconds();
	const post = await prisma.post.create({
		data: {
			active: true,
			memberId: user.id,
			description: data.description.trim(),
			files: "",
			lastUpdate: now,
			createdDate: now,
		},
	});

	let fls = "";
	for await (const key of Object.keys(input)) {
		if (key.startsWith("image")) {
			const f = input[key] as File;
			const buffer = await f.arrayBuffer();
			const nm = `p${post.id}_${parseInt(key.substring(5))}.${f.name.split(".").pop()}`;
			fs.writeFileSync(`${MY_PATH}/${nm}`, new DataView(buffer));
			fls += `${nm};`;
		}
	}
	if (fls.length > 0) {
		fls = fls.slice(0, -1);
		await prisma.post.update({
			data: {
				files: fls,
			},
			where: {
				id: post.id,
			},
		});
	}

	return new Response(null, {
		status: 200,
	});
}

export async function PUT({ request, locals }) {
	const user: Member = locals.user;
	const data = await request.json();
	const likeOfPost = await prisma.likeOfPost.findFirst({
		where: {
			memberId: user.id,
			postId: data.postId,
		},
	});
	if (likeOfPost == null) {
		await prisma.likeOfPost.create({
			data: {
				memberId: user.id,
				postId: data.postId,
				createdDate: getLocalTimestampInSeconds(),
			},
		});
	} else {
		await prisma.likeOfPost.delete({
			where: {
				memberId_postId: {
					memberId: user.id,
					postId: data.postId,
				},
			},
		});
	}
	return new Response(null, {
		status: 200,
	});
}
