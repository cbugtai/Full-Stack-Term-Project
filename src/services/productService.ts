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

export async function addReview({
  productId,
  comment,
}: {
  productId: number;
  comment: string;
}) {
  await productRepo.addReview({ productId, comment });
}
