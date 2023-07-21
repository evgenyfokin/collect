import express from 'express'
import mongoose from "mongoose";
import {collectionCreateValidation, loginValidation, registerValidation} from "./validations.js";
import checkAuth from "./utils/auth.js";
import {getMe, login, register} from "./controllers/UserController.js";
import cors from "cors";
import {createProxyMiddleware} from 'http-proxy-middleware';
import * as CollectionController from "./controllers/CollectionController.js";
import handleValidationError from "./utils/handleValidationError.js";
import * as ItemController from "./controllers/itemController.js";


// await mongoose.connect('mongodb+srv://admin:Netflix2024@cluster0.fknd4ao.mongodb.net/collections?retryWrites=true&w=majority')
//     .then(() => {
//         console.log('DB CONNECTED')
//     })
//     .catch((err) => {
//             console.log("DB IS FAILED", err)
//         }
//     )
await mongoose.connect(process.env.MONGODB_URI)
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
// app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello world!")
})

app.post('/auth/register', registerValidation, handleValidationError, register)
app.post('/auth/login', loginValidation, handleValidationError, login)
app.get('/auth/me', checkAuth, getMe)

app.get('/collections', CollectionController.getAll)
app.get('/collections/:id', CollectionController.getOne)
app.post('/collections', checkAuth, collectionCreateValidation, handleValidationError, CollectionController.create)
app.delete('/collections/:id', checkAuth, CollectionController.remove)
app.patch('/collections/:id', checkAuth, collectionCreateValidation, handleValidationError, CollectionController.update)

app.get('/item/:id', ItemController.getOne)
app.post('/item', checkAuth, ItemController.create)
app.post('/item/:id/like', checkAuth, ItemController.like)
app.delete('/item/:id', checkAuth, ItemController.remove)
app.put('/item/:id', checkAuth, ItemController.update)


app.use('/api', createProxyMiddleware({
    target: 'https://fokin-collections-80e49a476c50.herokuapp.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '',
    },
}));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3005

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("DB IS RUNNING")
})