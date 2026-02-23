export const progressValue = ({ inventory, sold }: { inventory: { size: string; quantity: number }[], sold: number }) => {
  return (sold / inventory.reduce((acc, item) => acc + item.quantity, 0)) * 100
}

export const normalizeParams = (
  params: Record<string, string | string[] | undefined>
) => {
  return {
    category:
      typeof params.category === "string" ? params.category : undefined,

    color:
      typeof params.color === "string" ? params.color : undefined,

    size:
      typeof params.size === "string" ? params.size : undefined,

    page:
      typeof params.page === "string" && !isNaN(Number(params.page))
        ? Number(params.page)
        : 1,

    min_price:
      typeof params.min_price === "string"
        ? Number(params.min_price)
        : undefined,

    max_price:
      typeof params.max_price === "string"
        ? Number(params.max_price)
        : undefined,
  }
}