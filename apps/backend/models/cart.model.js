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
            unique: true,
            default: null
        },
        items: [cartItemSchema]
    },
    { timestamps: true }
)

cartSchema.index({ user: 1, cartId: 1 }, { unique: true })

export const Cart = mongoose.model("Cart", cartSchema);
