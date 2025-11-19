import type { Product } from "../../../../../shared/types/frontend-product";
type ProductsResponseJSON = { message: string; data: Product[] };
type ProductResponseJSON = { message: string; data: Product };

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const PRODUCT_ENDPOINT = "/products";
const WISHLIST_ENDPOINT = "/products/wishlist";

export async function fetchAllProducts(): Promise<Product[]> {
  const productResponse: Response = await fetch(
    `${BASE_URL}${PRODUCT_ENDPOINT}`
  );

  if (!productResponse.ok) {
    throw new Error("Failed to fetch products from server");
  }

  const json: ProductsResponseJSON = await productResponse.json();
  return json.data;
}

export async function fetchProductById(productId: number): Promise<Product> {
  const productResponse: Response = await fetch(
    `${BASE_URL}${PRODUCT_ENDPOINT}/${productId}`
  );

  if (!productResponse.ok) {
    throw new Error(
      `Failed to fetch product from server for given id ${productId}`
    );
  }

  const json: ProductResponseJSON = await productResponse.json();
  return json.data;
}

export async function fetchWishlist(): Promise<Product[]> {
  const wishlistResponse: Response = await fetch(
    `${BASE_URL}${WISHLIST_ENDPOINT}`
  );

  if (!wishlistResponse.ok) {
    throw new Error("Failed to fetch wishlist from server");
  }

  const json: ProductsResponseJSON = await wishlistResponse.json();
  return json.data;
}

export async function addToWishlist(productId: number) {
  const addToWishlistResponse: Response = await fetch(
    `${BASE_URL}${WISHLIST_ENDPOINT}`,
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await addToWishlistResponse.json();
  return json.data;
}

export async function removeFromWishlist(productId: number) {
  const addToWishlistResponse: Response = await fetch(
    `${BASE_URL}${WISHLIST_ENDPOINT}`,
    {
      method: "DELETE",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await addToWishlistResponse.json();
  return json.data;
}
