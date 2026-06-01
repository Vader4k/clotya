import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useUpdateParams } from "@/features/products/hooks/useUpdateParams";
import { useDebounce } from "@/features/search/hooks/Debounce";

export const useBlogFilters = () => {
    const searchParams = useSearchParams();
    const updateParams = useUpdateParams();
    
    // Search Term State
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Sync state with URL (e.g. if back button is pressed)
    useEffect(() => {
        setSearchTerm(searchParams.get("search") || "");
    }, [searchParams]);

    // Handle Search Updates
    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        if (debouncedSearchTerm !== currentSearch) {
            updateParams({ search: debouncedSearchTerm || null });
        }
    }, [debouncedSearchTerm, searchParams, updateParams]);

    const setFilter = useCallback((key: string, value: string | null) => {
        updateParams({ [key]: value });
    }, [updateParams]);

    const clearSearch = useCallback(() => {
        setSearchTerm("");
        updateParams({ search: null });
    }, [updateParams]);

    return {
        searchTerm,
        setSearchTerm,
        setFilter,
        clearSearch,
        filters: {
            category: searchParams.get("category"),
            tag: searchParams.get("tag"),
        }
    };
};
