"use client";

import { useEffect, useState } from "react";
import { ProductCardProps } from "@/features/products/types/product.types";
import { getRecentlyViewedProducts } from "../utils/indexedDb";

export const useGetRecentlyViewedProducts = () => {
    const [products, setProducts] = useState<ProductCardProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const result = await getRecentlyViewedProducts();
                setProducts(result);
            } catch (error) {
                console.error("Failed to get recently viewed products:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { products, isLoading };
};
