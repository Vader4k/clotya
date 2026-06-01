export type CompareProduct = {
    _id: string;
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
    removeProduct: (_id: string) => void;
    isInCompare: (_id: string) => boolean;
    clearProducts: () => void;
}