import Image from "next/image"

const MiniCart = () => {

    const cart = []

  return (
    <div>
        {cart.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-5">
                <Image src="/empty-cart.svg" alt="empty-cart-image" width={80} height={80} unoptimized/>
                <p className="text-sm font-jost">No product in the cart.</p>
            </div>
        ) : (
            <p>Your cart is not empty</p>
        )}
    </div>
  )
}

export default MiniCart