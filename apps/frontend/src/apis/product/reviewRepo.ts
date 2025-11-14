import type { Review } from "../../../../../shared/types/frontend-product";
type ProductsResponseJSON = { message: string; data: Review[] };

// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const REVIEW_ENDPOINT = "/reviews";

export async function fetchReviewByProductId(
  productId: number
): Promise<Review[]> {
  const reviewResponse: Response = await fetch(
    `${BASE_URL}${REVIEW_ENDPOINT}/product/${productId}`
  );

  if (!reviewResponse.ok) {
    throw new Error(
      `Failed to fetch reviews from server for product ${productId}`
    );
  }

  const json: ProductsResponseJSON = await reviewResponse.json();
  return json.data;
}

export async function addReview({
  productId,
  comment,
}: {
  productId: number;
  comment: string;
}) {
  const addReviewResponse: Response = await fetch(
    `${BASE_URL}${REVIEW_ENDPOINT}`,
    {
      method: "CREATE",
      body: JSON.stringify({ productId, comment }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const json = await addReviewResponse.json();
  return json.data;
}
