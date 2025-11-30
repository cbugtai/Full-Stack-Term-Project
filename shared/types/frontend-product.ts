export type Product = {
  id: number;
  description: string;
  category: string;
  brand: string;
  condition: string;
  price: number;
  originalPrice: number;
  imgUrl: string;
  isWishlisted: boolean;
  hasReviewed: boolean;
  reviews?: Review[];
};

export type ProductsRes = {
  products: Product[];
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
  };
};

export type Review = {
  id: number;
  userId: number;
  productId: number;
  productDescription: string;
  userName: string;
  comment: string;
  createdAt: Date;
};
