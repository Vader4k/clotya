import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        streetAddress: { type: String },
        apartment: { type: String },
        city: { type: String },
        state: { type: String },
        postalCode: { type: String },
        country: { type: String },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        phone: { type: String },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export const User = mongoose.model('User', userSchema)