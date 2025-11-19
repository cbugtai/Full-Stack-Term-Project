import prisma from "../../../../prisma/client"
import type { SellerDto } from "../../../../../../shared/types/seller-terms"

// grabs the list of all sellers in the db
// requires userId as an argument
// returns list of sellers
export const fetchAllSellers = async(
    userId: number
) : Promise<SellerDto[]> => {

    const sellers = await prisma.seller.findMany({
        select: {
            id: true,
            username: true,
            rating: true,
            completedSales: true,
            photo: true,
            preferences: {
                where: { userId },      
                select: {
                    isFavorite: true,
                    isBlocked: true,
                }
            }
        }
    })

    const sellersDto: SellerDto[] = sellers.map((s) => {
        const pref = s.preferences[0];

        return {
            id: s.id,
            username: s.username,
            rating: s.rating,
            completedSales: s.completedSales,
            photo: s.photo ?? undefined,
            isFavorite: pref?.isFavorite ?? false,
            isBlocked: pref?.isBlocked ?? false,
        }
    })

    return sellersDto
}

// grabs the a seller using a sellerId
// requires userId asn sellerId as an argument
// returns a single seller
export const fetchSellerById = async(
    userId: number, 
    sellerId: number 
) : Promise<SellerDto> => {

    const seller = await prisma.seller.findUnique({
        where: {id:  sellerId },
        select: {
            id: true,
            username: true,
            rating: true,
            completedSales: true,
            photo: true,
            preferences: {
                where: { userId },      
                select: {
                    isFavorite: true,
                    isBlocked: true,
                }
            }
        }
    })

    if (!seller) {
        throw new Error(`Seller with ID ${sellerId} not found`)
    }

    const pref = seller.preferences[0];

    const sellerDto: SellerDto = {
            id: seller.id,
            username: seller.username,
            rating: seller.rating,
            completedSales: seller.completedSales,
            photo: seller.photo ?? undefined,
            isFavorite: pref?.isFavorite ?? false,
            isBlocked: pref?.isBlocked ?? false,
        }

    return sellerDto
}

// updates the UserSellerPreference table, changes isFavorite = true
// requires userId and sellerId as arguments
// returns the updated seller
export const addFavoriteSeller = async (
    userId: number,
    sellerId: number,
): Promise<SellerDto> => {
    await prisma.userSellerPreference.upsert({
        where: {
            userId_sellerId: { userId, sellerId },
        },
        create: {
            userId,
            sellerId,
            isFavorite: true
        },
        update: {
            isFavorite: true
        }
    })
    const seller = await fetchSellerById(userId, sellerId);

    return seller
}

// updates the UserSellerPreference table, changes isFavorite = false
// requires userId and sellerId as arguments
// returns the updated seller
export const removeFavoriteSeller = async (
    userId: number,
    sellerId: number,
): Promise<SellerDto> => {
    await prisma.userSellerPreference.upsert({
        where: {
            userId_sellerId: { userId, sellerId },
        },
        create: {
            userId,
            sellerId,
            isFavorite: false
        },
        update: {
            isFavorite: false
        }
    })
    const seller = await fetchSellerById(userId, sellerId);

    return seller
}

// updates the UserSellerPreference table, changes isBlocked = true
// requires userId and sellerId as arguments
// returns the updated seller
export const addBlockedSeller = async (
    userId: number,
    sellerId: number,
): Promise<SellerDto> => {
    await prisma.userSellerPreference.upsert({
        where: {
            userId_sellerId: { userId, sellerId },
        },
        create: {
            userId,
            sellerId,
            isBlocked: true
        },
        update: {
            isBlocked: true
        }
    })
    const seller = await fetchSellerById(userId, sellerId);

    return seller
}

// updates the UserSellerPreference table, changes isBlocked = false
// requires userId and sellerId as arguments
// returns the updated seller
export const removeBlockedSeller = async (
    userId: number,
    sellerId: number,
): Promise<SellerDto> => {
    await prisma.userSellerPreference.upsert({
        where: {
            userId_sellerId: { userId, sellerId },
        },
        create: {
            userId,
            sellerId,
            isBlocked: false
        },
        update: {
            isBlocked: false
        }
    })
    const seller = await fetchSellerById(userId, sellerId);

    return seller
}