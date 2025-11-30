import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import * as reviewService from "../services/reviewService";
import type {
  Product,
  ProductsRes,
} from "../../../../shared/types/frontend-product";
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

export function useAllProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, start, stop } = useLoading();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const pageSize = 12;

  const fetchAllProducts = async () => {
    try {
      start();
      const result: ProductsRes = await productService.fetchAllProducts(
        page,
        pageSize
      );
      setMaxPage(result.meta.totalPages);
      setAllProducts(result.products);
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
      await productService.toggleWishedProduct(productId);
      await fetchAllProducts();
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
      await reviewService.addReview({ productId, comment });
      await fetchAllProducts();
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
        await fetchAllProducts();
      } catch (errorObject) {
        setError(String(errorObject));
      } finally {
        stop();
      }
    };

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return {
    allProducts,
    error,
    toggleWishedProduct,
    addReview,
    loading,
    page,
    setPage,
    maxPage,
  };
}
