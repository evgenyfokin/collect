import express from 'express'
import mongoose from "mongoose";
import {loginValidation, registerValidation} from "./validations.js";
import checkAuth from "./utils/auth.js";
import {getMe, login, register} from "./controllers/UserController.js";
// 'mongodb+srv://admin:Netflix2024@cluster0.fknd4ao.mongodb.net/collections?retryWrites=true&w=majority'
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB CONNECTED')
    })
    .catch((err) => {
        console.log("DB IS FAILED", err)
    })
const app = express()
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://ireact-ten.vercel.app");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    next();
});
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