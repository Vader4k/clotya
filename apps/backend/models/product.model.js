import mongoose from "mongoose";

const validSizes = ["s", "m", "l", "xl", "xxl"];

const inventorySchema = new mongoose.Schema({
    size: { type: String, required: true, enum: validSizes },
    quantity: { type: Number, required: true }
})

const colorSchema = new mongoose.Schema({
    name: String,
    hex: String
})

const productSchema = new mongoose.Schema(
    {
        slug: { type: String, unique: true, required: true },
        sku: { type: String, unique: true, required: true },

        name: { type: String, required: true },

        tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

        description: { type: String, required: true },
        shortDescription: { type: String, required: true },

        price: { type: Number, required: true },
        discountPrice: { type: Number, default: null },
        discountPercentage: { type: Number, default: null },

        images: [String],

        isDiscount: { type: Boolean, default: false },
        isBestSeller: { type: Boolean, default: false },
        isFeatured: { type: Boolean, default: false },
        isNewArrival: { type: Boolean, default: false },
        isTrending: { type: Boolean, default: false },
        sold: { type: Number, default: 0 },

        inventory: [inventorySchema],
        colors: [colorSchema],

        rating: {
            average: { type: Number, default: 0 },
            count: { type: Number, default: 0 }
        },

        category: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],

    },
    { timestamps: true }
)

// Text search index
productSchema.index({ name: 'text', description: 'text', shortDescription: 'text' });

// Query optimization indexes
productSchema.index({ category: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ "colors.name": 1 });
productSchema.index({ price: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isNewArrival: 1 });
productSchema.index({ isTrending: 1 });
productSchema.index({ sold: -1 });
productSchema.index({ createdAt: -1 });

export const Product = mongoose.model("Product", productSchema);