import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getLocalTimestampInSeconds = () => {
    const now = new Date();
	return Math.round((now.getTime() - now.getTimezoneOffset() * 60000) / 1000);
}
async function main() {
	const now = getLocalTimestampInSeconds();
    await prisma.likeOfPost.deleteMany()
    await prisma.likeOfComment.deleteMany()
    await prisma.follow.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.post.deleteMany()
    await prisma.member.deleteMany()
    await prisma.member.create({
		data: {
			active: true,
			nickname: "sha",
			password: "890",
			fullName: "Shanazar",
			phone: "",
			address: "",
			description: "",
            files: "",
			createdDate: now,
            lastOnline: now
		},
	});
	const john = await prisma.member.create({
		data: {
			active: true,
			nickname: "john",
			password: "123",
			fullName: "John Wick",
			phone: "",
			address: "",
			description: "",
            files: "",
			createdDate: now,
            lastOnline: now
		},
	});
    const johnPost = await prisma.post.create({
		data: {
			active: true,
			memberId: john.id,
			description: "Today is cold",
            files: "",
            lastUpdate: now,
			createdDate: now
		},
	});
    const bond = await prisma.member.create({
		data: {
			active: true,
			nickname: "bond",
			password: "007",
			fullName: "James Bond",
			phone: "",
			address: "",
			description: "",
            files: "",
			createdDate: now,
            lastOnline: now
		},
	});
    const bondPost = await prisma.post.create({
		data: {
			active: true,
			memberId: bond.id,
			description: "Today is warm",
            files: "",
            lastUpdate: now,
			createdDate: now
		},
	});
    console.log(`${john.nickname} | ${john.password}\n${bond.nickname} | ${bond.password}`);

    await prisma.likeOfPost.create({
        data: {
            memberId: john.id,
            postId: bondPost.id,
            createdDate: now
        }
    })
    await prisma.likeOfPost.create({
        data: {
            memberId: bond.id,
            postId: johnPost.id,
            createdDate: now
        }
    })
    const johnComment = await prisma.comment.create({
        data: {
            memberId: john.id,
            postId: bondPost.id,
            parentId: 0,
            description: 'Nice',
            files: "",
            lastUpdate: now,
            createdDate: now
        }
    })
    await prisma.likeOfComment.create({
        data: {
            memberId: bond.id,
            commentId: johnComment.id,
            createdDate: now
        }
    })
    await prisma.follow.create({
        data: {
            memberId: john.id,
            followerId: bond.id,
            createdDate: now
        }
    })
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});