import express from 'express'
import mongoose from "mongoose";
import {loginValidation, registerValidation} from "./validations.js";
import checkAuth from "./utils/auth.js";
import {getMe, login, register} from "./controllers/UserController.js";


mongoose.connect(process.env.MONGODB_URI ||
    'mongodb+srv://admin:Netflix2024@cluster0.fknd4ao.mongodb.net/collections?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB IS CONNECTED')
    })
    .catch((err) => {
        console.log("DB IS FAILED", err)
    })
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4444
app.get('/', (req, res) => {
    res.send("Hello world!")
})


app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)


app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("DB IS RUNNING")
})