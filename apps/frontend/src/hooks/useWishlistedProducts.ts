import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import * as reviewService from "../services/reviewService";
import type {
  Product,
  ProductsRes,
} from "../../../../shared/types/frontend-product";
import { useLoading } from "./useLoading";
import { usePagination } from "./usePagination";

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
  const { page, setPage, maxPage, setMaxPage, pageSize } = usePagination(6);
  // console.log("useAllProducts hook invoked, pagesize:", pageSize);

  const fetchWishlistedProducts = async () => {
    try {
      start();
      const result: ProductsRes = await productService.fetchWishlistedProducts(
        page,
        pageSize
      );
      // if the current page exceeds max page after deletion, set to max page
      if (result.meta.totalPages < page) {
        setPage(result.meta.totalPages);
      }
      setMaxPage(result.meta.totalPages);
      setWishlistedProducts(result.products);
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
      await reviewService.addReview({ productId, comment });
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
  }, [page]);

  return {
    wishlistedProducts,
    error,
    toggleWishedProduct,
    addReview,
    loading,
    page,
    setPage,
    maxPage,
  };
}
