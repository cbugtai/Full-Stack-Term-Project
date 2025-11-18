import type { Product } from "../../../../shared/types/frontend-product";
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
  const wishlishedProducts: Product[] = await productRepo.fetchWishlist();
  return wishlishedProducts;
}

export async function toggleWishedProduct(productId: number) {
  // check if the product is already wishlisted
  const product: Product = await productRepo.fetchProductById(productId);

  if (product.isWishlisted) {
    await productRepo.removeFromWishlist(productId);
  } else {
    await productRepo.addToWishlist(productId);
  }
}
