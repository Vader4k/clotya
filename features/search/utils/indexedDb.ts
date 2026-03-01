import { ProductCardProps } from "@/features/products/types/product.types";

const DB_NAME = "shop_search_cache";
const STORE_NAME = "search_results";
const DB_VERSION = 1;

// Helper to open the db
const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "query" });
            }
        };
        request.onsuccess = (event) => {
            resolve((event.target as IDBOpenDBRequest).result);
        };
        request.onerror = (event) => {
            reject((event.target as IDBOpenDBRequest).error);
        };
    });
};

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
