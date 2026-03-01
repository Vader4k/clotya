import { ProductCardProps } from "@/features/products/types/product.types";
import { openDb } from "@/lib/indexedDb";

const STORE_NAME = "recently_viewed";
const MAX_RECENT_PRODUCTS = 6;

export const addRecentlyViewedProduct = async (product: ProductCardProps): Promise<void> => {
    try {
        const db = await openDb();
        return new Promise<void>((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readwrite");
            const store = transaction.objectStore(STORE_NAME);

            // First, get all existing products to manage the list size
            const getAllRequest = store.getAll();

            getAllRequest.onsuccess = () => {
                let products = getAllRequest.result as (ProductCardProps & { timestamp: number })[];

                // Remove the product if it already exists (so it can be moved to the top)
                products = products.filter(p => p.id !== product.id);

                // Add the new product with a timestamp
                products.unshift({
                    ...product,
                    timestamp: Date.now()
                });

                // Keep only the most recent MAX_RECENT_PRODUCTS
                if (products.length > MAX_RECENT_PRODUCTS) {
                    const toDelete = products.slice(MAX_RECENT_PRODUCTS);
                    toDelete.forEach((p) => {
                        store.delete(p.id);
                    });
                }

                // Add or update the new product
                const putRequest = store.put(products[0]);

                putRequest.onsuccess = () => resolve();
                putRequest.onerror = () => reject(putRequest.error);
            };

            getAllRequest.onerror = () => reject(getAllRequest.error);
        });
    } catch (e) {
        console.error("IndexedDB addRecentlyViewedProduct error:", e);
    }
};

export const getRecentlyViewedProducts = async (): Promise<ProductCardProps[]> => {
    try {
        const db = await openDb();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result as (ProductCardProps & { timestamp: number })[];
                // Sort by timestamp descending (most recent first)
                results.sort((a, b) => b.timestamp - a.timestamp);

                // We map to remove the timestamp property before returning
                const products: ProductCardProps[] = results.map(({ timestamp, ...product }) => product as ProductCardProps);
                resolve(products);
            };
            request.onerror = () => reject(request.error);
        });
    } catch (e) {
        console.error("IndexedDB getRecentlyViewedProducts error:", e);
        return [];
    }
};
