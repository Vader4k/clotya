import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    details: {
        type: String,
        required: true
    },
    image: String,
    categories: [{
        type: String,
        required: true
    }],
    tags: [{
        type: String,
    }],
    intro: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

blogSchema.index({ title: "text", intro: "text" })
blogSchema.index({ categories: 1 })
blogSchema.index({ tags: 1 })
blogSchema.index({ views: -1 })

export const Blog = mongoose.model("Blog", blogSchema);