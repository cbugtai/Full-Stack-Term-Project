import type {
  Product,
  ProductsRes,
} from "../../../../../shared/types/frontend-product";
type ProductsResponseJSON = {
  message: string;
  data: ProductsRes;
  status: "success";
};
type ErrResponseJSON = { message: string; code: string; status: "error" };
type ProductResponseJSON = { message: string; data: Product };

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const PRODUCT_ENDPOINT = "/products";
const WISHLIST_ENDPOINT = "/products/wishlist";

export async function fetchAllProducts(
  page?: number,
  pageSize?: number
): Promise<ProductsRes> {
  const url = new URL(`${BASE_URL}${PRODUCT_ENDPOINT}`);

  if (page !== undefined) url.searchParams.set("page", String(page));
  if (pageSize !== undefined)
    url.searchParams.set("pageSize", String(pageSize));

  const productResponse: Response = await fetch(url.toString());

  // if the server is unreachable, the json parsing will fail
  let json: ProductsResponseJSON | ErrResponseJSON;
  try {
    json = await productResponse.json();
  } catch (e) {
    throw new Error(`SERVER_UNREACHABLE, ${e}`);
  }

  // if the response indicates there is an error, throw an error
  if (json.status === "error") {
    const error = new Error(`${json.message}`) as Error & { code: string };
    error.code = json.code;
    throw error;
  }

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

export async function fetchWishlist(
  page?: number,
  pageSize?: number
): Promise<ProductsRes> {
  const url = new URL(`${BASE_URL}${WISHLIST_ENDPOINT}`);

  if (page !== undefined) url.searchParams.set("page", String(page));
  if (pageSize !== undefined)
    url.searchParams.set("pageSize", String(pageSize));

  const wishlistResponse: Response = await fetch(url.toString());

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
