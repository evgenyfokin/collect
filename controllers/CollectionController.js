import CollectionModel from "../models/Collection.js";

export const getAll = async (req, res) => {
    try {
        const collections = await CollectionModel.find().populate('user').exec()
        res.json(collections)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to get collections"
        })
    }
}
export const getOne = async (req, res) => {
    try {
        const collectionId = req.params.id
        const collection = await CollectionModel.findById(collectionId)
        if (!collection) {
            return res.status(404).json({
                message: "Collection deleted or never existed"
            })
        }
        res.json(collection)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to get the collection"
        })
    }
}
export const remove = async (req, res) => {
    try {
        const collectionId = req.params.id
        const removedCollection = await CollectionModel.findOneAndDelete({_id: collectionId})
        if (!removedCollection) {
            return res.status(404).json({
                message: "Here is nothing to remove"
            })
        }
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to remove the collection"
        })
    }
}
export const create = async (req, res) => {
    try {
        const doc = new CollectionModel({
            title: req.body.title,
            desc: req.body.desc,
            imageUrl: req.body.imageUrl,
            user: req.userId
        });
        const collection = await doc.save()
        res.json(collection)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}
export const update = async (req, res) => {
    try {
        const collectionId = req.params.id
        await CollectionModel.updateOne({
            _id: collectionId,
        }, {
            title: req.body.title,
            desc: req.body.desc,
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })
        res.json({
            success: true
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Failed to update the collection"
        })
    }
}