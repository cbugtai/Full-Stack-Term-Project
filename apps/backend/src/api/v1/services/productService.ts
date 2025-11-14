// this service is used for users to get the product listings
// not the service for the seller
// Use the listing type defined in prisma/schema.prisma
// initialize a prisma client if not already and use in queries here
import prisma from "../../../../prisma/client";
import { Product } from "../../../../../../shared/types/frontend-product";

export const fetchAllProducts = async (userId: number): Promise<Product[]> => {
  // get all records in the listings table
  const listings = await prisma.listings.findMany({
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
    reviews: listing.reviews.map((r) => ({
      id: r.id,
      productId: listing.id,
      userName: `${r.user.userName}`,
      comment: r.comment,
      createdAt: r.createdAt,
    })),
  }));

  return products;
};

export const getUserWishlist = async (userId: number): Promise<Product[]> => {
  const wishlistListings = await prisma.wishlist.findMany({
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
      reviews: l.reviews.map((r) => ({
        id: r.id,
        productId: l.id,
        userName: `${r.user.userName}`,
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    };
  });

  return products;
};
