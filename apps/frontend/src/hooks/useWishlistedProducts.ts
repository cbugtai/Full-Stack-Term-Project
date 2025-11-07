import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import type { Product } from "../types/productModel";
import { useLoading } from "./useLoading";

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

export function useWishlistedProducts() {
  const [wishlistedProducts, setWishlistedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, start, stop } = useLoading();

  const fetchWishlistedProducts = async () => {
    try {
      start();
      const result: Product[] = await productService.fetchWishlistedProducts();
      setWishlistedProducts(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    } finally {
      stop();
    }
  };

  const toggleWishedProduct = async (productId: number) => {
    try {
      start();
      await productService.toggleWishedProduct({ productId });
      await fetchWishlistedProducts();
    } catch (errorObject) {
      setError(`${errorObject}`);
    } finally {
      stop();
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
      start();
      await productService.addReview({ productId, comment });
      await fetchWishlistedProducts();
    } catch (errorObject) {
      setError(`${errorObject}`);
    } finally {
      stop();
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        start();
        await fetchWishlistedProducts();
      } catch (errorObject) {
        setError(String(errorObject));
      } finally {
        stop();
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    wishlistedProducts,
    error,
    toggleWishedProduct,
    addReview,
    loading,
  };
}
