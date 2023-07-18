import {body} from "express-validator";

export const registerValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 40}),
    body('fullName').isLength({min: 2, max: 40}),
    body('avatarUrl').optional().isURL(),
]

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 40})
]