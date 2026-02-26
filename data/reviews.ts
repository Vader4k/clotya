export type Review = {
    id: number;
    name: string;
    rating: number;
    date: string;
    comment: string;
}

export const reviewData: Review[] = [
    {
        id:1,
        name: 'Sarah Johnson',
        rating: 5,
        date: '2022-01-15',
        comment: 'This is a great product! I really love it.'
    },
    {
        id:2,
        name: 'Michael Smith',
        rating: 4,
        date: '2022-01-15',
        comment: 'This is a great product! I really love it.'
    },
]