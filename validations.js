import {body} from "express-validator";

export const loginValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'password must be longer than 5 characters').isLength({min: 5})
]
export const registerValidation = [
    body('email', 'Invalid mail format').isEmail(),
    body('password', 'password must be longer than 5 characters').isLength({min: 5}),
    body('fullName', 'Enter a name').isLength({min: 3}),
    body('avatarUrl', 'Invalid avatar link').optional().isURL()
]

export const collectionCreateValidation = [
    body('title', "Enter article title").isLength({min: 3}).isString(),
    body('desc', "Enter article description").isLength({min: 10}).isString(),
    // body('imageUrl', "Неверная ссылка на изображение").optional().isString(),
]
