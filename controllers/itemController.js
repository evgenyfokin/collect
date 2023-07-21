import ItemModel from "../models/Item.js";
import mongoose from "mongoose";

export const getOne = async (req, res) => {
    try {
        const itemId = req.params.id
        const item = await ItemModel.findById(itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const create = async (req, res) => {
    const doc = new ItemModel(req.body);
    try {
        const item = await doc.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const itemId = req.params.id
        const item = await ItemModel.findByIdAndUpdate(itemId, req.body, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const itemId = req.params.id;
        const removedItem = await ItemModel.findByIdAndDelete(itemId);
        if (!removedItem) {
            return res.status(404).json({
                message: "Here is nothing to remove"
            });
        }
        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Failed to remove the item"
        });
    }
}


export const like = async (req, res) => {
    try {
        const doc = await ItemModel.findById(req.params.id);
        if (!doc) return res.status(404).json({ message: 'Item not found' });

        if (doc.likes.includes(req.userId)) return res.status(400).json({ message: 'You have already liked this item.' });

        doc.likes.push(req.userId);
        await doc.save();

        res.json(doc);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};