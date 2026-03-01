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