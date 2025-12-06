import type { ListingReview } from "./listingReviewModel";
import type { Category, Condition, Brand } from "@prisma/client";

export type ListingWithRelations = {
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

  category: Category;   // use `category.category` for display
  condition: Condition; // use `condition.condition` for display
  brand: Brand;         // use `brand.brand` for display
};