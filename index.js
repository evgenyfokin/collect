import express from 'express'
import mongoose from "mongoose";
import {loginValidation, registerValidation} from "./validations.js";
import checkAuth from "./utils/auth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import cors from "cors";
import { createProxyMiddleware } from 'http-proxy-middleware';

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB CONNECTED')
    })
    .catch((err) => {
        console.log("DB IS FAILED", err)
    })

const app = express()

app.use(cors({
    origin: 'https://ireact-pi.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: 'include',
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.post('/auth/register', registerValidation, register)
app.post('/auth/login', loginValidation, login)
app.get('/auth/me', checkAuth, getMe)

app.use('/api', createProxyMiddleware({
    target: 'https://fokin-collections-80e49a476c50.herokuapp.com', // Здесь ваша целевая ссылка
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // убираем /api из пути запроса
    },
}));

app.use(function(err, req, res, next) {
    console.error(err.stack); // Логирует стек вызова ошибки
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3004

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("DB IS RUNNING")
})