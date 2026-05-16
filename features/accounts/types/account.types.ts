
type Item = {
    color: string | null,
    image: string,
    name: string,
    price: number,
    quantity: number,
    size: number,
    sku: string
}

export type UserOrderType = {
    createdAt: string,
    isDelivered: boolean,
    isPaid: boolean,
    itemPrice: number,
    orderNumber: string,
    paidAt: string,
    shipmentType: string,
    paymentType: string,
    shippingPrice: number,
    totalPrice: number
    items: Item[]
}