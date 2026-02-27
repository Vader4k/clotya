"use client"

import { useEffect } from "react"
import { addRecentlyViewed } from "./add-recently-viewed"

const RecentlyViewedTracker = ({ productId }: { productId: string }) => {
    useEffect(() => {
        if (productId) {
            addRecentlyViewed(productId);
        }
    }, [productId]);

    return null;
}

export default RecentlyViewedTracker