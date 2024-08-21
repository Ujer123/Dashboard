import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        variants: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        isArchived: { // Corrected the typo here
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
