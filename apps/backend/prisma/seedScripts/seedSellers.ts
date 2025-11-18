import { PrismaClient } from "@prisma/client";
import { sellersData } from "../seedData/sellersSeedData"

export async function seedSellers(prisma: PrismaClient) {
    // adding mock sellers Data
    console.log("seeding sellers with mock data...");

    await prisma.seller.createMany({
        data: sellersData.map((s) => ({
            username: s.username,
            rating: s.rating,
            completedSales: s.completedSales,
            photo: s.photo
        }))
    })

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