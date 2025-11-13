type Condition =
  | "New"
  | "Open box"
  | "Excellent"
  | "Very Good"
  | "Good"
  | "Used"
  | "For parts not working"
  | "Not Specified";
type Category =
  | "Electronics"
  | "Text Books"
  | "Furnitures"
  | "Vehicles"
  | "Clothes"
  | "Others";

export type ReviewOnProduct = {
  productId: string;
  user?: string;
  comment: string;
};

export type Product = {
  id: number;
  description: string;
  category: Category;
  brand: string;
  condition: Condition;
  inventNum: number;
  soldNum: number;
  currentPrice: number;
  originalPrice: number;
  imgUrl: string;
  isWishlisted: boolean;
  reviews?: ReviewOnProduct[];
};
