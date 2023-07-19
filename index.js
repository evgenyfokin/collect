import express from 'express'
import mongoose from "mongoose";
import {loginValidation, registerValidation} from "./validations.js";
import checkAuth from "./utils/auth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import cors from 'cors'

mongoose.connect(process.env.MONGODB_URI ||
    'mongodb+srv://admin:Netflix2024@cluster0.fknd4ao.mongodb.net/collections?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB IS CONNECTED')
    })
    .catch((err) => {
        console.log("DB IS FAILED", err)
    })
const app = express()
app.use(cors({
    origin: ['https://collectt.vercel.app'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())
const PORT = process.env.PORT || 3004
app.get('/', (req, res) => {
    res.send("Hello world!")
})


app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.use(function(err, req, res, next) {
    console.error(err.stack); // Логирует стек вызова ошибки
    res.status(500).send('Something broke!');
});

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("DB IS RUNNING")
})