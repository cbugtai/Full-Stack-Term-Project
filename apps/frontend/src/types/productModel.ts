import type { Product } from "../../../../shared/types/frontend-product";

export type NewReviewParams = {
  productId: number;
  comment: string;
};

export type ProductListParams = {
  allProducts: Product[];
  addReview: ({ productId, comment }: NewReviewParams) => void;
  toggleWishedProduct: (productId: number) => void;
};

export type ProductCardParams = {
  userId: number;
  product: Product;
  allProducts: Product[];
  addReview: ({ productId, comment }: NewReviewParams) => void;
  toggleWishedProduct: (productId: number) => void;
};

export type ReviewFillFormParams = {
  id: number;
  description: string;
  addReview: ({ productId, comment }: NewReviewParams) => void;
  closeDrawer: () => void;
};
