import { useQuery } from '@tanstack/react-query'
import { productServices } from '../services/product.service'
import { QUERIES } from '@/queries/queries'

export const useGetProductsByCategory = (category: string) => {
    return useQuery({
        queryKey: [QUERIES.public.products.GET_BY_CATEGORY, category],
        queryFn: () => productServices.getByCategory(category),
        enabled: !!category,
        retry: 1,
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
