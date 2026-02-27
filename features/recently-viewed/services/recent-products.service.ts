
import { allProducts, Product } from "@/data/products";

export const recentProducts = {
    getAll(ids: string[]): Promise<Product[]> {
        return Promise.resolve(allProducts.filter(product => ids.includes(product.id)));
    }
}