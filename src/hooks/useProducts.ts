import { useEffect, useState } from "react";
import * as productService from "../services/productService";
import type { Product } from "../types/productModel";

export function useProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>();

  const fetchAllProducts = async () => {
    try {
      const result: Product[] = await productService.fetchAllProducts();
      setAllProducts(result);
    } catch (errorObject) {
      // set the error state to the error object if an error is caught
      setError(`${errorObject}`);
    }
  };

  const toggleWishedProduct = async (productId: number) => {
    try {
      await productService.toggleWishedProduct({ productId });

      await fetchAllProducts();
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
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return {
    allProducts,
    error,
    toggleWishedProduct,
    addReview,
  };
}
