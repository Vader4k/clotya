import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    sku: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
    }
})

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },
        cartId: {
            type: String,
            default: null
        },
        items: [cartItemSchema]
    },
    { timestamps: true }
)

// Only enforce uniqueness on cartId when it actually has a value (guest carts)
cartSchema.index(
    { cartId: 1 },
    { unique: true, partialFilterExpression: { cartId: { $type: "string" } } }
)
// Only enforce uniqueness on user when it actually has a value (logged-in carts)
cartSchema.index(
    { user: 1 },
    { unique: true, partialFilterExpression: { user: { $exists: true, $ne: null } } }
)

export const Cart = mongoose.model("Cart", cartSchema);
