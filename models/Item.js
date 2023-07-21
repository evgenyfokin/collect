import mongoose from "mongoose";

const ItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: String,
    tags: [{type: String}],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    parentCollection: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Item', ItemSchema);