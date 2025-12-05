import prisma from "../../../../prisma/client"
import type { SellerDto, SellersPageDto } from "../../../../../../shared/types/seller-terms"

// creates a new seller linked to the given user
// requires userId and optional rating (defaults to 50)
// returns the created seller
export const addSeller = async (
    userId: number,
    rating?: number,
) : Promise<SellerDto> => {

    const existingSeller = await prisma.seller.findUnique({where: {userId}})
    if (existingSeller) {
        throw new Error("Seller already exists for this user")
    }

    const newSeller = await prisma.seller.create({
        data: {
            userId,
            rating: rating ?? 50,
        }
    })

    const seller = await fetchSellerById(userId, newSeller.id)

    return seller
}

// grabs the list of all sellers in the db
// requires userId as an argument
// returns list of sellers
export const fetchAllSellers = async(
    userId: number | undefined,
    page: number,
    pageSize: number
) : Promise<SellersPageDto> => {
    
    // pagination calculation
    const skip: number = (page - 1) * pageSize;
    // get the toal count of listings for pagination info
    const totalCount = await prisma.listings.count();

    const preferencesSelect = userId?
        {
            where: { userId },
            select: {
                isFavorite: true,
                isBlocked: true,
            }
        } :
        {
            take: 0,
            select: {
                isFavorite: true,
                isBlocked: true,
            }
        }

    const sellers = await prisma.seller.findMany({
        skip,
        take: pageSize,
        select: {
            id: true,
            rating: true,
            _count: {
                select: {
                    listings: {where: { status: { status: "Sold" } } }
                }
            },
            user: {
                select: {
                    userName: true,
                    profilePic: true,
                }
            },
            preferences: preferencesSelect
        }
    })

    const sellersDto: SellerDto[] = sellers.map((s) => {
        const pref = s.preferences[0];

        return {
            id: s.id,
            username: s.user.userName,
            rating: s.rating,
            completedSales: s._count.listings,
            photo: s.user.profilePic ?? undefined,
            isFavorite: pref?.isFavorite ?? false,
            isBlocked: pref?.isBlocked ?? false,
        }
    })

    return {
        sellers: sellersDto,
        meta: {
            page,
            pageSize,
            totalCount,
            totalPages: Math.ceil(totalCount / pageSize),
        },
    };
}

// grabs the a seller using a sellerId
// requires userId asn sellerId as an argument
// returns a single seller
export const fetchSellerById = async(
    userId: number | undefined,
    sellerId: number
) : Promise<SellerDto> => {

    const preferencesSelect = userId?
        {
            where: { userId },
            select: {
                isFavorite: true,
                isBlocked: true,
            }
        } :
        {
            take: 0,
            select: {
                isFavorite: true,
                isBlocked: true,
            }
        }

    const seller = await prisma.seller.findUnique({
        where: {id:  sellerId },
        select: {
            id: true,
            rating: true,
            _count: {
                select: {
                    listings: { where: { status: { status: "Sold" } } },
                }
            },
            user: {
                select: {
                    userName: true,
                    profilePic: true
                }
            },
            preferences: preferencesSelect
        }
    })

    if (!seller) {
        throw new Error(`Seller with ID ${sellerId} not found`)
    }

    const pref = seller.preferences[0];

    const sellerDto: SellerDto = {
            id: seller.id,
            username: seller.user.userName,
            rating: seller.rating,
            completedSales: seller._count.listings,
            photo: seller.user.profilePic ?? undefined,
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