import prisma, { FFMPEG, FFPROBE, MY, MY_PATH, formatTime, getLocalTimestampInSeconds, getRelativeTime } from "$lib/back";
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
            const _nm = `p${post.id}_${parseInt(key.substring(5))}`
			const nm = `${_nm}.${f.name.split(".").pop()}`;
			fs.writeFileSync(`${MY_PATH}/${nm}`, new DataView(buffer));
            if (nm.endsWith('.mp4')) {
                await shell(`${FFMPEG} -i ${MY_PATH}/${nm} -vframes 1 ${MY_PATH}/${_nm}.jpg`)
                const w = parseInt(await shell(`${FFPROBE} -v error -select_streams v:0 -show_entries stream=width -of csv=p=0:s=x ${MY_PATH}/${_nm}.jpg`))
                await shell(`${FFMPEG} -y -i ${MY_PATH}/${_nm}.jpg -i ${MY}/vid.png -filter_complex "[1:v]scale=${w * 0.2}:-1[watermark]; [0:v][watermark]overlay=W-w-${w * 0.05}:${w * 0.05}:format=auto" ${MY_PATH}/${_nm}.jpg`)
            }
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

import { exec } from "child_process";
const shell = (cmd: string) => new Promise<any>((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            //console.error(`EXEC error: ${error}`);
            reject(error)
        } else if (stderr) {
            //console.error(`EXEC stderr: ${stderr}`);
            resolve(null)
        } else {
            resolve(stdout)
        }
    });
});

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
