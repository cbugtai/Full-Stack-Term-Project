import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
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

export function useAllProducts() {
  const { getToken, isSignedIn } = useAuth();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { loading, start, stop } = useLoading();
  const { page, setPage, maxPage, setMaxPage, pageSize } = usePagination(12);
  // console.log("useAllProducts hook invoked, pagesize:", pageSize);

  const fetchAllProducts = async () => {
    try {
      const sessionToken = isSignedIn ? await getToken() : null;
      // console.log("sessionToken in fetchAllProducts:", sessionToken);
      const result: ProductsRes = await productService.fetchAllProducts(
        page,
        pageSize,
        sessionToken
      );
      setMaxPage(result.meta.totalPages);
      setAllProducts(result.products);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  const toggleWishedProduct = async (productId: number) => {
    try {
      start();
      const sessionToken = isSignedIn ? await getToken() : null;

      if (!sessionToken) {
        throw new Error("Not Authorized");
      }
      await productService.toggleWishedProduct(sessionToken, productId);
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
      const sessionToken = isSignedIn ? await getToken() : null;

      if (!sessionToken) {
        throw new Error("Not Authorized");
      }
      await reviewService.addReview({ sessionToken, productId, comment });
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
