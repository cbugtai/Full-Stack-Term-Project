export type SellerDto = {
  id: number;
  username: string;
  rating: number;
  completedSales: number;
  photo?: string
  isFavorite: boolean;
  isBlocked: boolean;
};

export type SellersPageDto = {
  sellers: SellerDto[];
    meta: {
      page: number;
      pageSize: number;
      totalCount: number;
      totalPages: number;
    };
}