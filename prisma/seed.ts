import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const username = "johndoe";

    const existing = await prisma.profile.findUnique({
        where: { username },
    });

    if (existing) {
        console.log(`Profile ${username} already exists.`);
        return;
    }

    const profile = await prisma.profile.create({
        data: {
            username,
            name: "John Doe",
            bio: "Creator • Developer • Dreamer",
            theme: "dark",
            links: {
                create: [
                    { title: "My Portfolio", url: "https://johndoe.com", icon: "🚀", order: 0, clicks: 1203 },
                    { title: "Newsletter", url: "https://newsletter.johndoe.com", icon: "📧", order: 1, clicks: 456 },
                    { title: "Latest Project", url: "https://coolproject.io", icon: "✨", order: 2, clicks: 892 },
                    { title: "Twitter", url: "https://twitter.com/johndoe", icon: "🐦", order: 3 },
                ],
            },
        },
    });

    console.log({ profile });
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
