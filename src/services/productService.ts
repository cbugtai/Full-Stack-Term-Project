import type { Product } from "../types/productModel";
import * as productRepo from "../apis/product/productRepo";

/**
 * productService Service
 * ---------------------
 * HOW:
 * - this service is for bussiness logic handling for product.
 *
 * WHY:
 * - if the businees logic changes, just maintain this layer service, make sure the
 *   repo layer and hook layer independently.
 *
 */

export async function fetchAllProducts() {
  const products: Product[] = await productRepo.fetchAllProducts();
  return products;
}

export async function fetchWishlistedProducts() {
  const products: Product[] = await productRepo.fetchAllProducts();
  const wishlishedProducts: Product[] = products.filter(
    (product) => product.isWishlisted
  );
  return wishlishedProducts;
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
