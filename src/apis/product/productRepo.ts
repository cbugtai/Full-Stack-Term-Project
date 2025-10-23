import type { Product } from "../../types/productModel";
import { mockProductData } from "./mockProductData";
import { v4 as uuidv4 } from "uuid";

export async function fetchAllProducts(): Promise<Product[]> {
  return [...mockProductData];
}

export async function toggleWishedProduct(productId: number) {
  const foundProduct = mockProductData.find((t) => t.id === productId);

  if (!foundProduct) {
    throw new Error(`Failed to fetch productId with ${productId}`);
  } else {
    foundProduct.isWishlisted = !foundProduct.isWishlisted;
  }

  return foundProduct;
}

export async function addReview({
  productId,
  comment,
}: {
  productId: number;
  comment: string;
}) {
  const foundProduct = mockProductData.find((t) => t.id === productId);

  if (!foundProduct) {
    throw new Error(`Failed to fetch productId with ${productId}`);
  } else {
    foundProduct.reviews = [
      ...(foundProduct.reviews ?? []),
      {
        id: uuidv4(),
        user: "Anonymous User",
        comment: comment,
      },
    ];
  }

  return foundProduct;
}
