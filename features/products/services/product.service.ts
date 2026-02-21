import { allProducts, type Product } from "@/data/products";

export const productServices = {
    // get all products
    getAll: async (): Promise<Product[]> => {
        return Promise.resolve(allProducts);
    },

    // get product by id
    getById: async (id: string): Promise<Product | undefined> => {
        return Promise.resolve(allProducts.find((product) => product.id === id));
    },

    // get products by category
    getByCategory: async (category: string): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.category.includes(category)),
        );
    },

    // get products by search
    getBySearch: async (search: string): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase()),
            ),
        );
    },

    // get products by price
    getByPrice: async (price: number): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.price === price),
        );
    },

    //get best seller products
    getBestSeller: async (): Promise<Product[]> => {
        return Promise.resolve(
            allProducts.filter((product) => product.isBestSeller),
        );
    },
};
