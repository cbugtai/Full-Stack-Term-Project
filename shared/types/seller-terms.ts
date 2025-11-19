export type SellerDto = {
  id: number;
  username: string;
  rating: number;
  completedSales: number;
  photo?: string
  isFavorite: boolean;
  isBlocked: boolean;
};