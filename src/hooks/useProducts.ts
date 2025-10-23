import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import type { Product } from "../types/productModel";

/**
 * userProducts Hook
 * ---------------------
 * HOW:
 * - this hook uses the productService to fetch and manage product data.
 *
 * WHY:
 * - to encapsulate product-related logic and state management, making it reusable across components.
 *
 */

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchAllProducts = async () => {
    try {
      const result: Product[] = await productService.fetchAllProducts();
      setAllProducts(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  const fetchWishlistedProducts = async () => {
    try {
      const result: Product[] = await productService.fetchWishlistedProducts();
      setWishlistedProducts(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  const toggleWishedProduct = async (productId: number) => {
    try {
      await productService.toggleWishedProduct({ productId });
      await fetchAllProducts();
      await fetchWishlistedProducts();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  const addReview = async ({
    productId,
    comment,
  }: {
    productId: number;
    comment: string;
  }) => {
    try {
      await productService.addReview({ productId, comment });
      await fetchAllProducts();
      await fetchWishlistedProducts();
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchWishlistedProducts();
  }, []);

  return {
    allProducts,
    wishlistedProducts,
    error,
    toggleWishedProduct,
    addReview,
  };
}
