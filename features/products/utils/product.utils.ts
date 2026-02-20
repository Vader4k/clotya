export const progressValue = ({ inventory, sold }: { inventory: { size: string; quantity: number }[], sold: number }) => {
  return (sold / inventory.reduce((acc, item) => acc + item.quantity, 0)) * 100
}