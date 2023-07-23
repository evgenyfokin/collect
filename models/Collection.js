import mongoose from "mongoose";

const CollectionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    imageUrl: String,
    tags: {
        type: Array,
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Collection', CollectionSchema);