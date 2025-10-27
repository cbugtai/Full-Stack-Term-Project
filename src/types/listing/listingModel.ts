import type { Category } from "./catagory";
import type { Condition } from "./condition";
import type { ListingReview } from "./listingReviewModel";

export type Listing = {
    id: string;
    userId: string;
    title: string;
    description: string;
    category: Category;
    condition: Condition;
    price: number;
    isWishlisted: boolean;
    createdAt: string;
    status: "active" | "sold";
    imageUrl?: string;
    views?: number;
    city?: string;
    isNegotiable?: boolean;
    isFree?: boolean;
    updatedAt?: string;
    brand?: string;
    reviews?: ListingReview[];
};