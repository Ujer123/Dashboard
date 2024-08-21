import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneno: {
            type: String,
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

const Message = mongoose.model('Message', messageSchema);

export default Message;
