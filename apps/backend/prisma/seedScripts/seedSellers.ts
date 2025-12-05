import { PrismaClient } from "@prisma/client";
import { sellersData } from "../seedData/sellersSeedData"

export async function seedSellers(prisma: PrismaClient) {
    // adding mock sellers Data
    console.log("seeding sellers with mock data...");

    for (const s of sellersData) {
        const user = await prisma.user.create({
            data: {
                clerkId: `seed_${s.username}`,
                userName: s.username,
                email: `${s.username.toLowerCase()}@example.com`,
                profilePic: s.photo,
            },
        });

        await prisma.seller.create({
            data: {
                userId: user.id,
                rating: s.rating,
            },
        });
    }

    //query created users
    const mockUser = await prisma.user.findFirst({
    orderBy: { id: "asc" },
    })
    if (!mockUser) {throw new Error("user not found")}

    //query sellers
    const sellers = await prisma.seller.findMany({
    orderBy: { id: "asc" },
    });
    if (sellers.length === 0) {throw new Error("No sellers found.");}

    // Adding mock user preference
    console.log("seeding user preferences...");

    await prisma.userSellerPreference.create({
    data: {
        userId: mockUser.id,
        sellerId: sellers[2].id,
        isFavorite: true,
        isBlocked: false
    }
    });

    await prisma.userSellerPreference.create({
    data: {
        userId: mockUser.id,
        sellerId: sellers[4].id,
        isFavorite: false,
        isBlocked: true
    }
    });
}