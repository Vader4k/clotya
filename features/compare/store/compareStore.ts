import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CompareProduct, CompareState } from "../types/compare.types";

const storage = createJSONStorage(() => {
    if(typeof window === 'undefined'){
        return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
            isInCompare: () => false,
            clearProducts: () => {},
        }
    }
    return localStorage;
})

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
            storage, // use the SSR-safe storage
        }
    )
)