"use client"

import { useEffect } from "react"
import { ProductCardProps } from "@/features/products/types/product.types"
import { addRecentlyViewedProduct } from "../utils/indexedDb"

const RecentlyViewedTracker = ({ product }: { product: ProductCardProps }) => {
    useEffect(() => {
        if (product && product.id) {
            addRecentlyViewedProduct(product);
        }
    }, [product]);

    return null;
}

export default RecentlyViewedTracker