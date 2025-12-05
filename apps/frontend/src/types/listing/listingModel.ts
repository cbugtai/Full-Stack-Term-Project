import type { ListingReview } from "./listingReviewModel";

export type Listing = {
    id: number;
    sellerId: number;
    title: string;
    description: string;
    categoryId: number;
    conditionId: number;
    price: number;
    isWishlisted: boolean;
    createdAt: string;
    statusId: number;
    imageUrl?: string;
    views?: number;
    city?: string;
    isNegotiable?: boolean;
    isFree?: boolean;
    updatedAt?: string;
    brandId?: number;
    reviews?: ListingReview[];
};