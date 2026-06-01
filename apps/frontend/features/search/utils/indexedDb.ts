import { ProductCardProps } from "@/features/products/types/product.types";
import { openDb } from "@/lib/indexedDb";

const STORE_NAME = "search_results";

export const getCachedSearchResults = async (query: string): Promise<ProductCardProps[] | null> => {
    try {
        const db = await openDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(query);

            request.onsuccess = () => {
                const result = request.result;
                if (result) {
                    // Check if cache is still valid (e.g., 24 hours TTL)
                    const isExpired = Date.now() - result.timestamp > 24 * 60 * 60 * 1000;
                    if (isExpired) {
                        resolve(null);
                    } else {
                        resolve(result.data);
                    }
                } else {
                    resolve(null);
                }
            };
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.error("IndexedDB get error:", e);
        return null;
    }
};

export const cacheSearchResults = async (query: string, data: ProductCardProps[]) => {
    try {
        const db = await openDb();
        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put({
                query,
                data,
                timestamp: Date.now()
            });

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.error("IndexedDB set error:", e);
    }
};
