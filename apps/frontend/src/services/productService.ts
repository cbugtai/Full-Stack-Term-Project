import type {
  Product,
  ProductsRes,
} from "../../../../shared/types/frontend-product";
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

export async function fetchAllProducts(
  page?: number,
  pageSize?: number,
  sessionToken?: string | null
) {
  const products: ProductsRes = await productRepo.fetchAllProducts(
    page,
    pageSize,
    sessionToken
  );
  return products;
}

export async function fetchWishlistedProducts(
  sessionToken: string,
  page?: number,
  pageSize?: number
) {
  const wishlishedProducts: ProductsRes = await productRepo.fetchWishlist(
    sessionToken,
    page,
    pageSize
  );
  return wishlishedProducts;
}

export async function toggleWishedProduct(
  sessionToken: string,
  productId: number
) {
  // check if the product is already wishlisted
  const product: Product = await productRepo.fetchProductById(productId);

  if (product.isWishlisted) {
    await productRepo.removeFromWishlist(sessionToken, productId);
  } else {
    await productRepo.addToWishlist(sessionToken, productId);
  }
}
