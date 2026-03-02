export type CompareProduct = {
    id: string;
    name: string;
    image: string;
    rating: number;
    slug: string;
    price: number;
    discountPrice?: number;
}

export type CompareModalProps = {
    isOpen: boolean
    onClose: () => void
    productName: string
    isDuplicate: boolean
}

export interface CompareState {
    products: CompareProduct[];
    addProduct: (product: CompareProduct) => void;
    removeProduct: (id: string) => void;
    isInCompare: (id: string) => boolean;
    clearProducts: () => void;
}