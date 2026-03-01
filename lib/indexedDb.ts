const DB_NAME = "shop_cache_db";
const DB_VERSION = 1;

export const openDb = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            // Create store for search results if it doesn't exist
            if (!db.objectStoreNames.contains("search_results")) {
                db.createObjectStore("search_results", { keyPath: "query" });
            }
            // Create store for recently viewed products if it doesn't exist
            if (!db.objectStoreNames.contains("recently_viewed")) {
                db.createObjectStore("recently_viewed", { keyPath: "id" });
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
