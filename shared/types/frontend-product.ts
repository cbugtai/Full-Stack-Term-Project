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
  reviews?: Reviews[];
};

export type Reviews = {
  productId: string;
  userName: string;
  comment: string;
  createdAt: Date;
};
