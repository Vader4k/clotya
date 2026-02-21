import { useQuery } from '@tanstack/react-query'
import { productServices } from '../services/product.service'

export const useGetProductsByCategory = (category: string) => {
    return useQuery({
        queryKey: ['products', category],
        queryFn: () => productServices.getByCategory(category),
        enabled: !!category,
        placeholderData: (previousData) => previousData,
    })
}

export const useGetProductsBySearch = (search: string) => {
    return useQuery({
        queryKey: ['products', search],
        queryFn: () => productServices.getBySearch(search),
        enabled: !!search,
    })
}

export const useGetProductsByPrice = (price: number) => {
    return useQuery({
        queryKey: ['products', price],
        queryFn: () => productServices.getByPrice(price),
        enabled: !!price,
    })
}
