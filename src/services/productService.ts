import type { Product } from "../types/productModel";
import * as productRepo from "../apis/product/productRepo";

export async function fetchAllProducts() {
  const products: Product[] = await productRepo.fetchAllProducts();
  return products;
}

export async function toggleWishedProduct({
  productId,
}: {
  productId: number;
}) {
  await productRepo.toggleWishedProduct(productId);
}

export function addReview({
  productId,
  comment,
}: {
  productId: number;
  comment: string;
}) {
  productRepo.addReview({ productId, comment });
}
