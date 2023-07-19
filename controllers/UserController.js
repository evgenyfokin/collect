import {validationResult} from "express-validator";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: await bcrypt.hash(req.body.password, 10)
        })

        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'Netflix2024', {
            expiresIn: '30d'
        })
        const {passwordHash, ...userData} = user._doc

        res.json({...userData, token})
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).json({
                message: "Wrong login or password"
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        if (!isValidPass) {
            return res.status(403).json({
                message: "Wrong login or password"
            })
        }
        const token = jwt.sign({
                _id: user._id
            }, 'Netflix2024',
            {expiresIn: '30d'}
        )
        const {passwordHash, ...userData} = user._doc
        res.json({
            ...userData,
            token
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({
            message: err.message
        })
    }
}
export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
        if (!user) {
            res.status(404).json({
                message: "User is not found"
            })
        }
        const {passwordHash, ...userData} = user._doc
        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: "Access is denied"
        });
    }
}