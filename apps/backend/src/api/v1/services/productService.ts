// this service is used for users to get the product listings
// not the service for the seller
// Use the listing type defined in prisma/schema.prisma
// initialize a prisma client if not already and use in queries here
import prisma from "../../../../prisma/client";
import {
  Product,
  ProductsRes,
} from "../../../../../../shared/types/frontend-product";
import { Wishlist } from "@prisma/client";
import { ExtendedError } from "../middleware/errorHandler";

export const fetchAllProducts = async (
  userId: number,
  page: number,
  pageSize: number
): Promise<ProductsRes | undefined> => {
  try {
    // pagination calculation
    const skip: number = (page - 1) * pageSize;

    // get all records in the listings table
    const listings = await prisma.listings.findMany({
      skip,
      take: pageSize,
      include: {
        category: true,
        brand: true,
        condition: true,
        // check the wishlist for the current user
        wishlist: {
          where: {
            userId,
          },
        },
        reviews: {
          include: {
            user: true, // join the user table to get userName
          },
          orderBy: {
            createdAt: "desc", // oder by most recently created reviews
          },
        },
      },
    });
    // get the toal count of listings for pagination info
    const totalCount = await prisma.listings.count();

    // generate the Product[] to return
    const products: Product[] = listings.map((listing) => ({
      id: listing.id,
      description: listing.description,
      category: listing.category.category,
      brand: listing.brand.brand,
      condition: listing.condition.condition,
      price: listing.price.toNumber(), // Decimal -> number
      originalPrice: listing.originalPrice.toNumber(),
      imgUrl: listing.imageUrl,
      isWishlisted: listing.wishlist.length > 0, // if there is a record in wishlist for this user and listing
      hasReviewed: listing.reviews.some((r) => r.userId === userId),
      reviews: listing.reviews.map((r) => ({
        id: r.id,
        productId: listing.id,
        productDescription: listing.description,
        userId: r.userId,
        userName: `${r.user.userName}`,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    }));

    return {
      products,
      meta: {
        page,
        pageSize,
        totalCount,
        totalPages: Math.ceil(totalCount / pageSize),
      },
    };
  } catch (error) {
    const err: ExtendedError = new Error(
      `Failed to fetch products from database`
    );
    err.statusCode = 500;
    err.code = "Database_Fetch_All_Products_Failed";
  }
};

export const fetchProductById = async (
  userId: number,
  productId: number
): Promise<Product | null> => {
  try {
    // get the product listing by id
    const listing = await prisma.listings.findUnique({
      where: { id: productId },
      include: {
        category: true,
        brand: true,
        condition: true,
        // check the wishlist for the current user
        wishlist: {
          where: {
            userId,
          },
        },
        reviews: {
          include: {
            user: true, // join the user table to get userName
          },
          orderBy: {
            createdAt: "desc", // oder by most recently created reviews
          },
        },
      },
    });

    // return the product or null
    if (listing === null) {
      return null;
    } else {
      return {
        id: listing.id,
        description: listing.description,
        category: listing.category.category,
        brand: listing.brand.brand,
        condition: listing.condition.condition,
        price: listing.price.toNumber(), // Decimal -> number
        originalPrice: listing.originalPrice.toNumber(),
        imgUrl: listing.imageUrl,
        isWishlisted: listing.wishlist.length > 0, // if there is a record in wishlist for this user and listing
        hasReviewed: listing.reviews.some((r) => r.userId === userId),
        reviews: listing.reviews.map((r) => ({
          id: r.id,
          productId: listing.id,
          productDescription: listing.description,
          userId: r.userId,
          userName: `${r.user.userName}`,
          comment: r.comment,
          createdAt: r.createdAt,
        })),
      };
    }
  } catch (error) {
    const err: ExtendedError = new Error(
      `Failed to fetch term with id ${productId}`
    );
    err.code = "FETCH_PRODUCT_BY_ID_FAILED";
    err.statusCode = 400;
    throw err;
  }
};

export const getUserWishlist = async (
  userId: number,
  page: number,
  pageSize: number
): Promise<ProductsRes> => {
  // pagination calculation
  const skip: number = (page - 1) * pageSize;

  const wishlistListings = await prisma.wishlist.findMany({
    skip,
    take: pageSize,
    where: { userId },
    include: {
      listing: {
        include: {
          category: true,
          brand: true,
          condition: true,
          reviews: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc", // oder by most recently created reviews
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc", // oder by most recently added to wishlist
    },
  });
  // get the toal count of listings for pagination info
  const totalCount = await prisma.wishlist.count({
    where: { userId },
  });

  const products: Product[] = wishlistListings.map((wishListing) => {
    const l = wishListing.listing;

    return {
      id: l.id,
      description: l.description,
      category: l.category.category,
      brand: l.brand.brand,
      condition: l.condition.condition,
      price: l.price.toNumber(),
      originalPrice: l.originalPrice.toNumber(),
      imgUrl: l.imageUrl,
      isWishlisted: true, // since these are all wishlisted items
      hasReviewed: l.reviews.some((r) => r.userId === userId),
      reviews: l.reviews.map((r) => ({
        id: r.id,
        userId: r.userId,
        productId: r.listingId,
        productDescription: l.description,
        userName: `${r.user.userName}`,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    };
  });

  return {
    products,
    meta: {
      page,
      pageSize,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    },
  };
};

export const addToWishlist = async ({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}): Promise<Wishlist> => {
  const existing = await prisma.wishlist.findUnique({
    where: {
      userId_listingId: {
        userId,
        listingId: productId,
      },
    },
  });

  if (existing) {
    return existing;
  }

  // if not, create the wishlist entry
  const wishlistItem: Wishlist = await prisma.wishlist.create({
    data: {
      userId,
      listingId: productId,
      createdAt: new Date(),
    },
  });

  return wishlistItem;
};

export const removeFromWishlist = async ({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}): Promise<Number> => {
  // when use delete the wishlist that matches the where key/value pairs, if not found, will throw error: An operation failed because it depends on one or more records that were required but not found. No record was found for a delete. (Code: P2025)
  // so we use deleteMany which will just return count of deleted records
  const result = await prisma.wishlist.deleteMany({
    where: {
      userId,
      listingId: productId,
    },
  });

  return result.count;
};
