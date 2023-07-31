import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getLocalTimestampInSeconds = () => {
    const now = new Date();
	return Math.round((now.getTime() - now.getTimezoneOffset() * 60000) / 1000);
}
async function main() {
	const now = getLocalTimestampInSeconds();
    await prisma.star.deleteMany()
    await prisma.post.deleteMany()
    await prisma.member.deleteMany()
	const john = await prisma.member.create({
		data: {
			active: true,
			name: "john",
			password: "123",
			fullName: "John Wick",
			phone: "",
			address: "",
			description: "",
			createdDate: now,
            lastOnline: now
		},
	});
    const johnPost = await prisma.post.create({
		data: {
			active: true,
			memberId: john.id,
			description: "Today is cold",
            lastUpdate: now,
			createdDate: now
		},
	});
    const bond = await prisma.member.create({
		data: {
			active: true,
			name: "bond",
			password: "007",
			fullName: "James Bond",
			phone: "",
			address: "",
			description: "",
			createdDate: now,
            lastOnline: now
		},
	});
    const bondPost = await prisma.post.create({
		data: {
			active: true,
			memberId: bond.id,
			description: "Today is warm",
            lastUpdate: now,
			createdDate: now
		},
	});
    console.log(`${john.name} | ${john.password}\n${bond.name} | ${bond.password}`);

    await prisma.star.create({
        data: {
            memberId: john.id,
            postId: bondPost.id,
            createdDate: now
        }
    })
    await prisma.star.create({
        data: {
            memberId: bond.id,
            postId: johnPost.id,
            createdDate: now
        }
    })
    await prisma.comment.create({
        data: {
            memberId: john.id,
            postId: bondPost.id,
            parentId: 0,
            description: 'Nice',
            lastUpdate: now,
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