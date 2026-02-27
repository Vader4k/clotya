"use client";

import { useEffect, useState } from "react";

export const useGetRecentlyViewedIds = () => {
    const [ids, setIds] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            setIds(JSON.parse(stored));
        }
    }, []);

    return ids;
};
