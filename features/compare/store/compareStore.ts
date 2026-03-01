import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CompareProduct } from "../types/compare.types";

interface CompareState {
    products: CompareProduct[];
    addProduct: (product: CompareProduct) => void;
    removeProduct: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearProducts: () => void;
}

export const useCompareStore = create<CompareState>()(
    persist(
        (set, get) => ({
            products: [],
            addProduct: (product: CompareProduct) => {
                if(get().products.find(i => i.slug === product.slug)) return;
                set((state) => ({
                    products: [...state.products, product]
                }))
            },
            removeProduct: (id: string) => set((state) => ({
                products: state.products.filter((product) => product.id !== id)
            })),
            isInCompare: (id) => {
                return !!get().products.find(i => i.id === id)
            },
            clearProducts: () => set({ products: [] })
        }),
        {
            name: "compare-storage",
        }
    )
)